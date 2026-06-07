# SKAT (ООО «СКАТ») — корпоративный сайт

Статический HTML-сайт. Никаких сборщиков, пакетных менеджеров, тестов, линтеров или CI.

## Открытие

Открывай `*.html` прямо в браузере — сервер не нужен.

## Архитектура

- **Страницы** — 12 `.html` в корне. `index.html` — лендинг с двумя категориями (СИП / кабельная арматура).
- **Стили** — `styles/styles.css` (кастомный, CSS-переменные, BEM, адаптивная сетка). Остальное — вендорные.
- **Скрипты** — `js/script.js` (кастомный 1168 строк). Функции сгруппированы по страницам: `initCatalogSwiper()`, `initCatalogPage()`, `initProductPage()`, `initBurgerMenu()` и т.д.
- **Шрифты** — `fonts/` (самостоятельно размещённые Actay, Avenir Next Cyrillic).

## Зависимости (CDN + локальные копии)

Грузятся через `<script src="...">` и `<link>` с cache-busting (`?ver=xxx`):
- **jQuery** 3.7.1 — `code.jquery.com` + локальная копия
- **Swiper** 11 — `unpkg.com/swiper@11` + `swiper-bundle.min.js`
- **AOS** 2.3.4 — `unpkg.com/aos@2.3.4` + `aos.js`
- **Fancybox** — локальный `fancybox.umd.js` + `fancybox.css`
- **Inputmask** — `jquery.inputmask.bundle.js` для маски телефона
- **Yandex Maps API** 2.1 — внешний API на страницах с картой

## Конвенции

- **CSS** — BEM-нейминг (`block__element--modifier`), CSS-переменные в `:root`, mobile-first (`min-width`).
- **JS** — jQuery для DOM, vanilla JS для логики. Маска телефона: `+7 (999) 999-99-99`.
- **Контент** — на русском. Мета-теги частично на английском.
- **Cache-busting** — параметры `?ver=...` на подключаемых CSS/JS.

## Авто-сгенерированные директории (не трогать)

- `.codegraph/` — данные CodeGraph
- `graphify-out/` — вывод graphify (HTML-граф, JSON, отчёт)
