/**
 * Single content source — all UA copy (content is Ukrainian; keys are English).
 * Prices, warranties, names, reviews are realistic PLACEHOLDERS (§13) — replace
 * with client data. Numbers are believable, never fake-perfect (§16).
 */

/* §6.2 — Stats band */
export const STATS = [
  { value: 1240, suffix: "+", label: "авто відремонтовано" },
  { value: 7, suffix: "", label: "років на ринку" },
  { value: 36, suffix: " міс", label: "гарантія на ремонт" },
  { value: 98, suffix: "%", label: "сколів — без заміни скла" },
];

/* §6.4 — Before / After pairs */
export type BeforeAfterPair = {
  id: string;
  tab: string;
  caption: string;
  before: string;
  after: string;
  beforeImg: string;
  afterImg: string;
  beforeHaze?: boolean;
};

export const BEFORE_AFTER: BeforeAfterPair[] = [
  {
    id: "chip",
    tab: "Скол",
    caption: "Скол на лобовому → відремонтований",
    before: "Скол до ремонту",
    after: "Після ремонту",
    beforeImg: "/media/glass-chip.jpg",
    afterImg: "/media/glass-clean.jpg",
  },
  {
    id: "headlight",
    tab: "Фара",
    caption: "Мутна жовта фара → прозора",
    before: "Жовта каламутна фара",
    after: "Прозора фара",
    beforeImg: "/media/headlight.jpg",
    afterImg: "/media/headlight.jpg",
    beforeHaze: true,
  },
  {
    id: "scratch",
    tab: "Подряпини",
    caption: "Подряпини на склі → відполіроване",
    before: "Подряпини на склі",
    after: "Відполіроване скло",
    beforeImg: "/media/glass-worn.jpg",
    afterImg: "/media/glass-clean.jpg",
  },
];

/* §6.5 — Services (+ price bands & warranty for the cards, §6.8/§9) */
export type ServiceTag = {
  label: string;
  variant: "premium" | "feature" | "info" | "sale" | "attention";
};

export type Service = {
  id: string;
  title: string;
  desc: string;
  priceFrom: string;
  warranty: string;
  img: string;
  tag?: ServiceTag;
};

export const SERVICES: Service[] = [
  {
    id: "repair",
    title: "Ремонт сколів і тріщин",
    desc: "Зупиняємо тріщину. Відновлюємо міцність і прозорість скла — без заміни.",
    priceFrom: "від 600 ₴",
    warranty: "Гарантія: тріщина не піде далі",
    img: "/media/glass-chip.jpg",
    tag: { label: "Хіт", variant: "premium" },
  },
  {
    id: "glass-polish",
    title: "Полірування автоскла",
    desc: "Прибираємо подряпини та помутніння. Чистий огляд без бліків.",
    priceFrom: "від 1 200 ₴",
    warranty: "Контроль результату під лампою",
    img: "/media/glass-clean.jpg",
  },
  {
    id: "headlights",
    title: "Полірування фар",
    desc: "Знімаємо жовтизну й каламуть. Яскравіше світло — безпечніша їзда.",
    priceFrom: "від 800 ₴",
    warranty: "Захисний топ-шар у комплекті",
    img: "/media/polishing.jpg",
    tag: { label: "Популярне", variant: "feature" },
  },
  {
    id: "ppf",
    title: "Захисна плівка",
    desc: "Бронюємо фари та зони ризику від сколів і подряпин.",
    priceFrom: "від 1 500 ₴",
    warranty: "Плівка XPEL / SunTek — до 10 років",
    img: "/media/ppf-film.jpg",
    tag: { label: "Захист 10 років", variant: "info" },
  },
];

/* §6.6 — Process steps (label = the action, no "Step 1") */
export type ProcessStep = { id: string; title: string; desc: string };

export const PROCESS: ProcessStep[] = [
  {
    id: "inspect",
    title: "Огляд і замір",
    desc: "Оцінюємо пошкодження під світлом, кажемо чесно: ремонт чи вже заміна.",
  },
  {
    id: "prep",
    title: "Підготовка зони",
    desc: "Очищення, знежирення, ізоляція ділянки — щоб результат тримався.",
  },
  {
    id: "work",
    title: "Ремонт / Полірування",
    desc: "Заповнюємо скол смолою або знімаємо каламуть полірувальною системою.",
  },
  {
    id: "cure",
    title: "Полімеризація",
    desc: "УФ-затвердіння смоли — повертаємо склу міцність і прозорість.",
  },
  {
    id: "control",
    title: "Контроль під світлом",
    desc: "Перевіряємо результат під лампою разом з вами. Без сюрпризів.",
  },
];

/* §6.7 — Works gallery (model / service captions) */
export type Work = {
  id: string;
  title: string;
  service: string;
  img: string;
  tall?: boolean;
};

export const WORKS: Work[] = [
  { id: "w1", title: "BMW M3 Competition", service: "Полірування скла", img: "/media/gw-bmw-m3.jpg" },
  { id: "w2", title: "Audi R8", service: "Полірування фар", img: "/media/gw-audi-r8.jpg", tall: true },
  { id: "w3", title: "Mercedes-AMG GT", service: "Захисна плівка", img: "/media/gw-merc-blue.jpg" },
  { id: "w4", title: "Nissan GT-R", service: "Полірування фар", img: "/media/gw-gtr-orange.jpg", tall: true },
  { id: "w5", title: "Porsche 911 Turbo", service: "Полірування скла", img: "/media/gw-porsche.jpg" },
  { id: "w6", title: "Audi A5", service: "Ремонт скола", img: "/media/gw-audi-a5.jpg", tall: true },
  { id: "w7", title: "BMW M4", service: "Полірування фар", img: "/media/gw-bmw-m4.jpg" },
  { id: "w8", title: "Mercedes-AMG GT R", service: "Захисна плівка", img: "/media/gw-merc-green.jpg" },
  { id: "w9", title: "Toyota Supra", service: "Полірування скла", img: "/media/gw-supra.jpg", tall: true },
  { id: "w10", title: "Nissan GT-R", service: "Ремонт тріщини", img: "/media/gw-gtr-blue.jpg" },
  { id: "w11", title: "Audi RS5", service: "Полірування кузова", img: "/media/gw-audi-rs5.jpg" },
];

/* §6.9 — Reviews (UA names, fictional; rating not a perfect 5.0) */
export const REVIEW_RATING = { score: "4.9", count: "120+" };

export type Review = { id: string; name: string; text: string; service: string };

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Олександр К.",
    service: "Ремонт скола",
    text: "Скол на лобовому впіймали вчасно — за пів години все зробили, тріщина не пішла. Дякую майстру Андрію.",
  },
  {
    id: "r2",
    name: "Назар Іщенко",
    service: "Полірування фар",
    text: "Фари були як матове скло. Після полірування світло вночі — небо і земля. Рекомендую.",
  },
  {
    id: "r3",
    name: "Ірина М.",
    service: "Полірування скла",
    text: "Прибрали подряпини від двірників, зникли блики у сонце. Усе чесно показали під лампою.",
  },
  {
    id: "r4",
    name: "Дмитро Р.",
    service: "Захисна плівка",
    text: "Заклеїли фари плівкою — тепер сколи не страшні. Акуратно, без пилу, в строк.",
  },
];

/* §6.10 — FAQ */
export type Faq = { id: string; q: string; a: string };

export const FAQ: Faq[] = [
  {
    id: "f1",
    q: "Чи можна відремонтувати скол, чи вже треба міняти скло?",
    a: "Якщо скол менший за монету і не на лінії зору водія — майже завжди ремонтуємо. Тріщину довжиною до 30 см теж часто рятуємо. Точно скажемо після огляду.",
  },
  {
    id: "f2",
    q: "Чи піде тріщина далі після ремонту?",
    a: "Ремонт зупиняє тріщину й відновлює міцність скла в зоні пошкодження. Даємо гарантію, що з відремонтованого місця вона не піде далі.",
  },
  {
    id: "f3",
    q: "Скільки тримається полірування фар?",
    a: "Залежно від догляду — від року до кількох. Ми наносимо захисний топ-шар, а для довшого ефекту пропонуємо плівку.",
  },
  {
    id: "f4",
    q: "Як доглядати скло й фари після робіт?",
    a: "Перші дні — без жорстких мийок високого тиску по зоні ремонту. Далі звичайний догляд. Дамо коротку памʼятку.",
  },
  {
    id: "f5",
    q: "Скільки часу займає робота?",
    a: "Ремонт скола — 30–60 хв. Полірування фар — 1–2 год. Плівка та полірування скла — за записом, орієнтовно пів дня.",
  },
];

/* §6.8 — Studio / why us */
export const STUDIO = {
  master: "Андрій",
  masterRole: "Майстер студії",
  experience: "7 років зі склом і оптикою",
};

export type TrustPoint = { id: string; title: string; desc: string };

export const TRUST: TrustPoint[] = [
  {
    id: "t1",
    title: "Гарантія на ремонт",
    desc: "З відремонтованого скола тріщина не піде далі — фіксуємо письмово.",
  },
  {
    id: "t2",
    title: "Оригінальні матеріали",
    desc: "Плівка XPEL / SunTek, перевірені смоли й полірувальні системи.",
  },
  {
    id: "t3",
    title: "Контроль під лампою",
    desc: "Показуємо результат до і після — нічого не ховаємо.",
  },
  {
    id: "t4",
    title: "Чесна оцінка",
    desc: "Якщо ремонт уже не врятує — скажемо одразу, без нав'язування.",
  },
];
