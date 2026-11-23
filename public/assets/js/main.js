(function () {
  "use strict";

  var C = window.PORTFOLIO;
  if (!C) return;

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- Utilidades ---------- */
  var store = {
    get: function (k) {
      try { return window.localStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { window.localStorage.setItem(k, v); } catch (e) { /* almacenamiento no disponible */ }
    },
  };

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Idioma: 1) ?lang=es|en en la URL  2) elección guardada  3) idioma del navegador
     (español → "es"; cualquier otro o desconocido → inglés por defecto) */
  function detectLang() {
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    var first = String(list[0] || "").toLowerCase();
    return first.indexOf("es") === 0 ? "es" : "en";
  }

  var lang = null;
  try {
    var qp = new URLSearchParams(window.location.search).get("lang");
    if (qp === "es" || qp === "en") {
      lang = qp;
      store.set("lang", qp);
    }
  } catch (e) { /* URLSearchParams no disponible */ }
  if (!lang) lang = store.get("lang");
  if (lang !== "es" && lang !== "en") lang = detectLang();

  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && ("es" in v || "en" in v)) {
      return v[lang] != null ? v[lang] : v.es;
    }
    return v;
  }

  function t(path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? o : o[k];
    }, C.i18n[lang]);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* *texto* → <em>texto</em> (después de escapar) */
  function rich(s) {
    return esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function $(id) { return document.getElementById(id); }

  var ARROW_UR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  var ARROW_DN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v14M6 12l6 6 6-6"/></svg>';

  /* ---------- Ilustraciones de proyectos (400x200, estilo plano técnico) ---------- */
  function tiles() {
    var out = "";
    [70, 120].forEach(function (y, ri) {
      [50, 118, 186].forEach(function (x, ci) {
        var first = ri === 0 && ci === 0;
        out +=
          '<rect class="' + (first ? "a-soft" : "a-muted") + '" x="' + x + '" y="' + y + '" width="64" height="42" rx="3"/>' +
          '<rect class="' + (first ? "a-accent" : "a-soft") + '" x="' + (x + 10) + '" y="' + (y + 9) + '" width="14" height="14" rx="2"/>' +
          '<path class="a-line" d="M' + (x + 10) + " " + (y + 32) + "h" + (ci === 1 ? 30 : 40) + '"/>';
      });
    });
    return out;
  }

  var ART = {
    pos:
      '<rect class="a-panel" x="36" y="26" width="228" height="150" rx="6"/>' +
      '<rect class="a-muted" x="50" y="40" width="200" height="20" rx="3"/>' +
      '<circle class="a-accent" cx="62" cy="50" r="4"/>' +
      '<path class="a-line" d="M74 50h44M206 50h32"/>' +
      tiles() +
      '<path class="a-panel" d="M286 34h82v124l-10.25 7-10.25-7-10.25 7-10.25-7-10.25 7-10.25-7-10.25 7-10.25-7z"/>' +
      '<path class="a-line" d="M298 54h40M298 68h58M298 82h48M298 96h30"/>' +
      '<path class="a-line a-dashed" d="M298 112h58"/>' +
      '<rect class="a-accent" x="298" y="124" width="58" height="14" rx="2"/>',
    tv:
      '<rect class="a-panel" x="94" y="18" width="212" height="132" rx="6"/>' +
      '<rect class="a-soft" x="106" y="30" width="188" height="108" rx="2"/>' +
      '<circle class="a-accent" cx="200" cy="76" r="22"/>' +
      '<path class="a-knock" d="M193 65v22l18-11z"/>' +
      '<rect class="a-muted" x="122" y="118" width="156" height="5" rx="2.5"/>' +
      '<rect class="a-accent" x="122" y="118" width="70" height="5" rx="2.5"/>' +
      '<path class="a-panel" d="M178 150h44l8 16h-60z"/>' +
      '<rect class="a-panel" x="30" y="84" width="46" height="88" rx="6"/>' +
      '<rect class="a-soft" x="36" y="94" width="34" height="62" rx="2"/>' +
      '<path class="a-accent" d="M48 118v14l11-7z"/>' +
      '<rect class="a-panel" x="328" y="66" width="36" height="108" rx="12"/>' +
      '<circle class="a-accent" cx="346" cy="92" r="9"/>' +
      '<circle class="a-muted" cx="346" cy="120" r="4.5"/>' +
      '<circle class="a-muted" cx="346" cy="136" r="4.5"/>' +
      '<circle class="a-muted" cx="346" cy="152" r="4.5"/>',
    van:
      '<path class="a-route" d="M52 64C120 14 196 104 258 58S330 34 352 44"/>' +
      '<circle class="a-soft" cx="52" cy="64" r="12"/>' +
      '<circle class="a-accent" cx="52" cy="64" r="6"/>' +
      '<path class="a-accent" d="M360 22a11 11 0 0 0-11 11c0 9 11 20 11 20s11-11 11-20a11 11 0 0 0-11-11z"/>' +
      '<circle class="a-knock" cx="360" cy="33" r="4"/>' +
      '<path class="a-panel" d="M110 94h130a10 10 0 0 1 10 10v20h18l22 20v14a6 6 0 0 1-6 6H106a6 6 0 0 1-6-6v-54a10 10 0 0 1 10-10z"/>' +
      '<rect class="a-soft" x="116" y="108" width="34" height="22" rx="2"/>' +
      '<rect class="a-soft" x="160" y="108" width="34" height="22" rx="2"/>' +
      '<rect class="a-muted" x="206" y="108" width="24" height="42" rx="2"/>' +
      '<path class="a-soft" d="M256 130h10l15 13h-25z"/>' +
      '<rect class="a-accent" x="101" y="150" width="188" height="5"/>' +
      '<circle class="a-wheel" cx="138" cy="164" r="13"/><circle class="a-accent" cx="138" cy="164" r="4"/>' +
      '<circle class="a-wheel" cx="254" cy="164" r="13"/><circle class="a-accent" cx="254" cy="164" r="4"/>' +
      '<path class="a-line" d="M20 178h360"/>' +
      '<path class="a-line a-dashed-wide" d="M30 190h340"/>',
  };

  function art(name) {
    return (
      '<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      (ART[name] || "") +
      "</svg>"
    );
  }

  /* ---------- Código de barras (decorativo, derivado del texto) ---------- */
  function barcode(text) {
    var widths = [2, 1, 1, 1]; // guarda inicial
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      widths.push((c & 3) + 1, ((c >> 2) & 3) + 1, ((c >> 4) & 1) + 1, ((c >> 5) & 3) + 1);
    }
    widths.push(1, 1, 2, 1); // guarda final
    var x = 0;
    var bars = "";
    widths.forEach(function (w, idx) {
      if (idx % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + w + '" height="40"/>';
      x += w;
    });
    return '<svg viewBox="0 0 ' + x + ' 40" preserveAspectRatio="none" aria-hidden="true">' + bars + "</svg>";
  }

  /* ---------- Hora local (Cabudare, UTC−4) ---------- */
  function timeParts(date) {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: C.profile.timeZone,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: false,
      }).formatToParts(date);
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      return { d: o.day, m: o.month, y: o.year, hh: o.hour === "24" ? "00" : o.hour, mm: o.minute };
    } catch (e) {
      // Sin soporte de zonas horarias: calcula UTC−4 a mano
      var v = new Date(date.getTime() - 4 * 3600 * 1000);
      return {
        d: pad(v.getUTCDate()), m: pad(v.getUTCMonth() + 1), y: String(v.getUTCFullYear()),
        hh: pad(v.getUTCHours()), mm: pad(v.getUTCMinutes()),
      };
    }
  }

  function renderClock() {
    var p = timeParts(new Date());
    document.querySelectorAll("[data-clock]").forEach(function (n) {
      n.textContent = p.hh + ":" + p.mm;
    });
  }

  /* ---------- Render ---------- */
  function renderStatic() {
    root.lang = lang;
    document.title = t("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));

    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      var v = t(n.getAttribute("data-i18n"));
      if (typeof v === "string") n.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (n) {
      var v = t(n.getAttribute("data-i18n-aria"));
      if (typeof v === "string") n.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-lang]").forEach(function (n) {
      n.classList.toggle("is-active", n.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-year]").forEach(function (n) {
      n.textContent = String(new Date().getFullYear());
    });

    /* Enlaces de contacto con mensaje / asunto en el idioma actual */
    var waHref = C.profile.whatsapp + "?text=" + encodeURIComponent(t("contact.waText"));
    var mailHref = "mailto:" + C.profile.email + "?subject=" + encodeURIComponent(t("contact.mailSubject"));
    document.querySelectorAll("[data-wa]").forEach(function (a) { a.setAttribute("href", waHref); });
    document.querySelectorAll("[data-mail]").forEach(function (a) { a.setAttribute("href", mailHref); });

    $("statement").innerHTML = rich(t("about.statement"));
    $("contact-title").innerHTML = rich(t("contact.title"));
  }

  function renderReceipt() {
    var R = t("receipt");
    var p = timeParts(new Date());
    var date = lang === "es" ? p.d + "/" + p.m + "/" + p.y : p.m + "/" + p.d + "/" + p.y;

    var html =
      '<div class="r-head">' +
      "<strong>" + esc(R.title) + "</strong>" +
      "<span>" + esc(R.place) + "</span>" +
      "<span>" + esc(R.ticket) + " · " + date + " " + p.hh + ":" + p.mm + "</span>" +
      "</div>" +
      '<div class="r-rule"></div>' +
      '<div class="r-row r-th"><span>' + esc(R.qty) + "</span><span>" + esc(R.desc) + "</span></div>" +
      R.items.map(function (it) {
        return '<div class="r-row"><span>' + esc(it[0]) + "</span><span>" + esc(it[1]) + "</span></div>";
      }).join("") +
      '<div class="r-rule"></div>' +
      R.services.map(function (s) {
        return '<div class="r-line"><span>' + esc(s) + "</span><span>OK</span></div>";
      }).join("") +
      '<div class="r-rule r-double"></div>' +
      '<div class="r-total"><span>' + esc(R.total) + "</span><span>" + esc(R.totalValue) + "</span></div>" +
      '<div class="r-rule r-double"></div>' +
      '<div class="r-barcode">' + barcode("BLACKSHERU-0001") + "</div>" +
      '<div class="r-foot"><span>' + esc(C.profile.githubLabel) + "</span><strong>" + esc(R.thanks) + "</strong></div>" +
      '<div class="r-stamp">' + esc(R.stamp) + "</div>";

    $("receipt").innerHTML = html;
  }

  function renderMarquee() {
    var items = t("marquee");
    var one = items.map(function (s) {
      return '<span class="mq-item">' + esc(s) + '</span><span class="mq-sep">/</span>';
    }).join("");
    // Dos copias para que el desplazamiento sea continuo
    $("marquee").innerHTML = '<div class="mq-group">' + one + '</div><div class="mq-group">' + one + "</div>";
  }

  function renderServices() {
    $("services").innerHTML = t("services")
      .map(function (s, i) {
        return (
          "<li>" +
          '<span class="svc-num">' + pad(i + 1) + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          "</li>"
        );
      })
      .join("");
  }

  function slashList(items) {
    return items.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
  }

  function renderJobs() {
    $("jobs").innerHTML = C.experience
      .map(function (x) {
        var company = x.url
          ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.company) + ARROW_UR + "</a>"
          : esc(x.company);

        var when = "";
        if (x.period) when += '<span class="job-period">' + esc(L(x.period)) + "</span>";
        if (x.meta) when += '<span class="job-place">' + esc(L(x.meta)) + "</span>";
        if (x.current) when += '<span class="job-live"><span class="live-dot" aria-hidden="true"></span>' + esc(t("experience.current")) + "</span>";

        return (
          '<li class="job">' +
          '<div class="job-when">' + when + "</div>" +
          '<div class="job-main">' +
          '<h3 class="job-company">' + company + "</h3>" +
          '<p class="job-role">' + esc(L(x.role)) +
          (x.companyNote ? ' <span class="job-note">· ' + esc(x.companyNote) + "</span>" : "") + "</p>" +
          '<ul class="job-bullets">' +
          L(x.bullets).map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
          "</ul>" +
          '<p class="job-tags">' + slashList(L(x.tags)) + "</p>" +
          "</div>" +
          "</li>"
        );
      })
      .join("");
  }

  /* Imagen seleccionada en cada galería (se conserva al cambiar de idioma) */
  var galleryIndex = {};

  function figCaption(p, n, idx) {
    var img = p.images && p.images[idx];
    if (!img) {
      return "<span>" + esc(t("projects.fig")) + " " + n + " · " + esc(t("projects.illustration")) + "</span><span>" + esc(L(p.name)) + "</span>";
    }
    return (
      '<span class="fig-alt">' + esc(t("projects.fig")) + " " + n + "." + (idx + 1) + " · " + esc(L(img.alt)) + "</span>" +
      "<span>" + esc(t("projects.source")) + ": " + esc(img.source) + "</span>"
    );
  }

  function projectFigure(p, i, n) {
    if (!p.images || !p.images.length) {
      return (
        '<figure class="proj-fig">' +
        '<div class="fig-frame">' + art(p.art) + "</div>" +
        "<figcaption>" + figCaption(p, n, -1) + "</figcaption>" +
        "</figure>"
      );
    }
    var idx = galleryIndex[i] || 0;
    var cur = p.images[idx];
    var thumbs = "";
    if (p.images.length > 1) {
      thumbs =
        '<div class="fig-thumbs">' +
        p.images.map(function (img, k) {
          return (
            '<button type="button" class="fig-thumb' + (k === idx ? " is-active" : "") + '" data-proj="' + i + '" data-img="' + k + '"' +
            ' aria-pressed="' + (k === idx ? "true" : "false") + '" aria-label="' + esc(t("projects.view") + " " + (k + 1) + ": " + L(img.alt)) + '">' +
            '<img src="' + esc(img.src) + '" alt="" width="1280" height="800" loading="lazy" decoding="async">' +
            "</button>"
          );
        }).join("") +
        "</div>";
    }
    return (
      '<figure class="proj-fig" data-proj="' + i + '">' +
      '<div class="fig-frame is-photo">' +
      '<img class="fig-img" src="' + esc(cur.src) + '" alt="' + esc(L(cur.alt)) + '" width="1280" height="800"' +
      (i === 0 ? "" : ' loading="lazy"') + ' decoding="async">' +
      "</div>" +
      "<figcaption>" + figCaption(p, n, idx) + "</figcaption>" +
      thumbs +
      "</figure>"
    );
  }

  function projectLinks(p) {
    if (!p.links || !p.links.length) return "";
    return (
      '<div class="proj-links">' +
      '<p class="proj-links-label">' + esc(t("projects.links")) + "</p>" +
      "<ul>" +
      p.links.map(function (l) {
        return (
          "<li>" +
          '<a class="' + (l.primary ? "proj-link" : "store-link") + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          esc(L(l.label)) + ARROW_UR + "</a>" +
          "</li>"
        );
      }).join("") +
      "</ul>" +
      "</div>"
    );
  }

  function setGalleryImage(i, k) {
    var p = C.projects[i];
    if (!p || !p.images || !p.images[k]) return;
    galleryIndex[i] = k;
    var fig = document.querySelector('.proj-fig[data-proj="' + i + '"]');
    if (!fig) return;
    var n = pad(i + 1);
    var img = fig.querySelector(".fig-img");
    img.src = p.images[k].src;
    img.alt = L(p.images[k].alt);
    fig.querySelector("figcaption").innerHTML = figCaption(p, n, k);
    fig.querySelectorAll(".fig-thumb").forEach(function (b) {
      var on = b.getAttribute("data-img") === String(k);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function renderProjects() {
    var total = pad(C.projects.length);
    $("projects-list").innerHTML = C.projects
      .map(function (p, i) {
        var n = pad(i + 1);
        var name = L(p.name);
        return (
          '<article class="proj reveal">' +
          '<div class="proj-text">' +
          '<p class="proj-idx"><span>' + n + "</span> / " + total + "</p>" +
          '<h3 class="proj-name">' + esc(name) + "</h3>" +
          '<p class="proj-kind">' + esc(L(p.kind)) + "</p>" +
          '<p class="proj-summary">' + esc(L(p.summary)) + "</p>" +
          '<dl class="proj-meta">' +
          "<div><dt>" + esc(t("projects.role")) + "</dt><dd>" + esc(L(p.role)) + "</dd></div>" +
          "<div><dt>" + esc(t("projects.stack")) + "</dt><dd>" + slashList(L(p.stack)) + "</dd></div>" +
          "</dl>" +
          projectLinks(p) +
          "</div>" +
          projectFigure(p, i, n) +
          "</article>"
        );
      })
      .join("");
    observeReveals();
  }

  function renderSpec() {
    var rows = C.skills.map(function (g) {
      return (
        '<div class="spec-row">' +
        "<dt>" + esc(L(g.title)) + "</dt>" +
        '<dd class="spec-items">' + slashList(L(g.items)) + "</dd>" +
        "</div>"
      );
    });

    var e = C.education;
    rows.push(
      '<div class="spec-row">' +
      "<dt>" + esc(t("education.title")) + "</dt>" +
      '<dd class="spec-edu">' +
      "<strong>" + esc(L(e.degree)) + "</strong>" +
      "<span>" + esc(e.school) + "</span>" +
      '<span class="spec-date">' + esc(L(e.period)) + "</span>" +
      "</dd>" +
      "</div>"
    );

    rows.push(
      '<div class="spec-row">' +
      "<dt>" + esc(t("education.languagesTitle")) + "</dt>" +
      '<dd class="spec-langs">' +
      C.languages.map(function (l) {
        return "<span><strong>" + esc(L(l.name)) + "</strong> " + esc(L(l.level)) + "</span>";
      }).join("") +
      "</dd>" +
      "</div>"
    );

    $("spec").innerHTML = rows.join("");
  }

  function renderContact() {
    var P = C.profile;
    var items = [
      { label: t("contact.linkedin"), value: P.linkedinLabel, href: P.linkedin, ext: true },
      { label: t("contact.github"), value: P.githubLabel, href: P.github, ext: true },
      { label: t("contact.cv"), value: t("contact.cvValue"), href: P.cv, download: true },
    ];
    $("contact-links").innerHTML = items
      .map(function (it) {
        var attrs = it.ext ? ' target="_blank" rel="noopener"' : it.download ? " download" : "";
        return (
          "<li>" +
          '<a href="' + esc(it.href) + '"' + attrs + ">" +
          '<span class="cl-label">' + esc(it.label) + "</span>" +
          '<span class="cl-value">' + esc(it.value) + "</span>" +
          '<span class="cl-arrow">' + (it.download ? ARROW_DN : ARROW_UR) + "</span>" +
          "</a>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderAll() {
    renderStatic();
    renderReceipt();
    renderMarquee();
    renderServices();
    renderJobs();
    renderProjects();
    renderSpec();
    renderContact();
    renderClock();
  }

  /* ---------- Interacciones ---------- */
  function currentTheme() {
    var a = root.getAttribute("data-theme");
    if (a === "light" || a === "dark") return a;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setupTheme() {
    $("theme-toggle").addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("theme", next);
    });
  }

  function setupLang() {
    $("lang-toggle").addEventListener("click", function () {
      lang = lang === "es" ? "en" : "es";
      store.set("lang", lang);
      renderAll();
    });
  }

  function setupMenu() {
    var header = $("site-header");
    var btn = $("menu-toggle");
    var links = $("nav-links");

    function setOpen(open) {
      header.classList.toggle("menu-open", open);
      root.classList.toggle("no-scroll", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var word = btn.querySelector(".menu-word");
      if (word) word.textContent = t(open ? "nav.close" : "nav.menu");
    }
    btn.addEventListener("click", function () {
      setOpen(!header.classList.contains("menu-open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860 && header.classList.contains("menu-open")) setOpen(false);
    });
  }

  function setupHeaderScroll() {
    var header = $("site-header");
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(links).forEach(function (id) {
            links[id].classList.toggle("is-active", id === en.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  var revealIO = null;

  function observeReveals() {
    var els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-visible"); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("is-visible");
              revealIO.unobserve(en.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
      );
    }
    els.forEach(function (e) { revealIO.observe(e); });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  /* Barra flotante: aparece al pasar la portada y se oculta en la sección de contacto */
  function setupQuickContact() {
    var dock = $("quick-contact");
    var contact = $("contact");
    if (!dock || !contact) return;
    var contactInView = false;
    function update() {
      dock.classList.toggle("is-visible", window.scrollY > 560 && !contactInView);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        contactInView = entries[0].isIntersecting;
        update();
      }, { rootMargin: "0px 0px -15% 0px" }).observe(contact);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function setupGallery() {
    $("projects-list").addEventListener("click", function (e) {
      var b = e.target.closest(".fig-thumb");
      if (!b) return;
      setGalleryImage(parseInt(b.getAttribute("data-proj"), 10), parseInt(b.getAttribute("data-img"), 10));
    });
  }

  function setupCopy() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy]");
      if (!btn) return;
      copyText(btn.getAttribute("data-copy")).then(function () {
        var label = btn.querySelector(".copy-label");
        btn.classList.add("is-copied");
        if (label) label.textContent = t("contact.copied");
        setTimeout(function () {
          btn.classList.remove("is-copied");
          if (label) label.textContent = t("contact.copy");
        }, 1800);
      }, function () { /* sin portapapeles: el enlace mailto sigue disponible */ });
    });
  }

  /* ---------- Inicio ---------- */
  renderAll();
  setupTheme();
  setupLang();
  setupMenu();
  setupHeaderScroll();
  setupActiveNav();
  observeReveals();
  setupCopy();
  setupGallery();
  setupQuickContact();
  setInterval(renderClock, 20000);

  if (!reduceMotion) root.classList.add("print-receipt");
})();
