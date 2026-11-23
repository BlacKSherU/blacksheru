# Hi, I'm Miguel García 👋

**Systems Engineer · Full-Stack Developer · POS & Multiplatform Solutions Architect**

📍 Cabudare, Lara, Venezuela · 🌐 Spanish (native) · English (professional)

I build software people use in the real world: cloud point-of-sale systems, Smart TV and mobile apps, and web platforms — and I take it all the way to the customer.

- 🧾 **YumYum POS**: cloud POS, fiscal receipts, and Wolt and Bolt Food integrations
- 📺 **VivaPlayer**: IPTV player for Android, Fire TV, Vega OS, Roku, and iOS, with an admin portal
- 🚐 **Relocate**: multiplatform motorhome relocation simulator
- 🏢 **HumboldtTech**: full-stack engineering on VivaPlayer, Roomfully, and YumYum

**Stack:** Python · TypeScript · JavaScript · PHP · Dart · Java · C · BrightScript · SQL ·
Node.js · NestJS · React · Laravel · Flutter · PostgreSQL · MariaDB/MySQL · Supabase · Cloudflare · WebRTC

📫 [tramitesgarciamiguel@gmail.com](mailto:tramitesgarciamiguel@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/miguel-garcia-92056228b) ·
[Portfolio](https://blacksheru.com/)

---

<details>
<summary><strong>About this repository: web portfolio (Cloudflare Workers)</strong></summary>

The portfolio is a static site (HTML + CSS + JavaScript, no dependencies and no build step) that lives in [`public/`](public/).

```
wrangler.jsonc            # Cloudflare Workers config (publishes the public/ folder)
public/
├── index.html            # Page structure
├── 404.html              # Error page (unknown routes)
├── _headers              # Security and cache headers
├── robots.txt · sitemap.xml
└── assets/
    ├── css/styles.css    # Styles (light/dark theme, responsive)
    ├── js/content.js     # ✏️ ALL content (ES/EN): experience, projects, skills…
    ├── js/main.js        # Render, language, theme, menu, animations
    ├── img/              # favicon, iOS icon, social image (og-image.png)
    ├── img/projects/     # Real product screenshots (WebP 1280×800)
    └── cv/               # Downloadable CV as PDF
```

**Update content:** edit `public/assets/js/content.js`. Fields shaped like `{ es: "...", en: "..." }` are shown according to the selected language. Each project can have `images` (screenshot gallery; the first one is the main image) and `links` (website and official stores). If a project has no `images`, an illustration is shown instead.

**Language:** English by default. If the visitor’s browser is set to Spanish, the page is shown in Spanish; a manual choice (ES / EN button) is remembered. You can also force it with `?lang=es` or `?lang=en` in the URL.

**Deploy on Cloudflare Workers (from GitHub):**

The `blacksheru` Worker is connected to this repository with *Workers Builds*:

1. Cloudflare → *Workers & Pages* → `blacksheru` → *Settings* → *Build*.
2. *Branch control* → production branch: **`main`**.
3. *Build command*: _(empty)_ · *Deploy command*: **`npx wrangler deploy`** · *Root directory*: **`/`**.
4. Each `push` to `main` publishes a new version. `wrangler.jsonc` says which folder to publish; its `name` must match the Worker name.

**Or from the terminal:**

```bash
npx wrangler deploy
```

The configured domain is `https://blacksheru.com/`. If it changes, update it in `public/index.html` (canonical, Open Graph, and JSON-LD), `public/robots.txt`, and `public/sitemap.xml`.

**Run locally:**

```bash
python3 -m http.server 8080 --directory public
```

</details>
