# LAVEROL STANDARD — премиум one-pager

> Свод стандартов и предпочтений, выведенный из проекта **Art Glass**.
> Рабочий язык — русский. Технические идентификаторы — английские. Язык контента задаётся per-project.
> Цель файла: чтобы любой новый сайт сразу наследовал «дорогой» почерк, который тебе зашёл.

---

## 0. Философия (что делает «дорого»)

- **«Дорого» = ремесло + редактура, а не количество фич.** Один акцент, одна типопара, одна шкала радиусов, один язык теней и анимаций.
- **Proof-led нарратив:** ведём доказательством (боль → до/после → услуги → процесс → доверие → запись), а не рекламой.
- **Mobile-first, conversion-first, cinematic monochrome.**
- **Вау — но никогда ценой читаемости и скорости.**

---

## 1. Твои подтверждённые предпочтения (из запросов по проекту)

Это то, что ты прямо просил или выбирал по ходу — переносим в каждый проект:

1. **Блоки на весь экран.** Каждый смысловой блок — одна вьюпорт-высота, ощущается цельным. (Сначала просил «защёлкивание» секций; позже **жёсткий scroll-snap убрали** в пользу плавного свободного скролла — это финальное предпочтение.)
2. **Видимый статус «відчинено / зачинено».** Должен быть заметным. **Красный — ЗАПРЕЩЁН.** Закрыто/скоро закрытие = **янтарь (amber)** + всегда показываем, **когда откроемся**.
3. **Бот — центральный экспонат.** Должен:
   - выглядеть круто и «цветно», но **цвет = смысл** (свой акцент на услугу), не радуга;
   - задавать **логичные, ветвящиеся** вопросы (уточнение зависит от проблемы);
   - **помещаться без скролла** → результат в 2 колонки / горизонтально;
   - **НЕ уводить в Telegram** — после заявки просто «Ви записані»;
   - иметь фоновый **line-art мотив ниши** (не фото машины);
   - давать **выбрать марку авто** в форме.
4. **Изображения — яркие, живые, настоящие.** На hero — **фоновое видео**. **Фоны секций = ЭЛЕМЕНТЫ ниши (текстуры/стекло/процесс), НЕ машины.** Машины — **только в галерее работ** (много разных цветных марок).
5. **Производительность:** «чтобы не подлагивал» — перф это часть премиума.
6. **Премиум-типографика** (не дефолтные Inter/Space Grotesk).
7. **Языки:** рабочий со мной — русский; контент сайта — украинский (для Art Glass).

---

## 2. Дизайн-токены (точные значения)

### Палитра — монохром + один акцент + семантические статусы
Канва: графит → хром → кость. Плюс **ровно один** бренд-акцент. Плюс маленький набор **семантических** статус-цветов (каждый = одно фиксированное значение, ≤5% площади, только мелкие метки — точки/бейджи/цифры). **КРАСНОГО НЕТ.**

```
--color-bg #0b0c0e      --color-surface #131417   --color-surface-2 #16181c
--color-chrome #c6cacf  --color-chrome-2 #9a9ea6  (линии, кромки, FOCUS RING)
--color-bone #f5f6f8    (основной текст, светлые CTA)
--color-muted #a2a6ad   --color-muted-2 #82868e   (поднят до AA 4.5:1 на bg)
--color-line #1e2024    --color-line-2 #3a3d42

--color-accent / --color-feature #2dd4bf  (ОДИН бренд-акцент, бирюза, ≤10%)
--color-status     #6fcf97  (зелёный — online / «відчинено», ТОЛЬКО)
--color-rating     #f3c14e  (золото — только звёзды рейтинга)
--color-info       #6fa8dc  (синий — NEW / инфо)
--color-sale       #e8a56b  (тёплый янтарь — акция; НИКОГДА не красный)
--color-attention  #e0935a  (оранжевый — «скоро закрытие» / мало мест)
```
> Акцент выводится из логотипа. Для Art Glass дефолт спеки (champagne ≤5%) был заменён на **бирюзу ≤10%** по фидбеку клиента. Правило: **акцент = из лого, цвет — как система смыслов, не радуга.**

### Типографика
- **Display:** Clash Display (fallback Neue Montreal). **Body:** Geist (fallback Hanken Grotesk). **Mono:** Geist Mono (fallback JetBrains Mono).
- **Self-hosted** через `next/font/local`, `.woff2`, `display:"swap"`, `preload` для display+body, `preload:false` для mono. Size-adjusted fallback-цепочки → zero CLS.
- **Serif живёт ТОЛЬКО в логотипе** — в вёрстке serif запрещён.
- **Запрещены:** Inter (как дефолт), Space Grotesk, Instrument Serif / Fraunces.
- Табличные цифры (`tabular-nums`) на всех цифрах/ценах/спеках. Measure `max-width: 68ch` (60–70ch). `text-wrap: balance` на заголовках, `pretty` на абзацах. Кавычки «», nbsp на стыке число+единица (`1 240`, `36 міс`).
- ⚠️ **Для не-латинского контента проверяй покрытие глифов display-шрифтом** до фиксации пары (Latin-only display под `swap` молча падает в fallback).

### Радиусы / тени / сетка
```
--radius-sm 10px  --radius-md 14px  --radius-lg 22px  --radius-pill 999px   (стекло → lg)
--shadow-1 0 1px 0 rgba(255,255,255,.06) inset          (хайрлайн-кромка)
--shadow-2 0 8px 32px rgba(0,0,0,.35)                    (мягкая тень, не чистый чёрный)
.container-page  max-width 80rem (1280)  padding-inline clamp(1.25rem,5vw,2.5rem)   (8pt)
```

---

## 3. Моушн-язык (один на весь сайт)

**Три easing** (определены в CSS `@theme` и зеркально в JS `motion-presets.ts` — чтобы CSS и motion не расходились):
```
--ease-out   cubic-bezier(.22,1,.36,1)    входы секций
--ease-inout cubic-bezier(.76,0,.24,1)    стеклянная завеса
--ease-glide cubic-bezier(.4,0,.2,1)      блики, sweep, sheen, specular
```
**Три длительности:** `fast .4s · base .6s · slow .9s`. **Emphasis-spring:** `{stiffness:120, damping:18}`.

- **Стандартный вход секции «rise + focus»:** `opacity 0→1, y 24→0`, `slow`, `ease.out`, `whileInView once:true, amount:0.3, margin "0 0 -10% 0"`.
- **Каскад детей:** `staggerChildren 0.08, delayChildren 0.05`, дети `y 16→0`, `base`.
- **Kinetic headline по словам:** слово в `overflow-hidden`, внутренний span `y:110%→0`, `0.8s`, `delay 0.15 + i*0.09`.
- **Count-up:** `0→value` за `1.4s`, `toLocaleString("uk-UA")` (→ `1 240`), tabular. Под reduced-motion — сразу финал.
- **Glass curtain:** СОЛИДНАЯ фрост-панель уезжает `y:0→-101%`, `0.9s`, `ease.inOut` (не живой backdrop-filter!).
- **Магнитная кнопка:** spring `stiffness 150/damping 15/mass 0.1`, strength 0.35, сброс на leave. Это единственный курсор-флориш; **кастомный курсор запрещён.**
- **Hero:** specular-полоса проезжает один раз на загрузке (`2.6s, ease.glide, delay 0.7`); scroll-cue бобает `y:[0,6,0]`.
- **Hard-rules:** анимируем **только transform/opacity/clip-path** — **никогда blur/backdrop-filter**. Один easing-язык. Под `prefers-reduced-motion` — всё в статику (глобальный CSS kill-switch + per-component JS-гарды + GSAP matchMedia ветки).

---

## 4. Скролл

- **Lenis × GSAP ticker:** `new Lenis({ duration:1.1, easing: t=>Math.min(1,1.001-2**(-10*t)), anchors:{offset:-72} })`; `gsap.ticker.add(t=>lenis.raf(t*1000))` + `lagSmoothing(0)`. Один clock на оба. Под reduced-motion Lenis не инстанцируется.
- **Anchor offset = высота шапки** (−72).
- **NO full-page snap.** Жёсткий scroll-snap убран — плавный свободный скролл (snap остался только у мобильной горизонтальной карусели «Процес»).
- **Pinned-моменты:** `scrub: 0.4` (дом-значение), `anticipatePin:1`, `invalidateOnRefresh:true`, внутри `gsap.matchMedia` с явной reduced-motion веткой, которая `gsap.set()`-ит финальное состояние. Reveal через `clip-path inset`, не blur.

---

## 5. Структура и размер блоков

**Proof-led spine (14 узлов):** Hero → StatsBand(proof) → Problem → **HealCrack (signature)** → BeforeAfter → Services(sticky+counter) → Process(horizontal pan) → Works(masonry) → BrandsMarquee → About(asymmetric) → Reviews(marquee) → FAQ(accordion) → Location(split) → Booking(split) → Footer.

- **Чередуем layout-семейства. НИКОГДА 3 одинаковые карточки в ряд. НИКОГДА ярлыки «Етап N»** (label = само действие).
- **Один eyebrow `<SectionLabel>` на секцию.**
- **Размер блока:** редакторская секция = `relative isolate flex min-h-screen flex-col justify-center`. Hero/pinned — `min-h-[100svh]` (чтобы мобильный URL-бар не прыгал). Process на десктопе `lg:h-screen`.
- **Исключения (намеренно НЕ на весь экран):** тонкая полоса статов и masonry-галерея — высота по контенту. Не форсируем всё под вьюпорт.
- **Seam-fade:** фон-бэкдроп на `-z-10` внутри `isolate`; сверху/снизу 14% растворяются в `--color-bg` → страница читается как один непрерывный фильм, а не стопка коробок.

---

## 6. «Живые детали» (детали качества)

- **Статус відчинено/зачинено:** считается от **часов посетителя** (mount-gated, refresh 60s). Три состояния: open (зелёный пульс) / closing-soon (янтарь пульс) / closed (статичная янтарная точка). **Красного нет.** Всегда показываем **когда откроемся** («завтра з 10:00», «у суботу з 10:00»). Чип: open = green@5%, иначе amber@10%; закрытый label форсим в bone для контраста.
- **Section counter 01/NN:** боковая рейка, активная секция = пересекающая центр вьюпорта (`IntersectionObserver rootMargin -45%`), кольцо прогресса `pathLength = scrollYProgress`, мини-пульс на смене секции. Знаменатель из DOM (`[data-section]`).
- **Floating actions** (после 600px): back-to-top (через Lenis) + Telegram + лаунчер бота (pulse-ring, 48px). Все ≥44px.
- **Mobile menu:** фуллскрин `liquid-glass` диалог, нумерованный список секций (моно tabular `01`,`02`…), общий контракт focus-trap/scroll-lock/Esc.
- **Stats band:** одна строка с тонкими разделителями (`sm:flex` + `sm:border-l`), count-up, акцент **только на суффиксе**. НЕ три карточки.
- **Masonry:** CSS-columns, высоты из данных (`aspect-[3/4]`/`[4/3]`), hover-zoom `scale-[1.04]`, подпись выезжает снизу по градиент-скриму — **не плашка поверх фото**.
- **Reviews marquee:** дублированный контент `x:0→-50%` linear infinite, пауза вне вьюпорта (`useInView`), под reduced-motion — статичная скроллящаяся строка. Рейтинг **золотой, < 5.0** с количеством. Имя мастера в тексте отзыва.
- **Pulse-dot:** медленный пульс `2.4s` (никогда не моргание), под reduced-motion — статичная точка.
- **Тач-таргеты ≥44px** везде (`size-11`/`min-h-11`, главный CTA `min-h-12`).

---

## 7. Liquid glass + текстура

- **Tier-1 рецепт (чистый CSS):** `background rgba(255,255,255,.04)`, `backdrop-filter blur(16px) saturate(150%)`, тройная тень (drop + 2 inset-хайлайта), светящаяся кромка через `mask-composite: exclude` (1.3px), specular за курсором (`--mx/--my`, батч в один rAF), sheen-полоса на hover (translateX, не blur).
- **Точечно, НЕ заливать всё:** floating nav, карточка/лаунчер бота, главный CTA, mobile overlay, ручка слайдера до/после, hero-бейдж. Лимит стеклянных слоёв в кадре.
- **Grain:** fixed SVG-`feTurbulence`, `opacity .05`, `120px` тайл, **БЕЗ `mix-blend-mode`** (full-screen blend = джанк), скрыт под `prefers-reduced-transparency`.
- **Fallback `prefers-reduced-transparency: reduce`:** стекло → солид `#1a1c20`, `backdrop-filter:none`, specular/sheen `display:none`, grain убран.

---

## 8. Бот-квалификатор (полная структура — переносим целиком)

- **Архитектура:** мозг в `bot.ts` (plain TS, **без JSX**; иконки по строковому ключу → реестр Phosphor в компоненте). Компонент — чистая проекция данных.
- **Поток = ровно 4 шага, problem-led:**
  1. **problem** «З чим до нас?» — каждый вариант несёт `serviceId` (→ рекомендация).
  2. **detail** — **ветвящийся** уточняющий шаг: вопрос и варианты **зависят от выбранной проблемы** (`getSteps(problem)` → `DETAIL_STEPS[problem]`). Здесь живут «честные пометки» (большая трещина → «возможна замена»).
  3. **carType** (прайс-бэнд).
  4. **timeline** (логистика; предоткрывает день слота через `TIMELINE_DAY`).
  - Фиксированное число шагов (4), одна ветвящаяся ячейка. **Смена проблемы стирает устаревший `detail`-ответ.**
- **UX:** чек-степпер (4 точки, done → перекрашивается в акцент услуги + галка), **кликабельные хлебные крошки** ответов (ответы = навигация), per-service **перекраска всей карточки** (`ACCENT_TEXT/BORDER/BG/GLOW/DOT` + ambient-glow с `transition .6s`), один тонкий icon-set, опции с light-sweep на hover, водяной знак **line-art ниши** (`BotMotif`), переходы `AnimatePresence mode="wait"` (x:20→0→−20, .3s).
- **Результат = 2 колонки (вмещается без скролла):**
  - **Слева:** тинтованный фото-баннер (graded) + бейдж «Рекомендація», заголовок + акцент-подчёркивание, `desc`, **цена `від <CountUp> ₴` + «точна ціна — після огляду»** (quote-driven, никогда «звоните за ценой»), warranty-seal, опц. **честная пометка** (attention-box).
  - **Справа:** слот-пикер (day-tabs + time-chips) + форма (**select марки авто** → имя → телефон) + submit.
- **Исход — БЕЗ Telegram-хендофа:** `book()` POST-ит на `/api/lead` (доставка серверная), затем **celebration «Ви записані!»** (radial-glow + 6 детерминированных искр + рисующаяся галка; всё под `!reduce`). Валидация: **телефон обязателен** (≥7 цифр), имя/марка — опц. На ошибке fetch всё равно подтверждаем («майстер передзвонить»).
- **Closed-aware:** если студия закрыта — плашка «запис працює 24/7, майстер підтвердить, щойно відчинимось». Запись никогда не блокируется часами.
- **Лаунчер + модалка:** pulse-ring лаунчер; фуллскрин модалка (`role=dialog aria-modal`, focus-trap, Esc, body+Lenis lock, возврат фокуса), слева бренд-панель (статус, мастер, рейтинг), бот рендерится `embedded` (стекло не дублируется).

---

## 9. Изображения

- **Фоны секций = элементы/текстуры ниши, НЕ машины** (`bg-*.jpg`, стекло, процесс). **Машины — только в галерее работ** (11 разных цветных марок).
- **Один грейд на всё** (огромный рычаг «дорого»): три CSS-переменные → класс `.graded` (`saturate .85 · contrast 1.06 · brightness 1.04`). Парный `.haze` для «до» (пожелтевшая фара). Один холодный графит-грейд → разные фото читаются как один бренд. Грейд — в одном месте, тюнится одной строкой.
- **Hero video:** poster несёт LCP (`<Image priority>`), `<video preload="none">` оверлеем, **не рендерится под reduced-motion**, **пауза вне вьюпорта** (`useInView`).
- **next/image:** `fill` + `sizes="100vw"` + `object-cover`, `alt=""` + `aria-hidden` на декоре, `priority` на LCP, остальное `loading="lazy"`. (Желательно добавить LQIP `blurDataURL`.)
- **Плейсхолдеры размечены** `{/* PLACEHOLDER — replace */}`; один `contacts.ts` + один `content.ts` = одна замена для клиента.

---

## 10. Производительность (правила + сделанный анти-джанк пасс)

- `next.config`: `formats:["image/avif","image/webp"]`, обрезанные `deviceSizes/imageSizes`, `minimumCacheTTL: 2_592_000` (30 дн).
- **Анти-джанк пасс (что реально меняли):** убрали `mix-blend-mode` у grain; в `SectionBg` разнесли filter и transform-слой, дрейф только `useInView` (−10%), `will-change` снимается в простое, низкая амплитуда; Hero: pointermove throttled в один rAF + skip на touch, мотес-spring убран, teal-blob только in-view, видео `preload="none"`+пауза; мотес 12→6; GSAP scrub 1→0.4; header transition без `backdrop-filter`.
- **Инварианты:** никогда не анимируем blur/backdrop-filter; лимит стеклянных слоёв; zero CLS (`fill`-боксы, `text-wrap`, self-host fonts, `overflow-x: clip`); **LCP < 2.5s** (poster, не видео).

---

## 11. Доступность

- **Оба фоллбэка:** `prefers-reduced-motion` (глобальный kill-switch `0.001ms` + per-component) и `prefers-reduced-transparency` (солид-фрост, grain off).
- `:focus-visible` — хром-кольцо `2px var(--color-chrome)`, offset 2px; для невидимых контролов кольцо уводим на видимого родителя через `:has()`.
- **AA** через скримы под текстом на стекле/медиа.
- ≥44px тач-таргеты; семантические landmarks + один `<h1>` на секцию; alt-тексты; клавиатура; skip-link.

---

## 12. Копирайт / анти-слоп

- Контент-язык — per-project (Art Glass: украинский). Quote-driven: на карточках услуг **«від ₴X»** ведёт в бота/заявку; **никогда «телефонуйте за ціною» как единственный путь**.
- **Доверие:** мастер с именем (в т.ч. в отзывах), гарантия на карточке услуги, прозрачность материалов/процесса, рейтинг **< 5.0** с количеством, **живые числа** (не 99.99%).
- **Запрещено:** красный/неон/AI-фиолет/«гоночные» градиенты/пестрота; 3 одинаковые карточки; «Етап N»; serif в вёрстке; em-dash как приём; филлер («можливості без меж»); generic-нейминг «Studio»; чужие видео-стримы; плашки-пилюли поверх фото; анимация blur; стекло на всё подряд.

---

## 13. Стек

Next.js (App Router, TS) · Tailwind v4 (CSS-first `@theme`, без `tailwind.config`) · `motion/react` · GSAP + ScrollTrigger · Lenis · Phosphor Icons (один тонкий стиль) · self-hosted fonts (`next/font/local`) · `next/image` (AVIF/WebP) · заявка → свой route handler `/api/lead` (доставка серверная).
