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

  var lang = store.get("lang");
  if (lang !== "es" && lang !== "en") {
    lang = /^es\b/i.test(navigator.language || "es") ? "es" : "en";
  }

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

  function $(id) { return document.getElementById(id); }

  /* ---------- Iconos (24x24, trazo) ---------- */
  var ICONS = {
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    pos: '<rect x="4" y="3" width="16" height="12" rx="2"/><path d="M8 19h8M12 15v4M8 7h5M8 10.5h8"/>',
    tv: '<rect x="2.5" y="4.5" width="19" height="12.5" rx="2"/><path d="m8 21 4-4 4 4"/><path d="M10.5 8.5v4.5l3.8-2.25z"/>',
    handshake: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M11 13v2h2v-2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>',
    plug: '<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0V7zM12 17v5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    phone: '<path d="M5 3h3.5l1.8 4.6-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 14.5V18a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3 5.1 2 2 0 0 1 5 3z"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5L2 9z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11v6M9 14l3 3 3-3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  };
  var FILL_ICONS = {
    github:
      '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>',
    linkedin:
      '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
  };

  function icon(name) {
    if (FILL_ICONS[name]) {
      return '<svg viewBox="0 0 24 24" class="fill" aria-hidden="true">' + FILL_ICONS[name] + "</svg>";
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.code) + "</svg>";
  }

  /* ---------- Ilustraciones de proyectos (400x200) ---------- */
  function keypad() {
    var out = "";
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 3; c++) {
        var cls = r === 3 && c === 2 ? "a-accent" : "a-muted";
        out += '<rect class="' + cls + '" x="' + (158 + c * 26) + '" y="' + (104 + r * 18) + '" width="20" height="12" rx="4"/>';
      }
    }
    return out;
  }

  function tiles() {
    var out = "";
    var xs = [50, 118, 186];
    var ys = [70, 120];
    ys.forEach(function (y, ri) {
      xs.forEach(function (x, ci) {
        var first = ri === 0 && ci === 0;
        out +=
          '<rect class="' + (first ? "a-soft" : "a-muted") + '" x="' + x + '" y="' + y + '" width="64" height="42" rx="8"/>' +
          '<rect class="' + (first ? "a-accent" : "a-soft") + '" x="' + (x + 10) + '" y="' + (y + 9) + '" width="14" height="14" rx="4"/>' +
          '<path class="a-line" d="M' + (x + 10) + " " + (y + 32) + "h" + (ci === 1 ? 30 : 40) + '"/>';
      });
    });
    return out;
  }

  var ART = {
    pos:
      '<rect class="a-panel" x="36" y="26" width="228" height="150" rx="14"/>' +
      '<rect class="a-muted" x="50" y="40" width="200" height="20" rx="6"/>' +
      '<circle class="a-accent" cx="62" cy="50" r="4"/>' +
      '<path class="a-line" d="M74 50h44M206 50h32"/>' +
      tiles() +
      '<path class="a-panel" d="M286 34h82v124l-10.25 7-10.25-7-10.25 7-10.25-7-10.25 7-10.25-7-10.25 7-10.25-7z"/>' +
      '<path class="a-line" d="M298 54h40M298 68h58M298 82h48M298 96h30"/>' +
      '<path class="a-line a-dashed" d="M298 112h58"/>' +
      '<rect class="a-accent" x="298" y="124" width="58" height="14" rx="5"/>',
    tv:
      '<rect class="a-panel" x="94" y="18" width="212" height="132" rx="12"/>' +
      '<rect class="a-soft" x="106" y="30" width="188" height="108" rx="6"/>' +
      '<circle class="a-accent" cx="200" cy="76" r="22"/>' +
      '<path class="a-bgfill" d="M193 65v22l18-11z"/>' +
      '<rect class="a-muted" x="122" y="118" width="156" height="5" rx="2.5"/>' +
      '<rect class="a-accent" x="122" y="118" width="70" height="5" rx="2.5"/>' +
      '<path class="a-panel" d="M178 150h44l8 16h-60z"/>' +
      '<rect class="a-panel" x="30" y="84" width="46" height="88" rx="9"/>' +
      '<rect class="a-soft" x="36" y="94" width="34" height="62" rx="3"/>' +
      '<path class="a-accent" d="M48 118v14l11-7z"/>' +
      '<rect class="a-panel" x="328" y="66" width="36" height="108" rx="15"/>' +
      '<circle class="a-accent" cx="346" cy="92" r="9"/>' +
      '<circle class="a-muted" cx="346" cy="120" r="4.5"/>' +
      '<circle class="a-muted" cx="346" cy="136" r="4.5"/>' +
      '<circle class="a-muted" cx="346" cy="152" r="4.5"/>',
    van:
      '<path class="a-route" d="M52 64C120 14 196 104 258 58S330 34 352 44"/>' +
      '<circle class="a-accent" cx="52" cy="64" r="6"/>' +
      '<circle class="a-soft" cx="52" cy="64" r="12"/>' +
      '<path class="a-accent" d="M360 22a11 11 0 0 0-11 11c0 9 11 20 11 20s11-11 11-20a11 11 0 0 0-11-11z"/>' +
      '<circle class="a-bgfill" cx="360" cy="33" r="4"/>' +
      '<path class="a-panel" d="M110 94h130a10 10 0 0 1 10 10v20h18l22 20v14a6 6 0 0 1-6 6H106a6 6 0 0 1-6-6v-54a10 10 0 0 1 10-10z"/>' +
      '<rect class="a-soft" x="116" y="108" width="34" height="22" rx="4"/>' +
      '<rect class="a-soft" x="160" y="108" width="34" height="22" rx="4"/>' +
      '<rect class="a-muted" x="206" y="108" width="24" height="42" rx="3"/>' +
      '<path class="a-soft" d="M256 130h10l15 13h-25z"/>' +
      '<rect class="a-accent" x="101" y="150" width="188" height="5"/>' +
      '<circle class="a-ink" cx="138" cy="164" r="13"/><circle class="a-muted" cx="138" cy="164" r="5"/>' +
      '<circle class="a-ink" cx="254" cy="164" r="13"/><circle class="a-muted" cx="254" cy="164" r="5"/>' +
      '<path class="a-line" d="M20 178h360"/>' +
      '<path class="a-line a-dashed-wide" d="M30 190h340"/>',
    terminal:
      '<g transform="rotate(-14 300 92)">' +
      '<rect class="a-accent" x="232" y="54" width="128" height="78" rx="10"/>' +
      '<rect class="a-bgfill a-op" x="232" y="70" width="128" height="13"/>' +
      '<rect class="a-chip" x="246" y="96" width="22" height="16" rx="3"/>' +
      "</g>" +
      '<path class="a-line" d="M120 80a16 16 0 0 0 0 30M108 70a30 30 0 0 0 0 50"/>' +
      '<rect class="a-panel" x="140" y="16" width="110" height="174" rx="16"/>' +
      '<rect class="a-soft" x="154" y="30" width="82" height="62" rx="6"/>' +
      '<circle class="a-accent" cx="195" cy="56" r="13"/>' +
      '<path class="a-check" d="m189 56 4.5 4.5 8-8.5"/>' +
      '<path class="a-line" d="M174 80h42"/>' +
      keypad(),
    civic:
      '<path class="a-panel" d="M40 76 120 38l80 38z"/>' +
      '<circle class="a-accent" cx="120" cy="62" r="6"/>' +
      '<rect class="a-panel" x="48" y="76" width="144" height="10" rx="2"/>' +
      '<rect class="a-muted" x="58" y="90" width="12" height="56" rx="2"/>' +
      '<rect class="a-muted" x="86" y="90" width="12" height="56" rx="2"/>' +
      '<rect class="a-muted" x="114" y="90" width="12" height="56" rx="2"/>' +
      '<rect class="a-muted" x="142" y="90" width="12" height="56" rx="2"/>' +
      '<rect class="a-muted" x="170" y="90" width="12" height="56" rx="2"/>' +
      '<rect class="a-panel" x="40" y="148" width="160" height="12" rx="3"/>' +
      '<rect class="a-panel" x="222" y="26" width="150" height="138" rx="12"/>' +
      '<path class="a-line" d="M238 44h46"/>' +
      '<rect class="a-soft" x="240" y="104" width="16" height="36" rx="3"/>' +
      '<rect class="a-soft" x="264" y="82" width="16" height="58" rx="3"/>' +
      '<rect class="a-soft" x="288" y="96" width="16" height="44" rx="3"/>' +
      '<rect class="a-accent" x="312" y="64" width="16" height="76" rx="3"/>' +
      '<rect class="a-accent" x="336" y="50" width="16" height="90" rx="3"/>' +
      '<path class="a-line" d="M236 146h120"/>' +
      '<path class="a-route" d="m248 92 24-18 24 12 24-30 24-14"/>',
  };

  function art(name) {
    return (
      '<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      (ART[name] || "") +
      "</svg>"
    );
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

    var lb = $("lang-toggle");
    if (lb) lb.textContent = lang === "es" ? "EN" : "ES";
  }

  function renderStats() {
    $("stats").innerHTML = t("stats")
      .map(function (s) {
        return '<div class="stat"><dt>' + esc(s.label) + "</dt><dd>" + esc(s.value) + "</dd></div>";
      })
      .join("");
  }

  function renderSectors() {
    $("sectors-list").innerHTML = t("sectors.items")
      .map(function (s) { return "<li>" + esc(s) + "</li>"; })
      .join("");
  }

  function renderServices() {
    $("services").innerHTML = t("services")
      .map(function (s) {
        return (
          '<article class="service card">' +
          '<span class="icon-tile">' + icon(s.icon) + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function tagList(items, extra) {
    return (
      '<ul class="tags' + (extra ? " " + extra : "") + '">' +
      items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
      "</ul>"
    );
  }

  function renderTimeline() {
    $("timeline").innerHTML = C.experience
      .map(function (x) {
        var company = x.url
          ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.company) + icon("external") + "</a>"
          : "<span>" + esc(x.company) + "</span>";
        var note = x.companyNote ? ' <span class="tl-note">· ' + esc(x.companyNote) + "</span>" : "";
        var side = "";
        if (x.period) {
          side +=
            '<span class="tl-period">' +
            (x.current ? '<span class="live-dot" aria-hidden="true"></span>' : icon("calendar")) +
            esc(L(x.period)) + "</span>";
        }
        if (x.meta) side += '<span class="tl-meta">' + icon("pin") + esc(L(x.meta)) + "</span>";

        return (
          '<li class="tl-item' + (x.current ? " is-current" : "") + '">' +
          '<span class="tl-node" aria-hidden="true"></span>' +
          '<article class="tl-card">' +
          '<header class="tl-head">' +
          '<div class="tl-title">' +
          '<h3 class="tl-role">' + esc(L(x.role)) + "</h3>" +
          '<p class="tl-company">' + company + note + "</p>" +
          "</div>" +
          '<div class="tl-side">' + side + "</div>" +
          "</header>" +
          '<ul class="tl-bullets">' +
          L(x.bullets).map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
          "</ul>" +
          tagList(L(x.tags)) +
          "</article>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderProjects() {
    $("projects-grid").innerHTML = C.projects
      .map(function (p) {
        var link = p.url
          ? '<a class="project-link" href="' + esc(p.url) + '" target="_blank" rel="noopener" aria-label="' +
            esc(t("projects.visit") + " " + L(p.name)) + '">' + esc(p.domain) + icon("external") + "</a>"
          : "";
        return (
          '<article class="project card' + (p.wide ? " is-wide" : "") + '">' +
          '<div class="project-art">' + art(p.art) + "</div>" +
          '<div class="project-body">' +
          '<p class="project-kind">' + esc(L(p.kind)) + "</p>" +
          '<h3 class="project-name">' + esc(L(p.name)) + "</h3>" +
          '<p class="project-summary">' + esc(L(p.summary)) + "</p>" +
          '<p class="project-role"><strong>' + esc(t("projects.role")) + ":</strong> " + esc(L(p.role)) + "</p>" +
          '<div class="project-foot">' + tagList(p.stack, "tags-sm") + link + "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderSkills() {
    $("skills-grid").innerHTML = C.skills
      .map(function (g) {
        return (
          '<article class="skill card">' +
          '<header class="skill-head"><span class="icon-tile">' + icon(g.icon) + "</span>" +
          "<h3>" + esc(L(g.title)) + "</h3></header>" +
          tagList(L(g.items), "tags-lg") +
          "</article>"
        );
      })
      .join("");
  }

  function renderEducation() {
    var e = C.education;
    $("education").innerHTML =
      '<span class="icon-tile">' + icon("cap") + "</span>" +
      "<div>" +
      '<p class="edu-degree">' + esc(L(e.degree)) + "</p>" +
      '<p class="edu-school">' + esc(e.school) + "</p>" +
      '<p class="edu-period">' + icon("calendar") + esc(L(e.period)) + "</p>" +
      "</div>";

    $("languages").innerHTML = C.languages
      .map(function (l) {
        return (
          "<li>" + '<span class="lang-name">' + icon("globe") + esc(L(l.name)) + "</span>" +
          '<span class="lang-level">' + esc(L(l.level)) + "</span></li>"
        );
      })
      .join("");
  }

  function renderContact() {
    var P = C.profile;
    var items = [
      { icon: "mail", label: t("contact.email"), value: P.email, href: "mailto:" + P.email, copy: P.email },
      { icon: "phone", label: t("contact.phone"), value: P.phone, href: P.whatsapp, ext: true, copy: P.phone },
      { icon: "linkedin", label: t("contact.linkedin"), value: P.linkedinLabel, href: P.linkedin, ext: true },
      { icon: "github", label: t("contact.github"), value: P.githubLabel, href: P.github, ext: true },
      { icon: "file", label: t("contact.cv"), value: t("contact.cvValue"), href: P.cv, download: true },
    ];
    $("contact-list").innerHTML = items
      .map(function (it) {
        var attrs = it.ext ? ' target="_blank" rel="noopener"' : it.download ? " download" : "";
        var copyBtn = it.copy
          ? '<button class="copy-btn" type="button" data-copy="' + esc(it.copy) + '" aria-label="' +
            esc(t("contact.copy") + " " + it.value) + '">' + icon("copy") +
            '<span class="copy-label">' + esc(t("contact.copy")) + "</span></button>"
          : "";
        return (
          '<li class="contact-row">' +
          '<a class="contact-link" href="' + esc(it.href) + '"' + attrs + ">" +
          '<span class="icon-tile">' + icon(it.icon) + "</span>" +
          '<span class="contact-text"><span class="contact-label">' + esc(it.label) + "</span>" +
          '<span class="contact-value">' + esc(it.value) + "</span></span>" +
          "</a>" + copyBtn +
          "</li>"
        );
      })
      .join("");
  }

  /* ---------- Terminal animada ---------- */
  var termRun = 0;

  function promptHtml() {
    return '<span class="t-path">~/blacksheru</span> <span class="t-prompt">❯</span> ';
  }

  function terminalSequence() {
    var seq = [
      { cmd: "whoami" },
      { out: t("terminal.whoami"), cls: "t-hl" },
      { cmd: "cat focus.txt" },
    ];
    t("terminal.focus").forEach(function (f) { seq.push({ out: "→ " + f }); });
    seq.push({ cmd: "ls platforms/" });
    seq.push({ out: "android  firetv  vegaos  roku  ios  web", cls: "t-list" });
    return seq;
  }

  function lineHtml(item) {
    if (item.cmd) return promptHtml() + '<span class="t-cmd">' + esc(item.cmd) + "</span>\n";
    return '<span class="t-out ' + (item.cls || "") + '">' + esc(item.out) + "</span>\n";
  }

  function renderTerminal(animate) {
    var body = $("terminal-body");
    if (!body) return;
    var seq = terminalSequence();
    var run = ++termRun;
    var end = promptHtml() + '<span class="t-cursor"></span>';

    if (!animate || reduceMotion) {
      body.innerHTML = seq.map(lineHtml).join("") + end;
      return;
    }

    body.innerHTML = "";
    var i = 0;

    function next() {
      if (run !== termRun) return;
      if (i >= seq.length) {
        body.insertAdjacentHTML("beforeend", end);
        return;
      }
      var item = seq[i++];
      if (!item.cmd) {
        body.insertAdjacentHTML("beforeend", lineHtml(item));
        setTimeout(next, 140);
        return;
      }
      body.insertAdjacentHTML("beforeend", promptHtml());
      var cmd = document.createElement("span");
      cmd.className = "t-cmd";
      var cur = document.createElement("span");
      cur.className = "t-cursor";
      body.appendChild(cmd);
      body.appendChild(cur);
      var k = 0;
      (function type() {
        if (run !== termRun) return;
        if (k < item.cmd.length) {
          cmd.textContent += item.cmd.charAt(k++);
          setTimeout(type, 45 + Math.random() * 60);
        } else {
          cur.parentNode.removeChild(cur);
          body.appendChild(document.createTextNode("\n"));
          setTimeout(next, 260);
        }
      })();
    }
    setTimeout(next, 450);
  }

  function renderAll(animateTerminal) {
    renderStatic();
    renderStats();
    renderSectors();
    renderServices();
    renderTimeline();
    renderProjects();
    renderSkills();
    renderEducation();
    renderContact();
    renderTerminal(animateTerminal);
  }

  /* ---------- Interacciones ---------- */
  function currentTheme() {
    var a = root.getAttribute("data-theme");
    if (a === "light" || a === "dark") return a;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setupTheme() {
    var btn = $("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("theme", next);
    });
  }

  function setupLang() {
    var btn = $("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      lang = lang === "es" ? "en" : "es";
      store.set("lang", lang);
      renderAll(false);
    });
  }

  function setupMenu() {
    var header = $("site-header");
    var btn = $("menu-toggle");
    var links = $("nav-links");
    if (!header || !btn || !links) return;

    function close() {
      header.classList.remove("menu-open");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", function (e) {
      if (header.classList.contains("menu-open") && !header.contains(e.target)) close();
    });
  }

  function setupHeaderScroll() {
    var header = $("site-header");
    if (!header) return;
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

  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (e) { io.observe(e); });
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
      }, function () { /* sin portapapeles: el enlace sigue disponible */ });
    });
  }

  /* ---------- Inicio ---------- */
  renderAll(true);
  setupTheme();
  setupLang();
  setupMenu();
  setupHeaderScroll();
  setupActiveNav();
  setupReveal();
  setupCopy();

  var y = $("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
