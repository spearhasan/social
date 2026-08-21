// SPEAR HASAN - FINAL JAVASCRIPT (Canvas/Particle/Fireworks বাদ, বাংলা ডিফল্ট)

document.addEventListener("DOMContentLoaded", () => {

  const translateBtn = document.getElementById("translateBtn");
  const themeToggle = document.getElementById("themeToggle");
  const qrImage = document.getElementById("qrImage");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const sharePopup = document.getElementById("sharePopup");
  const shareOverlay = document.getElementById("shareOverlay");
  const closeSharePopup = document.getElementById("closeSharePopup");
  const shareLinkInput = document.getElementById("shareLink");
  const copyShareBtn = document.getElementById("copyShareBtn");
  const visitorBox = document.getElementById("visitorBox");
  const visitorCount = document.getElementById("visitorCount");

  // ভাষা ডেটা (বাংলা ডিফল্ট)
  const marqueeTexts = [
    { code: "bn", name: "বাংলা", text: `আল্লাহ ধৈর্যধারীদের সাথে আছেন।\nআল্লাহ সর্বজ্ঞ, কিছুই তাঁর অজানা নয়।\nআল্লাহর পরিকল্পনাই সর্বোত্তম।\nআল্লাহ যাকে ভালোবাসেন, তাকেই পরীক্ষা করেন।\nআল্লাহর রহমত সীমাহীন।\nআল্লাহর ন্যায়বিচার অচ্যুত।\nআল্লাহর স্মরণেই শান্তি।\nআল্লাহর উপর ভরসাই শক্তি।\nআল্লাহই রিজিকদাতা।\nআল্লাহ কারো উপর বিন্দুমাত্র জুলুম করেন না।\nআল্লাহ শ্রেষ্ঠ বিচারক।\nআল্লাহ উত্তম প্রতিদানকারী।` },
    { code: "en", name: "English", text: `Allah is with those who are patient.\nAllah is All-Knowing; nothing is hidden from Him.\nAllah's plan is always the best.\nAllah tests those whom He loves.\nAllah's mercy is limitless.\nAllah's justice never fails.\nIn the remembrance of Allah, hearts find peace.\nTrust in Allah is true strength.\nAllah alone is the Provider.\nAllah does not wrong anyone even by an atom.\nAllah is the best Judge.\nAllah is the best Rewarder.` },
    { code: "hi", name: "हिंदी", text: `अल्लाह धैर्य रखने वालों के साथ है।\nअल्लाह सर्वज्ञ है, उससे कुछ भी छिपा नहीं।\nअल्लाह की योजना ही सर्वोत्तम है।\nअल्लाह जिसे प्रेम करता है, उसकी परीक्षा लेता है।\nअल्लाह की दया असीम है।\nअल्लाह का न्याय अटल है।\nअल्लाह की याद में ही सुकून है।\nअल्लाह पर भरोसा ही असली ताक़त है।\nअल्लाह ही रोज़ी देने वाला है।\nअल्लाह किसी पर रत्ती भर भी ज़ुल्म नहीं करता।\nअल्लाह सबसे उत्तम न्यायाधीश है।\nअल्लाह सबसे अच्छा प्रतिफल देने वाला है।` },
    { code: "ur", name: "اردو", text: `اللہ صبر کرنے والوں کے ساتھ ہے۔\nاللہ سب کچھ جانتا ہے، اس سے کچھ بھی پوشیدہ نہیں۔\nاللہ کا منصوبہ ہی بہترین ہوتا ہے۔\nاللہ جس سے محبت کرتا ہے، اس کی آزمائش کرتا ہے۔\nاللہ کی رحمت بے حد ہے۔\nاللہ کا انصاف اٹل ہے۔\nاللہ کے ذکر میں ہی دلوں کو سکون ملتا ہے۔\nاللہ پر بھروسہ ہی اصل طاقت ہے۔\nاللہ ہی رزق دینے والا ہے۔\nاللہ کسی پر ذرہ برابر بھی ظلم نہیں کرتا۔\nاللہ سب سے بہترین فیصلہ کرنے والا ہے۔\nاللہ سب سے بہتر بدلہ دینے والا ہے۔` },
    { code: "ar", name: "العربية", text: `الله مع الصابرين.\nالله عليم بكل شيء ولا يخفى عليه شيء.\nخطة الله هي الأفضل دائمًا.\nالله يختبر من يحبهم.\nرحمة الله بلا حدود.\nعدل الله لا يتغير.\nبذكر الله تطمئن القلوب.\nالتوكل على الله هو القوة الحقيقية.\nالله هو الرزاق.\nالله لا يظلم أحدًا ولو ذرة.\nالله خير الحاكمين.\nالله خير المجازين.` }
  ];

  let currentLanguageIndex = 0;
  let marquee = document.querySelector(".cx");

  // marquee তৈরি
  function createMarquee(lang) {
    const newMarquee = document.createElement("marquee");
    newMarquee.className = `cx lang-${lang.code}`;
    newMarquee.innerHTML = lang.text.trim();
    newMarquee.setAttribute("direction", (lang.code === "ur" || lang.code === "ar") ? "right" : "left");
    if (lang.code === "bn") newMarquee.classList.add("bangla-font");
    return newMarquee;
  }

  // ভাষা সেট
  function setLanguage(index) {
    const lang = marqueeTexts[index];
    const newMarquee = createMarquee(lang);
    if (marquee) {
      marquee.replaceWith(newMarquee);
    } else {
      document.body.prepend(newMarquee);
    }
    marquee = newMarquee;
  }

  setLanguage(0);

  // translate বাটন
  if (translateBtn) {
    translateBtn.addEventListener("click", () => {
      currentLanguageIndex = (currentLanguageIndex + 1) % marqueeTexts.length;
      const lang = marqueeTexts[currentLanguageIndex];
      setLanguage(currentLanguageIndex);
      showLangToast(lang.name);
    });
  }

  // সাইডবার খোলা/বন্ধ
  function openMenu() {
    if (sidebar) sidebar.classList.add("active");
    if (menuOverlay) menuOverlay.classList.add("active");
  }
  function closeMenuFn() {
    if (sidebar) sidebar.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
  }
  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuFn);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenuFn);

  // শেয়ার পপআপ
  const shareBtns = document.querySelectorAll(".shareBtn");
  shareBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (shareLinkInput) shareLinkInput.value = window.location.href;
      updateQR();
      if (sharePopup) sharePopup.classList.add("active");
      if (shareOverlay) shareOverlay.classList.add("active");
      closeMenuFn();
    });
  });
  function closeShare() {
    if (sharePopup) sharePopup.classList.remove("active");
    if (shareOverlay) shareOverlay.classList.remove("active");
  }
  if (closeSharePopup) closeSharePopup.addEventListener("click", closeShare);
  if (shareOverlay) shareOverlay.addEventListener("click", closeShare);

  // লিংক কপি
  if (copyShareBtn) {
    copyShareBtn.addEventListener("click", async () => {
      if (!shareLinkInput) return;
      const url = shareLinkInput.value;
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied successfully");
      } catch (error) {
        try {
          shareLinkInput.select();
          shareLinkInput.setSelectionRange(0, 99999);
          document.execCommand("copy");
          showToast("Link copied successfully");
        } catch (fallbackError) {
          showToast("Failed to copy.");
        }
      }
    });
  }

  // ট্যাব সুইচিং
  const tabItems = document.querySelectorAll(".menu-item[data-target]");
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(content => content.style.display = "none");
  if (tabContents[0]) tabContents[0].style.display = "block";
  tabItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      if (!targetId) return;
      tabContents.forEach(content => content.style.display = "none");
      const target = document.getElementById(targetId);
      if (target) target.style.display = "block";
      closeMenuFn();
    });
  });

  // Visitor Counter - একদিনে একবার কাউন্ট হবে
  const COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/hit/spearhasan_social_visits";
  const GET_COUNTER_API_URL = "https://countapi.mileshilliard.com/api/v1/get/spearhasan_social_visits";

  // সংখ্যা অ্যানিমেশন
  function animateVisitorCount(target) {
    if (!visitorCount) return;
    target = Math.max(0, Math.floor(target));
    const start = Number(visitorCount.dataset.value || 0);
    const duration = 1000;
    const startTime = performance.now();
    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      visitorCount.innerText = current.toLocaleString("en-US");
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        visitorCount.innerText = target.toLocaleString("en-US");
        visitorCount.dataset.value = target;
      }
    }
    requestAnimationFrame(update);
  }

  // আজকের তারিখ নেওয়া
  function getTodayKey() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // আজ ভিজিট হয়েছে কিনা চেক
  function hasVisitedToday() {
    const lastVisit = localStorage.getItem("lastVisitDate");
    const today = getTodayKey();
    return lastVisit === today;
  }

  // আজ ভিজিট হয়েছে চিহ্নিত করা
  function markVisitedToday() {
    const today = getTodayKey();
    localStorage.setItem("lastVisitDate", today);
  }

  // শুধু কাউন্ট দেখানো (বাড়ানো ছাড়া)
  function fetchVisitorCount() {
    if (!visitorCount) return;
    
    const savedCount = localStorage.getItem("visitorCount");
    if (savedCount) {
      visitorCount.innerText = Number(savedCount).toLocaleString("en-US");
    }
    
    fetch(GET_COUNTER_API_URL, {
      method: "GET",
      cache: "no-store"
    })
      .then(response => response.json())
      .then(data => {
        const count = Number(data.value);
        if (Number.isFinite(count)) {
          animateVisitorCount(count);
          localStorage.setItem("visitorCount", count);
        }
      })
      .catch(error => {
        console.error("Load Error:", error);
        visitorCount.innerText = savedCount || "0";
      });
  }

  // কাউন্ট বাড়ানো (শুধু একদিনে একবার)
  function incrementVisitorCount() {
    fetch(COUNTER_API_URL, {
      method: "GET",
      cache: "no-store"
    })
      .then(response => response.json())
      .then(data => {
        const count = Number(data.value);
        if (Number.isFinite(count)) {
          animateVisitorCount(count);
          localStorage.setItem("visitorCount", count);
        }
      })
      .catch(error => {
        console.error("Increment Error:", error);
      });
  }

  // পেজ লোডে চেক
  function loadVisitorCount() {
    if (!visitorCount) return;
    
    if (!hasVisitedToday()) {
      incrementVisitorCount();
      markVisitedToday();
    } else {
      fetchVisitorCount();
    }
  }

  // প্রাথমিক লোড
  loadVisitorCount();

  // ক্লিকে শুধু কাউন্ট দেখাবে (বাড়াবে না)
  if (visitorBox) {
    visitorBox.addEventListener("click", () => {
      fetchVisitorCount();
    });
  }

  // showLangToast ফাংশন
  function showLangToast(name) {
    const toast = document.createElement("div");
    toast.textContent = `ভাষা: ${name}`;
    toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;opacity:0;transition:opacity 0.3s;";
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }

  // showToast ফাংশন
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;opacity:0;transition:opacity 0.3s;";
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }

  // updateQR ফাংশন
  function updateQR() {
    if (qrImage && shareLinkInput) {
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLinkInput.value)}`;
    }
  }
});