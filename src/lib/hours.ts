/**
 * Opening-hours logic (§6.11). PLACEHOLDER schedule — sync with the client's
 * real Google Business hours. Status is computed client-side from the user's
 * clock (see useOpenStatus) so it reflects the real moment.
 */
export const HOURS = {
  open: 10,
  close: 20,
  /** Days the studio is closed. 0 = Sunday. */
  closedDays: [0] as number[],
};

const DAYS_ACC = [
  "неділю",
  "понеділок",
  "вівторок",
  "середу",
  "четвер",
  "пʼятницю",
  "суботу",
];

export type OpenState = "open" | "closing" | "closed";
/** `sub` — full sentence (panels); `shortSub` — terse hint for the header chip. */
export type OpenStatus = {
  state: OpenState;
  label: string;
  sub: string;
  shortSub: string;
};

export function getOpenStatus(now: Date): OpenStatus {
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const isWorkday = !HOURS.closedDays.includes(day);

  if (isWorkday && h >= HOURS.open && h < HOURS.close) {
    if (HOURS.close - h <= 1) {
      return {
        state: "closing",
        label: "Скоро зачиняємось",
        sub: `відчинено до ${HOURS.close}:00`,
        shortSub: `до ${HOURS.close}:00`,
      };
    }
    return {
      state: "open",
      label: "Зараз відчинено",
      sub: `до ${HOURS.close}:00`,
      shortSub: `до ${HOURS.close}:00`,
    };
  }

  // closed — describe the next opening
  if (isWorkday && h < HOURS.open) {
    return {
      state: "closed",
      label: "Зараз зачинено",
      sub: `відчинимось сьогодні о ${HOURS.open}:00`,
      shortSub: `сьогодні з ${HOURS.open}:00`,
    };
  }
  let add = 1;
  while (HOURS.closedDays.includes((day + add) % 7)) add += 1;
  const when = add === 1 ? "завтра" : `у ${DAYS_ACC[(day + add) % 7]}`;
  return {
    state: "closed",
    label: "Зараз зачинено",
    sub: `відчинимось ${when} о ${HOURS.open}:00`,
    shortSub: `${when} з ${HOURS.open}:00`,
  };
}
