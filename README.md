# Hola, soy Miguel García 👋

**Ingeniero de Sistemas · Desarrollador Full-Stack · Arquitecto de soluciones POS y multiplataforma**
_Systems Engineer · Full-Stack Developer · POS & Multiplatform Solutions Architect_

📍 Cabudare, Lara, Venezuela · 🌐 Español (nativo) · English (professional)

Construyo software que se usa en el mundo real: puntos de venta en la nube, apps para Smart TV y móvil y plataformas web, y me encargo de que llegue hasta el cliente.

- 🧾 **YumYum POS**: POS en la nube, recibos fiscales e integraciones con Wolt y Bolt Food
- 📺 **VivaPlayer**: reproductor IPTV para Android, Fire TV, Vega OS, Roku e iOS, con portal de administración
- 🚐 **Relocate**: simulador multiplataforma de reubicación de autocaravanas
- 🏢 **HumboldtTech**: ingeniería full-stack en VivaPlayer, Roomfuly y YumYum
- 💳 **Capital Payment Systems**: módulos POS (Baruc X7) y ventas B2B en EE. UU.

**Stack:** Python · TypeScript · JavaScript · PHP · Dart · Java · C · BrightScript · SQL ·
Node.js · NestJS · React · Laravel · Flutter · PostgreSQL · MariaDB/MySQL · Supabase · Cloudflare · WebRTC

📫 [tramitesgarciamiguel@gmail.com](mailto:tramitesgarciamiguel@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/miguel-garcia-92056228b) ·
[Portafolio](https://blacksheru.pages.dev/)

---

<details>
<summary><strong>Sobre este repositorio: portafolio web (Cloudflare Pages)</strong></summary>

El portafolio es un sitio estático (HTML + CSS + JavaScript, sin dependencias ni paso de build) que está en [`public/`](public/).

```
public/
├── index.html            # Estructura de la página
├── 404.html              # Página de error (Cloudflare Pages la usa automáticamente)
├── _headers              # Cabeceras de seguridad/caché para Cloudflare Pages
├── robots.txt · sitemap.xml
└── assets/
    ├── css/styles.css    # Estilos (tema claro/oscuro, responsive)
    ├── js/content.js     # ✏️ TODO el contenido (ES/EN): experiencia, proyectos, habilidades…
    ├── js/main.js        # Render, idioma, tema, menú, animaciones
    ├── img/              # favicon, icono iOS, imagen para redes (og-image.png)
    └── cv/               # CV descargable en PDF
```

**Actualizar contenido:** edita `public/assets/js/content.js`. Los campos con forma `{ es: "...", en: "..." }` se muestran según el idioma elegido.

**Desplegar en Cloudflare Pages (desde GitHub):**

1. Cloudflare Dashboard → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* y elige este repositorio.
2. Rama de producción: la rama donde esté el sitio (p. ej. `main`).
3. *Framework preset*: **None** · *Build command*: _(vacío)_ · *Build output directory*: **`public`**.
4. Guarda y despliega. Cada `push` a esa rama publica una nueva versión.

**O desde la terminal con Wrangler:**

```bash
npx wrangler pages deploy public --project-name=blacksheru
```

Si el proyecto tiene otro nombre o usas un dominio propio, cambia `https://blacksheru.pages.dev/` en `public/index.html` (canonical, Open Graph y JSON-LD), `public/robots.txt` y `public/sitemap.xml`.

**Probar en local:**

```bash
python3 -m http.server 8080 --directory public
```

</details>
