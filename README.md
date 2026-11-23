# Hola, soy Miguel García 👋

**Ingeniero de Sistemas · Desarrollador Full-Stack · Arquitecto de soluciones POS y multiplataforma**
_Systems Engineer · Full-Stack Developer · POS & Multiplatform Solutions Architect_

📍 Cabudare, Lara, Venezuela · 🌐 Español (nativo) · English (professional)

Construyo software que se usa en el mundo real: puntos de venta en la nube, apps para Smart TV y móvil y plataformas web, y me encargo de que llegue hasta el cliente.

- 🧾 **YumYum POS**: POS en la nube, recibos fiscales e integraciones con Wolt y Bolt Food
- 📺 **VivaPlayer**: reproductor IPTV para Android, Fire TV, Vega OS, Roku e iOS, con portal de administración
- 🚐 **Relocate**: simulador multiplataforma de reubicación de autocaravanas
- 🏢 **HumboldtTech**: ingeniería full-stack en VivaPlayer, Roomfully y YumYum
- 💳 **Capital Payment Systems**: módulos POS (Baruc X7) y ventas B2B en EE. UU.

**Stack:** Python · TypeScript · JavaScript · PHP · Dart · Java · C · BrightScript · SQL ·
Node.js · NestJS · React · Laravel · Flutter · PostgreSQL · MariaDB/MySQL · Supabase · Cloudflare · WebRTC

📫 [tramitesgarciamiguel@gmail.com](mailto:tramitesgarciamiguel@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/miguel-garcia-92056228b) ·
[Portafolio](https://blacksheru.com/)

---

<details>
<summary><strong>Sobre este repositorio: portafolio web (Cloudflare Workers)</strong></summary>

El portafolio es un sitio estático (HTML + CSS + JavaScript, sin dependencias ni paso de build) que está en [`public/`](public/).

```
wrangler.jsonc            # Configuración de Cloudflare Workers (publica la carpeta public/)
public/
├── index.html            # Estructura de la página
├── 404.html              # Página de error (rutas inexistentes)
├── _headers              # Cabeceras de seguridad/caché
├── robots.txt · sitemap.xml
└── assets/
    ├── css/styles.css    # Estilos (tema claro/oscuro, responsive)
    ├── js/content.js     # ✏️ TODO el contenido (ES/EN): experiencia, proyectos, habilidades…
    ├── js/main.js        # Render, idioma, tema, menú, animaciones
    ├── img/              # favicon, icono iOS, imagen para redes (og-image.png)
    ├── img/projects/     # Capturas reales de cada producto (WebP 1280×800)
    └── cv/               # CV descargable en PDF
```

**Actualizar contenido:** edita `public/assets/js/content.js`. Los campos con forma `{ es: "...", en: "..." }` se muestran según el idioma elegido. Cada proyecto admite `images` (galería de capturas; la primera es la principal) y `links` (web y tiendas oficiales). Si un proyecto no tiene `images`, se muestra una ilustración.

**Idioma:** inglés por defecto. Si el navegador del visitante está en español, la página se muestra en español; la elección manual (botón ES / EN) se recuerda. También se puede forzar con `?lang=es` o `?lang=en` en la URL.

**Desplegar en Cloudflare Workers (desde GitHub):**

El Worker `blacksheru` está conectado a este repositorio con *Workers Builds*:

1. Cloudflare → *Workers & Pages* → `blacksheru` → *Settings* → *Build*.
2. *Branch control* → rama de producción: **`main`**.
3. *Build command*: _(vacío)_ · *Deploy command*: **`npx wrangler deploy`** · *Root directory*: **`/`**.
4. Cada `push` a `main` publica una nueva versión. `wrangler.jsonc` indica qué carpeta publicar; su `name` debe coincidir con el nombre del Worker.

**O desde la terminal:**

```bash
npx wrangler deploy
```

El dominio configurado es `https://blacksheru.com/`. Si cambia, actualízalo en `public/index.html` (canonical, Open Graph y JSON-LD), `public/robots.txt` y `public/sitemap.xml`.

**Probar en local:**

```bash
python3 -m http.server 8080 --directory public
```

</details>
