document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const body = document.body;
  const themeToggle = byId("themeToggle");
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
    if (themeColorMeta) themeColorMeta.content = selectedTheme === "dark" ? "#09090b" : "#fafafa";
    const use = themeToggle && themeToggle.querySelector("use");
    if (use) use.setAttribute("href", selectedTheme === "dark" ? "#i-sun" : "#i-moon");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", selectedTheme === "dark" ? "লাইট থিম চালু করুন" : "ডার্ক থিম চালু করুন");
      themeToggle.setAttribute("aria-pressed", String(selectedTheme === "dark"));
    }
    try { localStorage.setItem("social-theme", selectedTheme); } catch (error) { /* Storage may be disabled. */ }
  }
  try { setTheme(localStorage.getItem("social-theme") || body.dataset.theme || "light"); }
  catch (error) { setTheme(body.dataset.theme || "light"); }
  if (themeToggle) themeToggle.addEventListener("click", () => setTheme(body.dataset.theme === "dark" ? "light" : "dark"));

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
