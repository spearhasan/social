document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const byId = (id) => document.getElementById(id);

  const body = document.body;
  const themeToggle = byId("themeToggle");
  const menuToggle = byId("menuToggle");
  const sidebar = byId("sidebar");
  const menuOverlay = byId("menuOverlay");
  const closeMenu = byId("closeMenu");
  const sharePopup = byId("sharePopup");
  const shareOverlay = byId("shareOverlay");
  const shareLinkInput = byId("shareLink");
  const qrImage = byId("qrImage");
  const toast = byId("toast");
  const visitorBox = byId("visitorBox");
  const visitorCount = byId("visitorCount");
  let toastTimer;

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
    const use = themeToggle && themeToggle.querySelector("use");
    if (use) use.setAttribute("href", selectedTheme === "dark" ? "#i-sun" : "#i-moon");
    if (themeToggle) themeToggle.setAttribute("aria-label", selectedTheme === "dark" ? "লাইট থিম চালু করুন" : "ডার্ক থিম চালু করুন");
    try { localStorage.setItem("social-theme", selectedTheme); } catch (error) { /* Storage may be unavailable in private contexts. */ }
  }

  try {
    setTheme(localStorage.getItem("social-theme") || body.dataset.theme || "light");
  } catch (error) {
    setTheme(body.dataset.theme || "light");
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => setTheme(body.dataset.theme === "dark" ? "light" : "dark"));
  }

  function openMenu() {
    if (!sidebar || !menuOverlay) return;
    sidebar.classList.add("active");
    menuOverlay.classList.add("active");
    sidebar.setAttribute("aria-hidden", "false");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenuFn() {
    if (sidebar) {
      sidebar.classList.remove("active");
      sidebar.setAttribute("aria-hidden", "true");
    }
    if (menuOverlay) menuOverlay.classList.remove("active");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuFn);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenuFn);

  function openShare() {
    if (shareLinkInput) shareLinkInput.value = window.location.href;
    if (qrImage && shareLinkInput) {
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLinkInput.value)}`;
    }
    if (sharePopup) {
      sharePopup.classList.add("active");
      sharePopup.setAttribute("aria-hidden", "false");
    }
    if (shareOverlay) shareOverlay.classList.add("active");
    closeMenuFn();
  }
  function closeShare() {
    if (sharePopup) {
      sharePopup.classList.remove("active");
      sharePopup.setAttribute("aria-hidden", "true");
    }
    if (shareOverlay) shareOverlay.classList.remove("active");
  }
  document.querySelectorAll(".shareBtn, #shareButton, #quickShare").forEach((button) => button.addEventListener("click", openShare));
  [byId("closeSharePopup"), shareOverlay].forEach((element) => {
    if (element) element.addEventListener("click", closeShare);
  });

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
  [byId("copyShareBtn"), byId("copyShareText")].forEach((button) => {
    if (button) button.addEventListener("click", copyShareLink);
  });

  document.querySelectorAll(".menu-item[data-target]").forEach((item) => {
    item.addEventListener("click", () => {
      const target = byId(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      closeMenuFn();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenuFn();
      closeShare();
    }
  });

  const COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/hit/spearhasan_social_visits";
  const GET_COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/get/spearhasan_social_visits";
  const storageGet = (key) => { try { return localStorage.getItem(key); } catch (error) { return null; } };
  const storageSet = (key, value) => { try { localStorage.setItem(key, value); } catch (error) { /* Keep the page usable when storage is blocked. */ } };

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
      if (!response.ok) throw new Error("Counter unavailable");
      const data = await response.json();
      if (Number.isFinite(Number(data.value))) {
        renderVisitorCount(data.value);
        storageSet("visitorCount", String(data.value));
      }
    } catch (error) {
      if (!saved) renderVisitorCount(0);
    }
  }

  if (visitorBox) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const newVisit = storageGet("lastVisitDate") !== today;
    if (newVisit) storageSet("lastVisitDate", today);
    fetchVisitorCount(newVisit);
    visitorBox.addEventListener("click", () => fetchVisitorCount(false));
  }
});
