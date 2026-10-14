# A/M — Futuristic Cybersecurity Portfolio

A polished, responsive cybersecurity portfolio built with **strict TypeScript**, semantic HTML, and handcrafted CSS. No JavaScript UI framework or external runtime dependency is required.

## Quick start

This ZIP already includes the compiled `app.js`. **Double-click `index.html` to preview immediately**, or run a local server with Node.js:

```bash
npm run dev
```

Open **http://localhost:5173**. To edit and recompile the TypeScript, install the development dependency once:

```bash
npm install
npm run build
npm run dev
```

If you don't have Node.js, you can use any static file server, e.g. `python3 -m http.server 5173` from this folder. The compiled website can be hosted on GitHub Pages, Netlify, Cloudflare Pages, or any static hosting service.

## Make it yours

1. Open `src/main.ts` and edit the `portfolioConfig` object near the top: `name`, `email`, `location`, `title`.
2. Update your role, bio, capabilities, project names, and descriptions in `index.html`.
3. Edit the three `projectCases` in `src/main.ts` so the project popups accurately describe your **real work**. The bundled case studies are explicitly marked **SAMPLE PROJECT**, not claims of completed work.
4. Change the initials/logo and SEO page description in `index.html` if desired.
5. Change colors, font sizes, and layout in `styles.css`, particularly the variables at the top.
6. Run `npm run build` after every edit to TypeScript. This updates `app.js`.
7. Replace `assets/favicon.svg` with your brand mark if desired.

> Contact uses a `mailto:` link, not a backend form. Set a real email address before publishing.

## Interactive features

- Animated radar visualization with a CSS scanning beam
- Keyboard-friendly command terminal (`Ctrl+K` / `Cmd+K` / `/`) with `help`, `about`, `skills`, `projects`, `contact`, `clear`, and more
- Project filters and accessible case-study dialogs
- Copy-email button with fallback for restricted clipboard contexts
- Mobile navigation and scroll reveal transitions
- Reduced-motion support and keyboard focus states

## Structure

```text
cybersec-portfolio/
├── index.html       # Sections and UI markup
├── styles.css       # Theme, animations, and responsive layout
├── app.js           # Built browser JS (included)
├── src/main.ts      # Strict TypeScript source and your editable config
├── assets/favicon.svg
├── scripts/serve.mjs
├── tsconfig.json
└── package.json
```

## Deploy

Upload the **entire project root** (or at minimum `index.html`, `styles.css`, `app.js`, and `assets/`) to a static site host. No environment variables or API keys required. For GitHub Pages, ensure your site's root contains `index.html`. Relative asset paths also work under repository subpaths.

## Security / honesty note

This is a **portfolio showcase**, not a real SOC. The radar, "system secure" display, terminal, and project visualizations are illustrative UI elements. Project text is provided as editable sample content. Do not present examples as completed experience without replacing them with accurate work.

For a single-file version that needs no adjacent assets, use `standalone-preview.html`.
