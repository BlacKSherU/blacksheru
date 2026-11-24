/*
 * Genera los CV en PDF (inglés y español) a partir de cv/cv.html.
 *
 *   npm i --no-save playwright && npx playwright install chromium
 *   node cv/build.cjs
 *
 * Salida: public/assets/cv/Miguel-Garcia-CV-EN.pdf y Miguel-Garcia-CV-ES.pdf
 */
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const SRC = pathToFileURL(path.join(__dirname, "cv.html")).href;
const OUT = path.join(ROOT, "public", "assets", "cv");

const VERSIONS = [
  { lang: "en", file: "Miguel-Garcia-CV-EN.pdf", doc: "Curriculum Vitae", page: "Page", of: "of" },
  { lang: "es", file: "Miguel-Garcia-CV-ES.pdf", doc: "Currículum Vitae", page: "Página", of: "de" },
];

// Pie de página de cada hoja: nombre, sitio web y número de página
function footer(v) {
  return `
    <div style="position:relative; top:-28.4px; width:100%; margin:0 65px 0 64px; padding-top:17.9px; border-top:1px solid #e2e8f0;
                display:flex; justify-content:space-between; font-family:Arial,'Liberation Sans',Helvetica,sans-serif;
                font-size:11.33px; color:#64748b; -webkit-print-color-adjust:exact;">
      <span>Miguel Alejandro García Ovalles — ${v.doc} · blacksheru.com</span>
      <span>${v.page} <span class="pageNumber"></span> ${v.of} <span class="totalPages"></span></span>
    </div>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const v of VERSIONS) {
    await page.goto(`${SRC}?lang=${v.lang}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(OUT, v.file);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: "57px", right: "65px", bottom: "78px", left: "64px" },
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: footer(v),
    });
    console.log("✓", path.relative(ROOT, out));
  }
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
