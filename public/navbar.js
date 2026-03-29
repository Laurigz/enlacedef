/**
 * Enlace — Shared Shifting Dropdown Navbar
 * Vanilla JS port of https://21st.dev/community/components/Abuhuraira/shifting-dropdown/default
 * Detects current page to highlight the active nav link.
 */

(function () {
  /* ------------------------------------------------------------------ */
  /*  NAV DATA                                                            */
  /* ------------------------------------------------------------------ */
  const page = window.location.pathname.split("/").pop() || "index.html";

  // Using a fully white logo effect for the dark navbar
  const LOGO_SVG = `<img class="h-12 w-auto object-contain" style="height: 3rem; filter: brightness(0) invert(1);" src="/logo-enlace.png" alt="Enlace Agencia Digital Logo" />`;

  // Dropdown tab configs
  const DROPDOWN_TABS = {
    servicios: {
      id: "servicios",
      label: "Servicios",
      content: `
        <div class="sdd-dropdown-inner" id="sdd-content-servicios">
          <div class="flex gap-6">
            <div>
              <h3 class="sdd-section-label">Identidad</h3>
              <a href="servicio-branding.html" class="sdd-link">Branding</a>
              <a href="servicio-branding.html" class="sdd-link">Diseño Visual</a>
            </div>
            <div>
              <h3 class="sdd-section-label">Web &amp; AI</h3>
              <a href="servicio-web.html" class="sdd-link">Páginas Web</a>
              <a href="servicio-ia.html" class="sdd-link">Inteligencia Artificial</a>
            </div>
            <div>
              <h3 class="sdd-section-label">Crecimiento</h3>
              <a href="servicio-posicionamiento.html" class="sdd-link">Posicionamiento SEO</a>
              <a href="servicio-posicionamiento.html" class="sdd-link">Estrategia Digital</a>
            </div>
          </div>
          <a href="contacto.html" class="sdd-view-more">
            <span>Ver auditoría gratis</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>`
    },
    blog: {
      id: "blog",
      label: "Blog",
      content: `
        <div class="sdd-dropdown-inner" id="sdd-content-blog">
          <div class="grid grid-cols-2 gap-3 mb-4">
            <a href="blog.html" class="sdd-blog-card group">
              <img class="sdd-blog-img" src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop" alt="Estrategia digital"/>
              <h4 class="sdd-blog-title">El Futuro de la Estrategia Digital 2024</h4>
              <p class="sdd-blog-desc">IA generativa y análisis predictivo para tu negocio.</p>
            </a>
            <a href="blog.html" class="sdd-blog-card group">
              <img class="sdd-blog-img" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop" alt="Diseño UI/UX"/>
              <h4 class="sdd-blog-title">Principios de Accesibilidad en UI Modernas</h4>
              <p class="sdd-blog-desc">Guía práctica para implementar WCAG 2.1.</p>
            </a>
          </div>
          <a href="blog.html" class="sdd-view-more">
            <span>Ver todos los artículos</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>`
    }
  };

  // Plain link tabs (no dropdown)
  const PLAIN_LINKS = [
    { href: "index.html#servicios", label: "Servicios", match: [] },
    { href: "portfolio.html", label: "Portafolio", match: ["portfolio.html"] },
    { href: "index.html#precios", label: "Precios", match: [] },
    { href: "nosotros.html", label: "Nosotros", match: ["nosotros.html"] },
    { href: "blog.html", label: "Blog", match: ["blog.html"] },
    { href: "contacto.html", label: "Contacto", match: ["contacto.html"] },
  ];

  /* ------------------------------------------------------------------ */
  /*  STYLES — injected once                                             */
  /* ------------------------------------------------------------------ */
  const style = document.createElement("style");
  style.textContent = `
    /* === Shifting Dropdown Nav === */
    #enlace-nav-wrap {
      position: sticky; top: 0; z-index: 9999;
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid #27272a;
    }
    #enlace-nav {
      max-width: 1280px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 1rem; height: 64px;
      font-family: 'Inter', sans-serif;
    }
    .sdd-logo { display:flex; align-items:center; gap:8px; text-decoration:none; transition: opacity 0.15s; }
    .sdd-logo:hover { opacity: 0.9; }

    /* Desktop nav group */
    .sdd-tabs-wrap {
      position: relative;
      display: flex; align-items: center; gap: 4px;
    }
    .sdd-tab {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 16px; border-radius: 9999px;
      font-size: 0.875rem; font-weight: 500;
      color: #d4d4d8; background: transparent; border: none;
      cursor: pointer; transition: background 0.15s, color 0.15s;
      white-space: nowrap;
      font-family: 'Inter', sans-serif; text-decoration: none;
    }
    .sdd-tab:hover, .sdd-tab.sdd-active-tab {
      background: rgba(255, 255, 255, 0.1); color: #fafafa;
    }
    .sdd-tab.sdd-page-active { color: #ffffff; font-weight: 600; }
    .sdd-chevron {
      width: 16px; height: 16px; flex-shrink: 0;
      transition: transform 0.2s ease;
      color: inherit;
    }
    .sdd-tab.sdd-active-tab .sdd-chevron { transform: rotate(180deg); }

    /* Dropdown panel */
    .sdd-panel-wrap {
      position: absolute;
      left: 0; top: calc(100% + 16px);
      min-width: 256px;
      pointer-events: none;
    }
    .sdd-panel {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
      /* fade+slide transitions */
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.18s ease, transform 0.18s ease;
    }
    .sdd-panel.sdd-visible { opacity: 1; transform: translateY(0); pointer-events: all; }

    /* Animated nub (hidden for cleaner react-like look) */
    .sdd-nub { display: none; }

    /* Bridge — prevents mouseLeave flicker between tab and panel */
    .sdd-bridge {
      position: absolute;
      top: 100%; left: 0; right: 0;
      height: 24px;
    }

    /* Inner content slide */
    .sdd-dropdown-inner {
      animation: sdd-slide-in 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    @keyframes sdd-slide-in {
      from { opacity: 0; transform: translateX(var(--sdd-slide-from, 0px)); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* Section label */
    .sdd-section-label {
      font-size: 10px; font-weight: 700; color: #a1a1aa;
      text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;
    }
    /* Links inside dropdown */
    .sdd-link {
      display: block; font-size: 0.875rem; font-weight: 500; color: #d4d4d8;
      text-decoration: none; padding: 4px 0;
      transition: color 0.15s;
    }
    .sdd-link:hover { color: #fafafa; }

    /* "View more" CTA */
    .sdd-view-more {
      display: flex; align-items: center; gap: 4px;
      margin-top: 16px; padding-top: 16px; border-top: 1px solid #27272a; 
      font-size: 0.75rem; font-weight: 700;
      color: #fafafa; text-decoration: none;
    }
    .sdd-view-more:hover svg { transform: translateX(4px); }
    .sdd-view-more svg { transition: transform 0.15s; }

    /* Blog cards */
    .sdd-blog-card { display: block; text-decoration: none; }
    .sdd-blog-img { width:100%; height: 60px; object-fit: cover; border-radius: 8px; margin-bottom: 6px; }
    .sdd-blog-title { font-size: 0.875rem; font-weight: 500; color: #d4d4d8; line-height: 1.3; margin: 0 0 4px 0; transition: color 0.15s; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #3f3f46; }
    .sdd-blog-card:hover .sdd-blog-title { color: #fafafa; }
    .sdd-blog-desc { font-size: 0.75rem; color: #a1a1aa; line-height: 1.4; margin: 0; }

    /* CTA button */
    .sdd-cta {
      display: flex; align-items: center; justify-content: center;
      padding: 10px 24px; border-radius: 9999px;
      background: #fafafa; color: #09090b; font-size: 0.875rem; font-weight: 700;
      text-decoration: none; white-space: nowrap; flex-shrink: 0;
      transition: all 0.15s;
    }
    .sdd-cta:hover { background: #e4e4e7; box-shadow: 0 10px 15px -3px rgba(255,255,255,0.1); transform: scale(1.02); }

    /* Hamburger */
    #sdd-mobile-btn {
      display: none; padding: 8px; border-radius: 6px;
      background: none; border: none; cursor: pointer;
      color: #d4d4d8; transition: background 0.15s;
    }
    #sdd-mobile-btn:hover { background: rgba(255, 255, 255, 0.1); }

    /* Mobile menu panel */
    #sdd-mobile-menu {
      display: none; flex-direction: column; gap: 8px;
      padding: 16px;
      background: #09090b;
      border-bottom: 1px solid #27272a;
      position: sticky; top: 64px; z-index: 9998;
    }
    #sdd-mobile-menu a, #sdd-mobile-menu button.sdd-mobile-tab {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; border-radius: 8px; font-size: 1rem; font-weight: 500;
      color: #d4d4d8; text-decoration: none; background: none; border: none;
      cursor: pointer; font-family: 'Inter', sans-serif; width: 100%;
      transition: background 0.15s;
    }
    #sdd-mobile-menu a:hover, #sdd-mobile-menu button.sdd-mobile-tab:hover { background: rgba(255, 255, 255, 0.1); color: #fafafa; }
    #sdd-mobile-menu a.sdd-page-active { font-weight: 700; color: #ffffff; }
    
    .sdd-mobile-sub {
      display: none; flex-direction: column; gap: 4px;
      padding: 4px 16px 4px 24px;
      border-left: 2px solid #3f3f46; margin: 0 16px 8px;
    }
    .sdd-mobile-sub.open { display: flex; }
    .sdd-mobile-sub a { padding: 8px; font-size: 0.875rem; border-radius: 6px; color: #a1a1aa; }
    .sdd-mobile-sub a:hover { color: #fafafa; }
    
    .sdd-mobile-cta {
      margin-top: 8px; padding: 16px; border-radius: 12px !important;
      background: #fafafa !important; color: #09090b !important; font-weight: 700 !important;
      text-align: center; justify-content: center !important; font-size: 1rem !important;
    }

    @media (max-width: 768px) {
      .sdd-tabs-wrap, .sdd-cta { display: none !important; }
      #sdd-mobile-btn { display: flex; }
    }
    @media (min-width: 769px) {
      #sdd-mobile-menu { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  /* ------------------------------------------------------------------ */
  /*  HTML TEMPLATE                                                       */
  /* ------------------------------------------------------------------ */
  function buildNav() {
    const activePortfolio = page === "portfolio.html" ? " sdd-page-active" : "";
    const activeNosotros = page === "nosotros.html" ? " sdd-page-active" : "";
    const activeBlog = page === "blog.html" ? " sdd-page-active" : "";
    const activeIndex = (page === "index.html" || page === "") ? " sdd-page-active" : "";
    const activeContacto = page === "contacto.html" ? " sdd-page-active" : "";

    return `
    <div id="enlace-nav-wrap">
      <nav id="enlace-nav">
        <!-- Logo -->
        <a href="index.html" class="sdd-logo">
          ${LOGO_SVG}
        </a>

        <!-- Desktop tabs -->
        <div class="sdd-tabs-wrap" id="sdd-tabs-wrap">

          <!-- BRIDGE: prevents mouseLeave between tabs row and the panel -->
          <div class="sdd-bridge"></div>

          <!-- Shifting Nub -->
          <div class="sdd-nub" id="sdd-nub"></div>

          <!-- Dropdown Tabs -->
          <button class="sdd-tab" data-dropdown="servicios" id="sdd-tab-servicios">
            Servicios
            <svg class="sdd-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <!-- Plain links -->
          <a class="sdd-tab${activePortfolio}" href="portfolio.html">Portafolio</a>
          <a class="sdd-tab${activeIndex && page !== 'index.html' ? '' : ''}" href="index.html#precios">Precios</a>
          <a class="sdd-tab${activeNosotros}" href="nosotros.html">Nosotros</a>

          <!-- Blog dropdown tab -->
          <button class="sdd-tab${activeBlog}" data-dropdown="blog" id="sdd-tab-blog">
            Blog
            <svg class="sdd-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <a class="sdd-tab${activeContacto}" href="contacto.html">Contacto</a>

          <!-- Dropdown panel -->
          <div class="sdd-panel-wrap" id="sdd-panel-wrap">
            <div class="sdd-panel" id="sdd-panel">
              <div id="sdd-panel-content"></div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <a href="contacto.html" class="sdd-cta">Hablemos por WhatsApp</a>

        <!-- Hamburger -->
        <button id="sdd-mobile-btn" aria-label="Abrir menú">
          <svg id="sdd-menu-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div id="sdd-mobile-menu">
        <button class="sdd-mobile-tab" data-mobile-sub="servicios-sub">
          <span>Servicios</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="sdd-mobile-sub" id="servicios-sub">
          <a href="index.html#servicios">Branding</a>
          <a href="index.html#servicios">Páginas Web</a>
          <a href="index.html#servicios">Inteligencia Artificial</a>
          <a href="index.html#servicios">Posicionamiento SEO</a>
        </div>
        <a href="portfolio.html" class="${activePortfolio ? 'sdd-page-active' : ''}">Portafolio</a>
        <a href="index.html#precios">Precios</a>
        <a href="nosotros.html" class="${activeNosotros ? 'sdd-page-active' : ''}">Nosotros</a>
        <button class="sdd-mobile-tab" data-mobile-sub="blog-sub">
          <span>Blog</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="sdd-mobile-sub" id="blog-sub">
          <a href="blog.html">Último artículo</a>
          <a href="blog.html">Ver todos</a>
        </div>
        <a href="contacto.html" class="${activeContacto ? 'sdd-page-active' : ''}">Contacto</a>
        <a href="contacto.html" class="sdd-mobile-cta">Hablemos por WhatsApp</a>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ */
  /*  INJECT NAV                                                          */
  /* ------------------------------------------------------------------ */
  const target = document.getElementById("site-nav");
  if (target) {
    target.outerHTML = buildNav();
  } else {
    // If no placeholder exists, prepend to body
    document.body.insertAdjacentHTML("afterbegin", buildNav());
  }

  /* ------------------------------------------------------------------ */
  /*  DROPDOWN LOGIC                                                      */
  /* ------------------------------------------------------------------ */
  let currentDropdown = null;
  let prevDropdown = null;
  let closeTimer = null;

  const panel = document.getElementById("sdd-panel");
  const panelWrap = document.getElementById("sdd-panel-wrap");
  const panelContent = document.getElementById("sdd-panel-content");
  const nub = document.getElementById("sdd-nub");
  const tabsWrap = document.getElementById("sdd-tabs-wrap");
  const tabs = document.querySelectorAll("[data-dropdown]");

  function getTabLeft(tabEl) {
    const tabRect = tabEl.getBoundingClientRect();
    const wrapRect = tabsWrap.getBoundingClientRect();
    return tabRect.left - wrapRect.left + tabRect.width / 2;
  }

  function openDropdown(id, tabEl) {
    clearTimeout(closeTimer);

    const isNew = id !== currentDropdown;
    const slideFrom = prevDropdown && prevDropdown !== id
      ? (getDdIndex(prevDropdown) > getDdIndex(id) ? "60px" : "-60px")
      : "0px";

    currentDropdown = id;
    prevDropdown = id;

    // Highlight tab
    tabs.forEach(t => t.classList.remove("sdd-active-tab"));
    tabEl.classList.add("sdd-active-tab");

    // Animate nub
    nub.style.left = getTabLeft(tabEl) + "px";
    nub.classList.add("sdd-visible");

    // Content
    const cfg = DROPDOWN_TABS[id];
    panelContent.innerHTML = cfg.content;

    // Slide direction CSS var
    const inner = panelContent.querySelector(".sdd-dropdown-inner");
    if (inner) inner.style.setProperty("--sdd-slide-from", isNew ? slideFrom : "0px");

    // Position panel under tab
    const tabRect = tabEl.getBoundingClientRect();
    const wrapRect = tabsWrap.getBoundingClientRect();
    panelWrap.style.left = Math.max(0, tabRect.left - wrapRect.left - 24) + "px";

    // Show
    panel.classList.add("sdd-visible");
  }

  function closeDropdown() {
    closeTimer = setTimeout(() => {
      panel.classList.remove("sdd-visible");
      nub.classList.remove("sdd-visible");
      tabs.forEach(t => t.classList.remove("sdd-active-tab"));
      currentDropdown = null;
    }, 100);
  }

  function getDdIndex(id) {
    return Object.keys(DROPDOWN_TABS).indexOf(id);
  }

  // Tab events
  tabs.forEach(tab => {
    const ddId = tab.dataset.dropdown;
    tab.addEventListener("mouseenter", () => openDropdown(ddId, tab));
    tab.addEventListener("click", () => {
      if (ddId === 'servicios') window.location.href = 'index.html#servicios';
      else if (ddId === 'blog') window.location.href = 'blog.html';
      else {
        if (currentDropdown === ddId) closeDropdown();
        else openDropdown(ddId, tab);
      }
    });
  });

  // Keep panel open when hovering over it
  panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  panel.addEventListener("mouseleave", closeDropdown);

  // Close when leaving tabs row (bridge catches the gap)
  tabsWrap.addEventListener("mouseleave", closeDropdown);

  /* ------------------------------------------------------------------ */
  /*  MOBILE MENU                                                         */
  /* ------------------------------------------------------------------ */
  const mobileBtn = document.getElementById("sdd-mobile-btn");
  const mobileMenu = document.getElementById("sdd-mobile-menu");
  const menuIcon = document.getElementById("sdd-menu-icon");

  const OPEN_ICON = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;
  const CLOSE_ICON = `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`;

  let mobileOpen = false;
  mobileBtn?.addEventListener("click", () => {
    mobileOpen = !mobileOpen;
    mobileMenu.style.display = mobileOpen ? "flex" : "none";
    menuIcon.innerHTML = mobileOpen ? OPEN_ICON : CLOSE_ICON;
  });

  // Mobile sub-menus
  document.querySelectorAll("[data-mobile-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      const subId = btn.dataset.mobileSub;
      const sub = document.getElementById(subId);
      if (sub) sub.classList.toggle("open");
    });
  });

})();


