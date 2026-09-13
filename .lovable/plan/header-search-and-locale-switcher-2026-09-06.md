# Header search + locale switcher

Add two things to the right-hand side of the header, next to the Support button:
a site search overlay and a language switcher (EN / FR / DE / IT / ES). Translate
the whole site into those five languages.

## 1. Site search overlay

- Add a magnifier icon button on the right of the header. Clicking it opens a
  full-width search overlay below the header — white/frosted background, same
  style as the mega menu.
- Filtering is live as you type, across:
  - the 8 robots (name, category, one-line positioning) → product detail page
  - the 10 industries → the matching anchor on the industries page
  - page entry points (Case Studies, Resources, About, Support, Book a Demo,
    ROI Calculator) → the corresponding page
- Results grouped under Products / Industries / Pages, with a product thumbnail.
  Up/down arrows to move, Enter to go, Esc to close. Show a message when nothing
  matches.
- The mobile full-screen menu gets the same search field at the top.
- Entirely front-end, fed by the existing `src/lib/products.ts` and
  `src/lib/nav.ts`. No backend needed.

## 2. i18n framework

- New `src/lib/i18n/`:
  - `locales.ts` — the language list: English (en), Français (fr), Deutsch (de),
    Italiano (it), Español (es).
  - `translations/<lang>.ts` — one dictionary per language, identical key
    structure.
  - `i18n-context.tsx` — a React context exposing the current locale, a `t(key)`
    function and a setter. The choice persists to localStorage, defaults to
    English, and keeps `<html lang>` in sync.
- First-pass copy is machine-translated, aiming for accurate robotics and
  automation terminology; it can be replaced with human-reviewed text later.

## 3. Wiring the copy through translations

Pull the hard-coded English out of these files into translation keys:

- `site-header.tsx`, `site-footer.tsx`, `hero-carousel.tsx`
- route pages: `index`, `products.index`, `products.$slug`, `industries`,
  `case-studies`, `resources`, `about`, `support`, `book-a-demo`, `roi`,
  `videos.$slug`, `solutions`
- product data (the blurbs and spec descriptions in `products.ts`) and the
  navigation menus (`nav.ts`) also go through keys. Model names (Kleenbot C40 and
  so on) are not translated.
- SEO metadata (title/description) is emitted per language too.

## 4. Locale switcher UI

- A globe icon plus the current language code (e.g. EN) sits on the right of the
  header, to the left of Support. Clicking opens a dropdown listing the five
  languages in full, with the current one highlighted in brand blue.
- Styling matches the existing navigation: white panel, hairline border, 200ms
  transition, no heavy shadow.
- The mobile menu gets a language list at the bottom (five rows).
- Switching language updates the copy immediately, without a page reload.

## Final order on the right of the header

`Products … About Us` | search icon | locale switcher | Support button | Book a demo

## Verification

- TypeScript and build pass; every route returns HTTP 200.
- Playwright screenshots covering: the search overlay interaction, the language
  dropdown, the copy changing after switching to French/German, and the mobile
  menu.
- No console errors.

## Notes

- The translations are a machine-generated first pass. Have the domain
  terminology reviewed by a person before going live.
- URL structure is unchanged — no `/fr/` prefix. Language is a user preference.
