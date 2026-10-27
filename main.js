document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const body = document.body;
  const themeToggle = byId("themeToggle");
  const designToggle = byId("designToggle");
  const designLabelFull = document.querySelector(".design-label-full");
  const designLabelShort = document.querySelector(".design-label-short");
  const menuToggle = byId("menuToggle");
  const sidebar = byId("sidebar");
  const menuOverlay = byId("menuOverlay");
  const shareButton = byId("shareButton");
  const sharePopup = byId("sharePopup");
  const shareOverlay = byId("shareOverlay");
  const shareLinkInput = byId("shareLink");
  const qrImage = byId("qrImage");
  const toast = byId("toast");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const visitorBox = byId("visitorBox");
  const visitorCount = byId("visitorCount");
  const designOrder = ["glass", "skeuo", "neo", "clay"];
  const designNames = {
    glass: { full: "Liquid Glass", short: "Glass" },
    skeuo: { full: "Skeuomorphism", short: "Skeuo" },
    neo: { full: "Neumorphism", short: "Neo" },
    clay: { full: "Claymorphism", short: "Clay" }
  };
  const themeColors = {
    clay: { light: "#f7f2ec", dark: "#121015" },
    glass: { light: "#e7f1f6", dark: "#101d27" },
    skeuo: { light: "#e3e7eb", dark: "#1d2630" },
    neo: { light: "#e2e5ec", dark: "#1a2028" }
  };
  let toastTimer;
  let menuReturnFocus = null;
  let shareReturnFocus = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function setTheme(theme) {
    const selectedTheme = theme === "dark" ? "dark" : "light";
    body.dataset.theme = selectedTheme;
    if (themeColorMeta) themeColorMeta.content = (themeColors[body.dataset.design] || themeColors.clay)[selectedTheme];
    const use = themeToggle && themeToggle.querySelector("use");
    if (use) use.setAttribute("href", selectedTheme === "dark" ? "#i-sun" : "#i-moon");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", selectedTheme === "dark" ? "লাইট থিম চালু করুন" : "ডার্ক থিম চালু করুন");
      themeToggle.setAttribute("aria-pressed", String(selectedTheme === "dark"));
    }
    try { localStorage.setItem("social-theme", selectedTheme); } catch (error) { /* Storage may be disabled. */ }
  }
  function setDesign(design) {
    const selectedDesign = Object.prototype.hasOwnProperty.call(designNames, design) ? design : "clay";
    body.dataset.design = selectedDesign;
    const selectedName = designNames[selectedDesign];
    const nextName = designNames[designOrder[(designOrder.indexOf(selectedDesign) + 1) % designOrder.length]].full;
    if (designLabelFull) designLabelFull.textContent = selectedName.full;
    if (designLabelShort) designLabelShort.textContent = selectedName.short;
    if (designToggle) {
      designToggle.setAttribute("aria-label", `ডিজাইন: ${selectedName.full}; পরেরটি ${nextName}`);
      designToggle.title = `${selectedName.full} → ${nextName}`;
    }
    if (themeColorMeta) themeColorMeta.content = (themeColors[selectedDesign] || themeColors.clay)[body.dataset.theme === "dark" ? "dark" : "light"];
    try { localStorage.setItem("social-design", selectedDesign); } catch (error) { /* Storage may be disabled. */ }
  }
  try {
    setTheme(localStorage.getItem("social-theme") || body.dataset.theme || "light");
    setDesign(localStorage.getItem("social-design") || body.dataset.design || "clay");
  } catch (error) {
    setTheme(body.dataset.theme || "light");
    setDesign(body.dataset.design || "clay");
  }

  let themeTransitioning = false;
  async function applyWithRipple(button, event, update) {
    if (!button || themeTransitioning) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof document.startViewTransition !== "function") { update(); return; }

    const rect = button.getBoundingClientRect();
    const savedPoint = button.__themePointer && performance.now() - button.__themePointer.time < 1000 ? button.__themePointer : null;
    const rawX = savedPoint ? savedPoint.x : (event.clientX || rect.left + rect.width / 2);
    const rawY = savedPoint ? savedPoint.y : (event.clientY || rect.top + rect.height / 2);
    const x = Math.max(0, Math.min(window.innerWidth, rawX));
    const y = Math.max(0, Math.min(window.innerHeight, rawY));
    button.__themePointer = null;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.ceil(Math.max(
      Math.hypot(x, y), Math.hypot(width - x, y),
      Math.hypot(x, height - y), Math.hypot(width - x, height - y)
    ) + 8);
    let applied = false;
    const applyOnce = () => { if (!applied) { update(); applied = true; } };
    let transition;
    let reveal;
    themeTransitioning = true;
    button.disabled = true;
    document.documentElement.classList.add("theme-ripple-active");
    try {
      transition = document.startViewTransition(applyOnce);
      await transition.ready;
      reveal = document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 720, easing: "cubic-bezier(.16,1,.3,1)", fill: "both", pseudoElement: "::view-transition-new(root)" }
      );
      await reveal.finished;
      await transition.finished;
    } catch (error) {
      if (reveal) reveal.cancel();
      applyOnce();
      if (transition) { try { await transition.finished; } catch (ignored) { /* Keep the selected appearance. */ } }
    } finally {
      document.documentElement.classList.remove("theme-ripple-active");
      themeTransitioning = false;
      button.disabled = false;
    }
  }
  [themeToggle, designToggle].forEach((button) => button?.addEventListener("pointerdown", (event) => {
    button.__themePointer = { x: event.clientX, y: event.clientY, time: performance.now() };
  }));
  themeToggle?.addEventListener("click", (event) => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    applyWithRipple(themeToggle, event, () => setTheme(nextTheme));
  });
  designToggle?.addEventListener("click", (event) => {
    const currentIndex = designOrder.indexOf(body.dataset.design);
    const nextDesign = designOrder[(currentIndex + 1) % designOrder.length];
    applyWithRipple(designToggle, event, () => setDesign(nextDesign));
  });

  document.querySelectorAll(".media-protected").forEach((media) => {
    media.draggable = false;
    media.addEventListener("dragstart", (event) => event.preventDefault());
  });
  document.addEventListener("contextmenu", (event) => {
    if (event.target instanceof Element && event.target.closest(".media-protected")) event.preventDefault();
  }, true);

  const scrollProgress = byId("scrollProgress");
  let progressFrame = 0;
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const amount = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    scrollProgress.style.transform = `scaleX(${amount})`;
  }
  function scheduleScrollProgress() {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      progressFrame = 0;
      updateScrollProgress();
    });
  }
  window.addEventListener("scroll", scheduleScrollProgress, { passive: true });
  window.addEventListener("resize", scheduleScrollProgress, { passive: true });
  updateScrollProgress();

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    const revealItems = [...document.querySelectorAll("[data-reveal]")];
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    revealItems.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      revealObserver.observe(element);
    });
    document.documentElement.classList.add("motion-ready");
  }

  function focusableWithin(container) {
    if (!container) return [];
    return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hasAttribute("hidden") && element.getClientRects().length > 0);
  }
  function openMenu() {
    if (!sidebar || !menuOverlay) return;
    menuReturnFocus = document.activeElement;
    sidebar.inert = false;
    sidebar.classList.add("active");
    menuOverlay.classList.add("active");
    sidebar.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
    byId("closeMenu")?.focus();
  }
  function closeMenu(restoreFocus = true) {
    if (sidebar) {
      sidebar.classList.remove("active");
      sidebar.setAttribute("aria-hidden", "true");
      sidebar.inert = true;
    }
    menuOverlay?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (restoreFocus && menuReturnFocus instanceof HTMLElement) menuReturnFocus.focus();
    menuReturnFocus = null;
  }
  menuToggle?.addEventListener("click", openMenu);
  byId("closeMenu")?.addEventListener("click", () => closeMenu());
  menuOverlay?.addEventListener("click", () => closeMenu());
  document.querySelectorAll(".menu-item[href^='#']").forEach((link) => link.addEventListener("click", () => closeMenu(false)));

  function openShare() {
    if (!sharePopup || !shareOverlay) return;
    shareReturnFocus = document.activeElement;
    if (shareLinkInput) shareLinkInput.value = window.location.href;
    if (qrImage && shareLinkInput) qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLinkInput.value)}`;
    sharePopup.inert = false;
    sharePopup.classList.add("active");
    sharePopup.setAttribute("aria-hidden", "false");
    shareOverlay.classList.add("active");
    closeMenu(false);
    byId("closeSharePopup")?.focus();
  }
  function closeShare(restoreFocus = true) {
    if (sharePopup) {
      sharePopup.classList.remove("active");
      sharePopup.setAttribute("aria-hidden", "true");
      sharePopup.inert = true;
    }
    shareOverlay?.classList.remove("active");
    if (restoreFocus && shareReturnFocus instanceof HTMLElement) shareReturnFocus.focus();
    shareReturnFocus = null;
  }
  shareButton?.addEventListener("click", openShare);
  byId("closeSharePopup")?.addEventListener("click", () => closeShare());
  shareOverlay?.addEventListener("click", () => closeShare());

  async function copyShareLink() {
    if (!shareLinkInput) return;
    try {
      await navigator.clipboard.writeText(shareLinkInput.value);
      showToast("লিংক কপি হয়েছে");
    } catch (error) {
      shareLinkInput.focus();
      shareLinkInput.select();
      shareLinkInput.setSelectionRange(0, shareLinkInput.value.length);
      const copied = document.execCommand("copy");
      showToast(copied ? "লিংক কপি হয়েছে" : "লিংকটি নির্বাচন করে কপি করুন");
    }
  }
  [byId("copyShareBtn"), byId("copyShareText")].forEach((button) => button?.addEventListener("click", copyShareLink));

  document.addEventListener("keydown", (event) => {
    const activeLayer = sharePopup?.classList.contains("active") ? sharePopup : (sidebar?.classList.contains("active") ? sidebar : null);
    if (event.key === "Escape") {
      if (sharePopup?.classList.contains("active")) closeShare();
      else if (sidebar?.classList.contains("active")) closeMenu();
      return;
    }
    if (event.key !== "Tab" || !activeLayer) return;
    const items = focusableWithin(activeLayer);
    if (!items.length) { event.preventDefault(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !activeLayer.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !activeLayer.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  });

  const COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/hit/spearhasan_social_visits";
  const GET_COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/get/spearhasan_social_visits";
  const storageGet = (key) => { try { return localStorage.getItem(key); } catch (error) { return null; } };
  const storageSet = (key, value) => { try { localStorage.setItem(key, value); } catch (error) { /* Keep page usable if storage is blocked. */ } };
  function renderVisitorCount(value) {
    const count = Number(value);
    if (visitorCount && Number.isFinite(count)) visitorCount.textContent = Math.max(0, Math.floor(count)).toLocaleString("en-US");
  }
  async function fetchVisitorCount(increment = false) {
    if (!visitorCount) return;
    const saved = storageGet("visitorCount");
    if (saved) renderVisitorCount(saved);
    try {
      const response = await fetch(increment ? COUNTER_API_URL : GET_COUNTER_API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("Visitor counter unavailable");
      const data = await response.json();
      if (Number.isFinite(Number(data.value))) {
        renderVisitorCount(data.value);
        storageSet("visitorCount", String(data.value));
      }
    } catch (error) { if (!saved) renderVisitorCount(0); }
  }
  if (visitorBox) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const newVisit = storageGet("lastVisitDate") !== today;
    if (newVisit) storageSet("lastVisitDate", today);
    fetchVisitorCount(newVisit);
  }
});
