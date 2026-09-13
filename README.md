# LEC Robotics — website rebuild

A rebuild of https://www.lecrobotics.ai/ as a React 19 / TanStack Start / Tailwind 4 app.
Eleven products, six industry categories, five languages (EN / FR / DE / IT / ES), an ROI calculator, and a scroll-driven "six capabilities" section.

This project started life in Lovable. It no longer depends on the Lovable platform: the Vite config is explicit, the build runs on plain `npm`, and the output is a standard nitro node-server bundle.

## Requirements

- Node.js 22+ (tested on 26)
- npm 11+

## Development

```sh
npm install
npm run dev        # http://localhost:8080
```

## Type check and lint

```sh
npm run typecheck
npm run lint
```

## Production build

```sh
npm run build      # emits .output/ (nitro, node-server preset)
npm run preview    # serves the build: node .output/server/index.mjs
```

`npm run preview` runs the nitro output directly rather than `vite preview`, because TanStack Start's built-in preview server looks for `dist/server/server.js` and nitro writes to `.output/` instead.

## Layout

```
src/
  routes/        TanStack file-based routes (index, products.$slug, roi, case-studies, …)
  components/    UI
  lib/           i18n, error capture, helpers
  assets/        images
  server.ts      SSR entry wrapper (error page on catastrophic SSR failure)
public/          static assets
.lovable/plan/   design notes from the earlier Lovable iterations (kept as documentation)
```

## Not wired up yet

The site is presentation-only. There is no CRM, no email delivery, no real booking, no analytics, no payment. The demo and subscription forms show a preview-only confirmation and send nothing.
