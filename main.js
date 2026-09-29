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
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const visitorBox = byId("visitorBox");
  const visitorCount = byId("visitorCount");
  let toastTimer;
  let themeTransitioning = false;

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
    if (themeColorMeta) themeColorMeta.content = selectedTheme === "dark" ? "#101421" : "#f4f7fc";
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
    let lastPointer = null;
    themeToggle.addEventListener("pointerdown", (event) => {
      lastPointer = { x: event.clientX, y: event.clientY, time: performance.now() };
    });
    themeToggle.addEventListener("click", async (event) => {
      if (themeTransitioning) return;
      const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion || typeof document.startViewTransition !== "function") {
        setTheme(nextTheme);
        return;
      }

      const rect = themeToggle.getBoundingClientRect();
      const pointer = lastPointer && performance.now() - lastPointer.time < 1000 ? lastPointer : null;
      const x = pointer ? pointer.x : (event.clientX || rect.left + rect.width / 2);
      const y = pointer ? pointer.y : (event.clientY || rect.top + rect.height / 2);
      lastPointer = null;

      // Add a generous margin so Chrome's anti-aliased clip edge cannot leave
      // uncovered pixels at a corner or along the scrollbar/viewport edge.
      const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);
      const radius = Math.ceil(viewportDiagonal * 1.25 + 8);
      let transition;
      let reveal;
      themeTransitioning = true;
      themeToggle.disabled = true;
      document.documentElement.classList.add("theme-ripple-active");

      try {
        transition = document.startViewTransition(() => setTheme(nextTheme));
        await transition.ready;
        reveal = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 700,
            easing: "cubic-bezier(.2,.75,.25,1)",
            fill: "both",
            pseudoElement: "::view-transition-new(root)"
          }
        );
        await reveal.finished;
        // Keep the final frame painted until the browser has committed the
        // view transition, preventing a one-frame snap at the end in Chrome.
        await transition.finished;
      } catch (error) {
        if (reveal) reveal.cancel();
        if (body.dataset.theme !== nextTheme) setTheme(nextTheme);
        if (transition) {
          try { await transition.finished; } catch (ignored) { /* Continue with the selected theme. */ }
        }
      } finally {
        document.documentElement.classList.remove("theme-ripple-active");
        themeTransitioning = false;
        themeToggle.disabled = false;
      }
    });
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
  const headerShareButton = byId("shareButton");
  if (headerShareButton) headerShareButton.addEventListener("click", openShare);
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

  document.querySelectorAll(".media-protected").forEach((media) => media.setAttribute("draggable", "false"));
  const blockCasualImageSaving = (event) => {
    if (event.target instanceof Element && event.target.closest(".media-protected")) event.preventDefault();
  };
  document.addEventListener("contextmenu", blockCasualImageSaving, true);
  document.addEventListener("dragstart", blockCasualImageSaving, true);

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
