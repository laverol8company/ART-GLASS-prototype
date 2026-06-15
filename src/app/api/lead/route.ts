import { NextRequest, NextResponse } from "next/server";

// Приймає заявку від бота-кваліфікатора і доставляє її у ДВА незалежні канали:
// Lustro CRM (як раніше) і Telegram-групу. Канали незалежні (Promise.allSettled):
// якщо один не налаштований або впав — інший усе одно доставляє заявку.
// Секрети (ключ CRM, токен бота) лежать у змінних оточення Vercel і в браузер
// НЕ потрапляють.  Шлях: бот → POST /api/lead (цей файл) → CRM + Telegram.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRM_ENDPOINT = "https://lustro-crm.vercel.app/api/v1/leads";

type Lead = Record<string, unknown>;

// Екранування для parse_mode=HTML, щоб дані клієнта не ламали розмітку.
function esc(v: unknown): string {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Людиночитабельне повідомлення для Telegram (читаємо поля, які шле форма бота).
function buildMessage(d: Lead): string {
  const rows: [string, unknown][] = [
    ["👤 Імʼя", d.name],
    ["📞 Телефон", d.phone],
    ["🚙 Авто", d.carType ?? d.car],
    ["🔧 Проблема", d.problem],
    ["🛠 Послуга", d.service],
    ["💰 Вартість", d.price],
    ["🕐 Бажаний час", d.preferred_time ?? d.slot],
    ["⏱ Коли зручно", d.timeline],
    ["🔗 Джерело", d.source],
  ];
  const lines = rows
    .filter((row) => row[1] != null && String(row[1]).trim() !== "")
    .map((row) => `${row[0]}: <b>${esc(row[1])}</b>`);

  let ts = "";
  try {
    ts = new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  } catch {
    /* середовище без Intl/таймзон — просто без позначки часу */
  }

  return (
    "🚗 <b>Нова заявка — Art Glass</b>\n\n" +
    lines.join("\n") +
    (ts ? `\n\n🕒 ${esc(ts)} (Київ)` : "")
  );
}

// Доставка в Telegram. {ok} | {skipped}. Кидає Error лише при збої API.
async function sendTelegram(d: Lead): Promise<{ ok?: boolean; skipped?: boolean }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(d),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!r.ok) {
    let info = "";
    try {
      info = ((await r.json()) as { description?: string }).description ?? "";
    } catch {
      /* тіло без JSON — ігноруємо */
    }
    throw new Error(`telegram_${r.status}${info ? ": " + info : ""}`);
  }
  return { ok: true };
}

// Доставка в Lustro CRM (як раніше). {ok} | {skipped}. Кидає Error при збої.
async function sendCrm(d: Lead): Promise<{ ok?: boolean; skipped?: boolean }> {
  const key = process.env.LUSTRO_KEY;
  if (!key) return { skipped: true };

  const r = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": key },
    body: JSON.stringify(d),
  });
  if (!r.ok) throw new Error(`crm_${r.status}`);
  return { ok: true };
}

export async function POST(req: NextRequest) {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: приховане поле, яке заповнюють лише боти. Тихо приймаємо.
  if (body && body.hp && String(body.hp).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Базова валідація: без імені та телефону заявка беззмістовна.
  const name = String(body.name ?? "").trim();
  const phoneDigits = String(body.phone ?? "").replace(/\D/g, "");
  if (name.length < 2 || phoneDigits.length < 5) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  // honeypot далі не передаємо.
  const payload: Lead = { ...body };
  delete payload.hp;

  const [crm, tg] = await Promise.allSettled([sendCrm(payload), sendTelegram(payload)]);
  const okCrm = crm.status === "fulfilled" && crm.value.ok;
  const okTg = tg.status === "fulfilled" && tg.value.ok;
  const skipCrm = crm.status === "fulfilled" && crm.value.skipped;
  const skipTg = tg.status === "fulfilled" && tg.value.skipped;

  if (okCrm || okTg) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }
  if (skipCrm && skipTg) {
    return NextResponse.json({ ok: false, error: "no_channel_configured" }, { status: 500 });
  }
  return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
