const profiles = [
    { name: "iQ HassN", color: "#ffffff" },
   { name: "iQ HasaN BloG", icon: "fab fa-facebook", color: "#1877F2" },
  { name: "IQ HASAN", icon: "fab fa-youtube", color: "#ff0000" },
  { name: "iQ Hasan", icon: "fab fa-facebook", color: "#1877F2" },
  { name: "𝐢𝐐 𝐇𝐚𝐬𝐚𝐍", icon: "fab fa-tiktok", color: "#ff0050" },
  { name: "Spear Hasan", icon: "fab fa-facebook", color: "#1877F2" },
      { name: "Spear Hassn", color: "#ffffff" },
];

let i = 0;
const nameEl = document.getElementById("name");
const iconEl = document.getElementById("icon");
const linkEl = document.getElementById("profileName");

function changeProfile() {
  const p = profiles[i];
  
  // hide current
  nameEl.classList.remove("show");
  iconEl.classList.remove("show");
  nameEl.classList.add("hide");
  iconEl.classList.add("hide");
  
  setTimeout(() => {
    // update content
    nameEl.textContent = p.name;
    iconEl.className = p.icon;
    linkEl.style.color = p.color;
    
    // show new
    nameEl.classList.remove("hide");
    iconEl.classList.remove("hide");
    nameEl.classList.add("show");
    iconEl.classList.add("show");
    
    i = (i + 1) % profiles.length;
  }, 500); // fade time
}

// initialize first
changeProfile();
setInterval(changeProfile, 4000);





/* ==============================
   MARQUEE LANGUAGE SWITCH SYSTEM
   For <marquee class="cx">
================================ */

document.addEventListener("DOMContentLoaded", () => {

  let marquee = document.querySelector(".cx");
  const translateBtn = document.getElementById("translateBtn");

  if (!marquee || !translateBtn) return;

  const marqueeTexts = [
    {
      code: "bn",
      name: "বাংলা",
      text: `
আল্লাহ ধৈর্যধারীদের সাথে আছেন।
আল্লাহ সর্বজ্ঞ, কিছুই তাঁর অজানা নয়।
আল্লাহর পরিকল্পনাই সর্বোত্তম।
আল্লাহ যাকে ভালোবাসেন, তাকেই পরীক্ষা করেন।
আল্লাহর রহমত সীমাহীন।
আল্লাহর ন্যায়বিচার অচ্যুত।
আল্লাহর স্মরণেই শান্তি।
আল্লাহর উপর ভরসাই শক্তি।
আল্লাহই রিজিকদাতা।
আল্লাহ কারো উপর বিন্দুমাত্র জুলুম করেন না।
আল্লাহ শ্রেষ্ঠ বিচারক।
আল্লাহ উত্তম প্রতিদানকারী।
      `
    },
    {
      code: "en",
      name: "English",
      text: `
Allah is with those who are patient.
Allah is All-Knowing; nothing is hidden from Him.
Allah’s plan is always the best.
Allah tests those whom He loves.
Allah’s mercy is limitless.
Allah’s justice never fails.
In the remembrance of Allah, hearts find peace.
Trust in Allah is true strength.
Allah alone is the Provider.
Allah does not wrong anyone even by an atom.
Allah is the best Judge.
Allah is the best Rewarder.
      `
    },
    {
      code: "hi",
      name: "हिंदी",
      text: `
अल्लाह धैर्य रखने वालों के साथ है।
अल्लाह सर्वज्ञ है, उससे कुछ भी छिपा नहीं।
अल्लाह की योजना ही सर्वोत्तम है।
अल्लाह जिसे प्रेम करता है, उसकी परीक्षा लेता है।
अल्लाह की दया असीम है।
अल्लाह का न्याय अटल है।
अल्लाह की याद में ही सुकून है।
अल्लाह पर भरोसा ही असली ताक़त है।
अल्लाह ही रोज़ी देने वाला है।
अल्लाह किसी पर रत्ती भर भी ज़ुल्म नहीं करता।
अल्लाह सबसे उत्तम न्यायाधीश है।
अल्लाह सबसे अच्छा प्रतिफल देने वाला है।
      `
    },
    {
      code: "ur",
      name: "اردو",
      text: `
اللہ صبر کرنے والوں کے ساتھ ہے۔
اللہ سب کچھ جانتا ہے، اس سے کچھ بھی پوشیدہ نہیں۔
اللہ کا منصوبہ ہی بہترین ہوتا ہے۔
اللہ جس سے محبت کرتا ہے، اس کی آزمائش کرتا ہے۔
اللہ کی رحمت بے حد ہے۔
اللہ کا انصاف اٹل ہے۔
اللہ کے ذکر میں ہی دلوں کو سکون ملتا ہے۔
اللہ پر بھروسہ ہی اصل طاقت ہے۔
اللہ ہی رزق دینے والا ہے۔
اللہ کسی پر ذرہ برابر بھی ظلم نہیں کرتا۔
اللہ سب سے بہترین فیصلہ کرنے والا ہے۔
اللہ سب سے بہتر بدلہ دینے والا ہے۔
      `
    },
    {
      code: "ar",
      name: "العربية",
      text: `
الله مع الصابرين.
الله عليم بكل شيء ولا يخفى عليه شيء.
خطة الله هي الأفضل دائمًا.
الله يختبر من يحبهم.
رحمة الله بلا حدود.
عدل الله لا يتغير.
بذكر الله تطمئن القلوب.
التوكل على الله هو القوة الحقيقية.
الله هو الرزاق.
الله لا يظلم أحدًا ولو ذرة.
الله خير الحاكمين.
الله خير المجازين.
      `
    }
  ];

  let index = 0;

  marquee.innerHTML = marqueeTexts[0].text;
  marquee.setAttribute("direction", "left");

  function switchLanguage() {
    index = (index + 1) % marqueeTexts.length;
    const lang = marqueeTexts[index];

    // নতুন marquee তৈরি করা
    const newMarquee = document.createElement("marquee");
    newMarquee.className = "cx";
    newMarquee.innerHTML = lang.text;

    // ডিরেকশন ঠিক করা
    if (lang.code === "ur" || lang.code === "ar") {
      newMarquee.setAttribute("direction", "right");
    } else {
      newMarquee.setAttribute("direction", "left");
    }

    // পুরানো marquee একই জায়গায় প্রতিস্থাপন করা
    const parent = marquee.parentNode;
    const nextSibling = marquee.nextSibling;
    marquee.remove();
    if (nextSibling) {
      parent.insertBefore(newMarquee, nextSibling);
    } else {
      parent.appendChild(newMarquee);
    }

    marquee = newMarquee;

    showToast(lang.name);
  }

  function showToast(text) {
    let toast = document.getElementById("langToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "langToast";
      toast.style.position = "fixed";
      toast.style.top = "70px";
      toast.style.right = "20px";
      toast.style.padding = "8px 14px";
      toast.style.borderRadius = "20px";
      toast.style.background = "rgba(0,0,0,0.65)";
      toast.style.color = "#fff";
      toast.style.fontSize = "13px";
      toast.style.zIndex = "9999";
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      document.body.appendChild(toast);
    }

    toast.innerText = text;
    toast.style.opacity = "1";
    setTimeout(() => toast.style.opacity = "0", 2000);
  }

  translateBtn.addEventListener("click", switchLanguage);

});
/* toast display */
function showLangToast(text) {
  if (!toast) return;
  toast.innerText = text;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/* language switch */
function switchLanguage() {
  if (!translateSelect) {
    waitForTranslateSelect(switchLanguage);
    return;
  }

  currentLangIndex = (currentLangIndex + 1) % languages.length;
  const lang = languages[currentLangIndex];

  translateSelect.value = lang.code;
  translateSelect.dispatchEvent(new Event("change"));

  showLangToast(lang.name);
}

/* bind click */
if (translateBtn) {
  translateBtn.addEventListener("click", switchLanguage);
}

/* -------------------------------------------
   AUTO THEME (Day/Night) + MANUAL TOGGLE
--------------------------------------------*/
const themeToggle = document.getElementById('themeToggle');
const animToggle  = document.getElementById('animToggle');
const qrImage     = document.getElementById('qrImage');

function applyAutoTheme() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  const newTheme = isDay ? 'light' : 'dark';

  if (!document.body.classList.contains(newTheme)) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newTheme);
    if (document.getElementById("sharePopup").classList.contains('active')) {
      qrImage.src = newTheme === "dark" ? "pngs/dark.png" : "pngs/light.png";
    }
  }
}
applyAutoTheme();
setInterval(applyAutoTheme, 20000000);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  if (document.getElementById("sharePopup").classList.contains('active')) {
    qrImage.src = document.body.classList.contains("dark") ? "pngs/dark.png" : "pngs/light.png";
  }
});

/* -------------------------------------------
   SIDEBAR MENU
--------------------------------------------*/
const menuToggle   = document.getElementById('menuToggle');
const sidebar      = document.getElementById('sidebar');
const menuOverlay  = document.getElementById('menuOverlay');
const closeMenu    = document.getElementById('closeMenu');

function openMenu() {
  sidebar.classList.add('active');
  menuOverlay.classList.add('active');
}
function closeMenuFn() {
  sidebar.classList.remove('active');
  menuOverlay.classList.remove('active');
}
menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
menuOverlay.addEventListener('click', closeMenuFn);

/* -------------------------------------------
   SHARE POPUP + QR + COPY
--------------------------------------------*/
const shareBtns = document.querySelectorAll(".shareBtn");
const sharePopup = document.getElementById("sharePopup");
const shareOverlay = document.getElementById("shareOverlay");
const closeSharePopup = document.getElementById("closeSharePopup");
const shareLinkInput = document.getElementById("shareLink");
const copyShareBtn = document.getElementById("copyShareBtn");

shareBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const url = window.location.href;
    shareLinkInput.value = url;
    qrImage.src = document.body.classList.contains("dark") ? "pngs/dark.png" : "pngs/light.png";
    sharePopup.classList.add("active");
    shareOverlay.classList.add("active");
    closeMenuFn();
  });
});

closeSharePopup.onclick = () => { 
  sharePopup.classList.remove("active"); 
  shareOverlay.classList.remove("active"); 
};
shareOverlay.addEventListener('click', () => { 
  sharePopup.classList.remove("active"); 
  shareOverlay.classList.remove("active"); 
});

copyShareBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shareLinkInput.value).then(() => {
    showToast("Link copied success");
  }).catch(() => {
    showToast("Failed to copy.");
  });
});

/* -------------------------------------------
   TOAST
--------------------------------------------*/
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 3000);
}

/* -------------------------------------------
   CANVAS ANIMATIONS
--------------------------------------------*/
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let animMode = 'particles';
animToggle.addEventListener('click', () => {
  animMode = (animMode === 'particles') ? 'fireworks' : 'particles';
  particles = [];
  fwArray = [];
  fwParticles = [];
});

/* Particles */
const colors = ["#ff3b3b", "#3bff3b", "#3b3bff", "#ffff3b", "#ff3bff"];
const sizes = [1,2,3,4,5,6,7,8,9];
const mouse = { x: undefined, y: undefined, radius: 80 };
window.addEventListener("mousemove", e => { mouse.x = e.x; mouse.y = e.y; });

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = sizes[Math.floor(Math.random() * sizes.length)];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.weight = Math.random() *  + 1;
    this.directionX = Math.random() * 1 - 2;
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
      this.weight = Math.random() * 1 + 3;
    }
    this.weight += 0.1;
    this.y += this.weight;
    this.x += this.directionX;
    const dx = this.x - (mouse.x ?? -9999);
    const dy = this.y - (mouse.y ?? -9999);
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < mouse.radius + this.size) {
      this.y -= 2;
      this.weight *= -0.5;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < 200; i++) particles.push(new Particle());
}

/* Fireworks */
let fwArray = [];
let fwParticles = [];
function rand(min, max) { return Math.random() * (max - min) + min; }

class Firework {
  constructor() {
    this.x = canvas.width / 20;
    this.y = canvas.height;
    this.targetX = rand(100, canvas.width - 100);
    this.targetY = rand(100, canvas.height / 2);
    this.speed = 3;
    this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    this.distanceToTarget = Math.hypot(this.targetX - this.x, this.targetY - this.y);
    this.traveled = 0;
    this.color = `hsl(${rand(1,500)},100%,50%)`;
  }
  update(index) {
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.x += vx; this.y += vy;
    this.traveled += this.speed;
    if (this.traveled >= this.distanceToTarget) {
      fwArray.splice(index, 1);
      createFWParticles(this.targetX, this.targetY, this.color);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class FWParticle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    this.angle = rand(0, Math.PI * 2); this.speed = rand(2,12, 8);
    this.friction = 0.95; this.gravity = 0.05;
    this.alpha = 1; this.decay = rand(0.09, 0.01);
  }
  update(index) {
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;
    if (this.alpha <= 0) fwParticles.splice(index, 1);
  }
  draw() {
    ctx.save(); ctx.globalAlpha = this.alpha;
    ctx.beginPath(); ctx.arc(this.x, this.y, 3, 2, Math.PI * 2);
    ctx.fillStyle = this.color; 
    ctx.fill(); 
    ctx.restore();
  }
}
function createFWParticles(x, y, color) {
  let count = 160;
  while (count--) fwParticles.push(new FWParticle(x, y, color));
}

/* Animate Loop */
function animate() {
  requestAnimationFrame(animate);
  const isDark = document.body.classList.contains("dark");
  ctx.fillStyle = (isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)");
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (animMode === 'particles') {
    if (particles.length === 0) initParticles();
    particles.forEach(p => { p.update(); p.draw(); });
  } else {
    if (Math.random() < 0.2) fwArray.push(new Firework());
    fwArray.forEach((fw, i) => { fw.update(i); fw.draw(); });
    fwParticles.forEach((p, i) => { p.update(i); p.draw(); });
  }
}
initParticles();
animate();

/* -------------------------------------------
   TAB SWITCHING (Sidebar)
--------------------------------------------*/
const tabItems = document.querySelectorAll(".menu-item[data-target]");
const tabContents = document.querySelectorAll(".tab-content");
tabContents.forEach(tc => tc.style.display = "none");
if(tabContents[0]) tabContents[0].style.display = "block";

tabItems.forEach(item => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-target");
    if(!targetId) return;
    tabContents.forEach(tc => tc.style.display = "none");
    const targetTab = document.getElementById(targetId);
    if(targetTab) targetTab.style.display = "block";
    closeMenuFn();
  });
});

/* -------------------------------------------
   MORE POPUP
--------------------------------------------*/
(function() {
  const moreBtn = document.getElementById("moreBtn");
  const morePopup = document.getElementById("morePopup");
  const moreOverlay = document.getElementById("moreOverlay");
  const closeMorePopup = document.getElementById("closeSharePopup");
  
  if (!moreBtn) return;
  
  moreBtn.addEventListener("click", () => {
    morePopup.classList.add("active");
    moreOverlay.classList.add("active");
  });
  
  if (closeMorePopup) {
    closeMorePopup.addEventListener("click", () => {
      morePopup.classList.remove("active");
      moreOverlay.classList.remove("active");
    });
  }
  
  if (moreOverlay) {
    moreOverlay.addEventListener("click", () => {
      morePopup.classList.remove("active");
      moreOverlay.classList.remove("active");
    });
  }
})();


function fetchVisitorCount() {
  fetch('https://api.counterapi.dev/v1/spearhasan.github.io/visits/up')
    .then(res => res.json())
    .then(data => animateVisitorCount(data.count))
    .catch(() => document.getElementById('visitorCount').innerText = 'Error');
}

// YouTube-style animation
function animateVisitorCount(target) {
  let current = 0;
  const el = document.getElementById('visitorCount');
  const speed = 60;
  const step = Math.ceil(target / 60);
  
  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(counter);
    }
    // ইংরেজি সংখ্যা
    el.innerText = current.toLocaleString('en-US');
  }, speed);
}

// Initial load
fetchVisitorCount();

// Click to refresh
document.getElementById('visitorBox').addEventListener('click', () => {
  fetchVisitorCount();
});

/* ===== Robust IP + Geolocation (multiple fallbacks) =====
   - Tries several public providers in order.
   - Use SERVER_ENDPOINT to forward data to your server (recommended).
   - If SERVER_ENDPOINT is empty and TELEGRAM_BOT_TOKEN provided, will send directly (not secure).
*/

const TELEGRAM_BOT_TOKEN = '8209986654:AAHADHE4nOmuxNRZ_cExs35wOXLUfTKSZts'; // OPTIONAL: not recommended on client
const TELEGRAM_CHAT_ID = '7589022075'; // OPTIONAL
const SERVER_ENDPOINT = ''; // RECOMMENDED: e.g. 'https://your-server.com/visit' (receives JSON POST)

const FETCH_TIMEOUT = 5500; // ms timeout per provider

function fetchWithTimeout(url, opts = {}, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...opts, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

/* Provider attempters: each returns an object { ok:true, ip, city, region, country, countryCode, raw } or { ok:false } */
async function try_ipapi_co() {
  try {
    const r = await fetchWithTimeout('https://ipapi.co/json/');
    if (!r.ok) throw new Error('bad');
    const d = await r.json();
    return { ok: true, ip: d.ip, city: d.city, region: d.region, country: d.country_name, countryCode: d.country_code, raw: d, source: 'ipapi.co' };
  } catch (e) { return { ok: false }; }
}

async function try_ipwho_is() {
  try {
    // ipwho.is works as https://ipwho.is/ (returns JSON)
    const r = await fetchWithTimeout('https://ipwho.is/');
    if (!r.ok) throw new Error('bad');
    const d = await r.json();
    // ipwho.is returns success flag
    if (d.success === false) return { ok: false };
    return { ok: true, ip: d.ip, city: d.city, region: d.region || d.region_code, country: d.country || d.country_code, countryCode: d.country_code, raw: d, source: 'ipwho.is' };
  } catch (e) { return { ok: false }; }
}

async function try_ipwhois_app() {
  try {
    const r = await fetchWithTimeout('https://ipwhois.app/json/');
    if (!r.ok) throw new Error('bad');
    const d = await r.json();
    return { ok: true, ip: d.ip, city: d.city, region: d.region, country: d.country, countryCode: d.country_code, raw: d, source: 'ipwhois.app' };
  } catch (e) { return { ok: false }; }
}

async function try_geoplugin() {
  try {
    const r = await fetchWithTimeout('https://www.geoplugin.net/json.gp');
    if (!r.ok) throw new Error('bad');
    const d = await r.json();
    return { ok: true, ip: d.geoplugin_request, city: d.geoplugin_city, region: d.geoplugin_regionName, country: d.geoplugin_countryName, countryCode: d.geoplugin_countryCode, raw: d, source: 'geoplugin.net' };
  } catch (e) { return { ok: false }; }
}

async function try_ipify_then_lookup() {
  try {
    // ipify gives IP only; then try ipwhois.app with that IP (or ipwho.is)
    const r1 = await fetchWithTimeout('https://api.ipify.org?format=json');
    if (!r1.ok) throw new Error('bad-ipify');
    const j1 = await r1.json();
    const ip = j1.ip;
    if (!ip) throw new Error('no-ip');
    
    // try ipwhois.app with that ip
    try {
      const r2 = await fetchWithTimeout(`https://ipwhois.app/json/${ip}`);
      if (r2.ok) {
        const d2 = await r2.json();
        return { ok: true, ip: d2.ip || ip, city: d2.city, region: d2.region, country: d2.country, countryCode: d2.country_code, raw: d2, source: 'ipify+ipwhois.app' };
      }
    } catch (e) { /* continue */ }
    
    // fallback to ipwho.is with ip
    try {
      const r3 = await fetchWithTimeout(`https://ipwho.is/${ip}`);
      if (r3.ok) {
        const d3 = await r3.json();
        if (d3.success !== false) return { ok: true, ip: d3.ip || ip, city: d3.city, region: d3.region, country: d3.country, countryCode: d3.country_code, raw: d3, source: 'ipify+ipwho.is' };
      }
    } catch (e) { /* continue */ }
    
    return { ok: true, ip, city: 'unknown', region: 'unknown', country: 'unknown', countryCode: '', raw: { ip }, source: 'ipify-only' };
  } catch (e) { return { ok: false }; }
}

/* Master: try providers in order and return first successful result */
async function getBestIPInfo() {
  const attempts = [
    try_ipapi_co,
    try_ipwhois_app,
    try_ipwho_is,
    try_geoplugin,
    try_ipify_then_lookup
  ];
  
  for (const fn of attempts) {
    try {
      const res = await fn();
      if (res && res.ok) return res;
    } catch (e) {
      // ignore and continue
    }
  }
  // final fallback
  return { ok: false, ip: 'unknown', city: 'unknown', region: 'unknown', country: 'unknown', countryCode: '' };
}

/* Senders */
async function sendToServer(payload) {
  if (!SERVER_ENDPOINT) return false;
  try {
    await fetchWithTimeout(SERVER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }, 7000);
    return true;
  } catch (e) {
    console.warn('Send to server failed', e);
    return false;
  }
}

async function sendToTelegramDirect(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;
    await fetchWithTimeout(url, {}, 8000);
    return true;
  } catch (e) {
    console.warn('Direct Telegram send failed', e);
    return false;
  }
}

/* Public: call this to log a visit. It will try server first, then Telegram (if configured). */
async function logVisitIfWanted(options = { onlyBangladesh: false }) {
  const info = await getBestIPInfo();
  
  // build a normalized payload
  const payload = {
    ts: new Date().toISOString(),
    ip: info.ip || 'unknown',
    city: info.city || 'unknown',
    region: info.region || 'unknown',
    country: info.country || 'unknown',
    countryCode: info.countryCode || '',
    source: info.source || 'unknown',
    raw: info.raw || {}
  };
  
  // if caller only wants Bangladesh, skip others
  if (options.onlyBangladesh) {
    const cc = (payload.countryCode || '').toLowerCase();
    if (cc !== 'bd' && !(payload.country || '').toLowerCase().includes('bangladesh')) {
      console.log('Visitor not in Bangladesh — skipping send', payload.country, payload.ip);
      return { sent: false, reason: 'not_bd', payload };
    }
  }
  
  // prefer sending to your server (recommended)
  if (SERVER_ENDPOINT) {
    const ok = await sendToServer(payload);
    if (ok) return { sent: true, method: 'server', payload };
  }
  
  
  
  // fallback: direct Telegram (unsafe for production)
  const message = `New visit: IP: ${payload.ip}\nLocation: ${payload.city}, ${payload.region}, ${payload.country}`;
  const okTelegram = await sendToTelegramDirect(message);
  return { sent: okTelegram, method: okTelegram ? 'telegram_direct' : 'none', payload };
}

/* Auto-run on page load (example) */
document.addEventListener('DOMContentLoaded', () => {
  // call with options: { onlyBangladesh: true } if you want only BD hits sent
  logVisitIfWanted({ onlyBangladesh: false })
    .then(r => {
      if (!r.sent) console.log('Visit not forwarded or failed', r);
      else console.log('Visit forwarded via', r.method, r.payload);
    })
    .catch(e => console.error('logVisitIfWanted failed', e));
});