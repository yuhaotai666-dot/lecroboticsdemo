# Footer redesign

Rebuild the current simple four-column footer as one whose information architecture
matches the header exactly, in the style of an international robotics brand: white
or very pale ice-blue background, deep blue-grey text, hairline dividers, generous
whitespace. No large dark areas, no heavy shadows.

## 1. Shared navigation data

The header's menu data (`productGroups`, `industryMenu`, `caseMenu`,
`resourceMenu`, `aboutMenu`, `supportMenu`) currently lives inside
`site-header.tsx`.

- Extract it to `src/lib/nav.ts` so header and footer share one source. That
  guarantees the top level is always the same on both: Products / Industries /
  Case Studies / Resources / About Us / Support.
- Footer links point at existing routes and anchors: `/products`, `/industries`,
  `/case-studies`, `/resources`, `/about`, `/support`, plus the existing `#`
  sections (`/support#repair`, `/support#faq`, `/about#contact`,
  `/resources#downloads`).

## 2. Footer structure (desktop)

```text
┌──────────────────────────────────────────────────────────┐
│ Logo + Subscribe to Our News          [ Enter email → ]  │
├──────────────────────────────────────────────────────────┤
│ Products   Industries  Case Studies  Resources  About  Support │
│ (6 equal columns, one row on wide screens; 3×2 when narrower)  │
├──────────────────────────────────────────────────────────┤
│ Social icons (LinkedIn YouTube TikTok Instagram X)        │
├──────────────────────────────────────────────────────────┤
│ © 2026 LEC Robotics        Privacy | Terms | Cookies      │
└──────────────────────────────────────────────────────────┘
```

- **Newsletter band** — existing wordmark (LEC.ROBOTICS) top left, with the
  heading "Subscribe to Our News" beneath it (20–24px medium, deep blue-grey)
  and the line "Get product updates, robotics insights and company news." On the
  right, an email input: 1px pale blue-grey border, 8px radius, white fill, brand
  blue hairline border on focus, and an arrow button (lucide `ArrowRight`).
  Subscription is front-end only for now — a toast on submit, no backend.
- **Products column** — list only the four functional categories (Cleaning /
  Food Service / Autonomous Delivery / Automated F&B, linking to the matching
  anchor or category filter on `/products`) plus View All Products →. Do not
  list all eight models directly.
- **Industries column** — the first six industries plus View All Industries →
  (all ten are shown in full on `/industries`).
- **Case Studies column** — Featured plus five industry entry points (linking to
  the filter hash on `/case-studies`) plus View All Case Studies.
- **Resources column** — News / Events / Insights / Downloads / Product
  Brochures. Open Platform stays hidden; there is no page behind it yet.
- **About Us column** — Company / Mission & Vision / Technology & Innovation /
  Global Presence / Careers / Contact Us.
- **Support column** — Service & Support / Online Service Request / Documents &
  Manuals / Service Plans / FAQ / Contact Support. Do not invent phone numbers,
  email addresses, postal addresses, warranty terms or response times.
- **Social icons** — lucide icons (Linkedin, Youtube, Instagram, X/Twitter, and
  Music2 standing in for TikTok, or a simple hand-drawn glyph). Deep blue-grey by
  default, brand blue on hover with a slight scale/opacity transition
  (150–200ms). All hrefs are `#` placeholders with an aria-label; none link to a
  real third-party account.
- **Bottom bar** — hairline divider, `© 2026 LEC Robotics. All rights reserved.`
  on the left, Privacy Policy / Terms of Use / Cookie Policy on the right. Those
  three pages do not exist yet, so they point at `#` for now. (I can add three
  simple placeholder legal pages if you want — placeholders by default.)

## 3. Visual rules (matching the header)

- Background `bg-card` (white) with a 1px top border. The newsletter band can use
  the very pale ice-blue `bg-catalog`.
- Column headings 15–16px medium deep blue-grey; links 14px regular blue-grey
  (`text-muted-foreground`), brand blue on hover (`text-primary`).
- Same max width as the page content container (`max-w-6xl`, centred), 80px top
  padding (`pt-20`), ≥48px between columns, `space-y-3` between links, 24px above
  and below the bottom bar.
- No shadows, no coloured social icons, no large dark blocks.

## 4. Mobile

Single column: logo → newsletter → social icons, then the six sections as an
accordion (reusing the pattern from the header's mobile menu — tap to expand the
second level), and finally Privacy / Terms / Cookies and the copyright line.

## Files touched

- New `src/lib/nav.ts` (shared navigation data)
- Rewrite `src/components/site-footer.tsx`
- Edit `src/components/site-header.tsx` (import from nav.ts; logic unchanged)
- No changes to page content, routes or business logic

## Verification

- `tsgo` type check plus a clean build
- Playwright screenshots of the footer at desktop (1280px) and mobile (390px),
  confirming column alignment, accordion expansion, hover colours and no
  horizontal overflow
