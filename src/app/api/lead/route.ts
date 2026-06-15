import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Приймає заявку від форми сайту і пересилає її в Lustro CRM.
 * Ключ зберігається ТІЛЬКИ на сервері (env LUSTRO_KEY), у браузер не потрапляє.
 * Шлях: форма → POST /api/lead (цей файл) → CRM. Передаються всі поля заявки.
 */
const CRM_ENDPOINT = "https://lustro-crm.vercel.app/api/v1/leads";

export async function POST(req: NextRequest) {
  const key = process.env.LUSTRO_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "lustro_key_not_set" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  try {
    const r = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": key },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      return NextResponse.json({ ok: false, error: "crm_rejected", status: r.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "forward_failed" }, { status: 502 });
  }
}
