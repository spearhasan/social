document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MARQUEE LANGUAGE SWITCH SYSTEM
  ========================================================= */

  let marquee = document.querySelector(".cx");
  const translateBtn = document.getElementById("translateBtn");

  if (marquee && translateBtn) {

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

    let languageIndex = 0;

    marquee.innerHTML = marqueeTexts[0].text;
    marquee.setAttribute("direction", "left");

    function switchLanguage() {

      languageIndex =
        (languageIndex + 1) % marqueeTexts.length;

      const lang =
        marqueeTexts[languageIndex];

      const newMarquee =
        document.createElement("marquee");

      newMarquee.className = "cx";

      newMarquee.innerHTML = lang.text;

      if (
        lang.code === "ur" ||
        lang.code === "ar"
      ) {
        newMarquee.setAttribute(
          "direction",
          "right"
        );
      } else {
        newMarquee.setAttribute(
          "direction",
          "left"
        );
      }

      const parent =
        marquee.parentNode;

      const nextSibling =
        marquee.nextSibling;

      marquee.remove();

      if (nextSibling) {
        parent.insertBefore(
          newMarquee,
          nextSibling
        );
      } else {
        parent.appendChild(
          newMarquee
        );
      }

      marquee = newMarquee;

      showLangToast(lang.name);
    }

    translateBtn.addEventListener(
      "click",
      switchLanguage
    );
  }


  /* =========================================================
     LANGUAGE TOAST
  ========================================================= */

  function showLangToast(text) {

    let toast =
      document.getElementById("langToast");

    if (!toast) {

      toast =
        document.createElement("div");

      toast.id = "langToast";

      document.body.appendChild(toast);
    }

    toast.innerText = text;

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }


  /* =========================================================
     AUTO THEME + MANUAL THEME
  ========================================================= */

  const themeToggle =
    document.getElementById("themeToggle");

  const qrImage =
    document.getElementById("qrImage");

  function applyAutoTheme() {

    const hour =
      new Date().getHours();

    const isDay =
      hour >= 6 && hour < 18;

    const newTheme =
      isDay ? "light" : "dark";

    document.body.classList.remove(
      "dark",
      "light"
    );

    document.body.classList.add(
      newTheme
    );

    const sharePopup =
      document.getElementById("sharePopup");

    if (
      qrImage &&
      sharePopup &&
      sharePopup.classList.contains("active")
    ) {
      qrImage.src =
        newTheme === "dark"
          ? "pngs/dark.png"
          : "pngs/light.png";
    }
  }

  applyAutoTheme();

  setInterval(
    applyAutoTheme,
    20000000
  );


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        document.body.classList.toggle(
          "dark"
        );

        document.body.classList.toggle(
          "light"
        );

        if (qrImage) {

          qrImage.src =
            document.body.classList.contains(
              "dark"
            )
              ? "pngs/dark.png"
              : "pngs/light.png";
        }
      }
    );
  }


  /* =========================================================
     SIDEBAR MENU
  ========================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const sidebar =
    document.getElementById("sidebar");

  const menuOverlay =
    document.getElementById("menuOverlay");

  const closeMenu =
    document.getElementById("closeMenu");


  function openMenu() {

    if (sidebar)
      sidebar.classList.add("active");

    if (menuOverlay)
      menuOverlay.classList.add("active");
  }


  function closeMenuFn() {

    if (sidebar)
      sidebar.classList.remove("active");

    if (menuOverlay)
      menuOverlay.classList.remove("active");
  }


  if (menuToggle)
    menuToggle.addEventListener(
      "click",
      openMenu
    );

  if (closeMenu)
    closeMenu.addEventListener(
      "click",
      closeMenuFn
    );

  if (menuOverlay)
    menuOverlay.addEventListener(
      "click",
      closeMenuFn
    );


  /* =========================================================
     SHARE POPUP + QR
  ========================================================= */

  const shareBtns =
    document.querySelectorAll(".shareBtn");

  const sharePopup =
    document.getElementById("sharePopup");

  const shareOverlay =
    document.getElementById("shareOverlay");

  const closeSharePopup =
    document.getElementById(
      "closeSharePopup"
    );

  const shareLinkInput =
    document.getElementById("shareLink");

  const copyShareBtn =
    document.getElementById(
      "copyShareBtn"
    );


  shareBtns.forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        if (shareLinkInput) {

          shareLinkInput.value =
            window.location.href;
        }

        if (qrImage) {

          qrImage.src =
            document.body.classList.contains(
              "dark"
            )
              ? "pngs/dark.png"
              : "pngs/light.png";
        }

        if (sharePopup)
          sharePopup.classList.add(
            "active"
          );

        if (shareOverlay)
          shareOverlay.classList.add(
            "active"
          );

        closeMenuFn();
      }
    );
  });


  if (closeSharePopup) {

    closeSharePopup.onclick = () => {

      if (sharePopup)
        sharePopup.classList.remove(
          "active"
        );

      if (shareOverlay)
        shareOverlay.classList.remove(
          "active"
        );
    };
  }


  if (shareOverlay) {

    shareOverlay.addEventListener(
      "click",
      () => {

        if (sharePopup)
          sharePopup.classList.remove(
            "active"
          );

        shareOverlay.classList.remove(
          "active"
        );
      }
    );
  }


  /* =========================================================
     COPY SHARE LINK
  ========================================================= */

  if (copyShareBtn) {

    copyShareBtn.addEventListener(
      "click",
      () => {

        if (!shareLinkInput)
          return;

        navigator.clipboard
          .writeText(
            shareLinkInput.value
          )

          .then(() => {

            showToast(
              "Link copied success"
            );
          })

          .catch(() => {

            showToast(
              "Failed to copy."
            );
          });
      }
    );
  }


  /* =========================================================
     GENERAL TOAST
  ========================================================= */

  function showToast(message) {

    const toast =
      document.getElementById("toast");

    if (!toast)
      return;

    toast.textContent = message;

    toast.style.display =
      "block";

    setTimeout(() => {

      toast.style.display =
        "none";

    }, 3000);
  }


  /* =========================================================
     TAB SWITCHING
  ========================================================= */

  const tabItems =
    document.querySelectorAll(
      ".menu-item[data-target]"
    );

  const tabContents =
    document.querySelectorAll(
      ".tab-content"
    );


  tabContents.forEach(
    tc => tc.style.display = "none"
  );


  if (tabContents[0]) {

    tabContents[0].style.display =
      "block";
  }


  tabItems.forEach(item => {

    item.addEventListener(
      "click",
      () => {

        const targetId =
          item.getAttribute(
            "data-target"
          );

        if (!targetId)
          return;

        tabContents.forEach(
          tc =>
            tc.style.display = "none"
        );

        const targetTab =
          document.getElementById(
            targetId
          );

        if (targetTab) {

          targetTab.style.display =
            "block";
        }

        closeMenuFn();
      }
    );
  });


  /* =========================================================
     VISITOR COUNTER
  ========================================================= */

  function fetchVisitorCount() {

    fetch(
      "https://api.counterapi.dev/v1/spearhasan.github.io/visits/up"
    )

      .then(res => res.json())

      .then(data => {

        animateVisitorCount(
          data.count
        );
      })

      .catch(() => {

        const el =
          document.getElementById(
            "visitorCount"
          );

        if (el)
          el.innerText = "Error";
      });
  }


  /* =========================================================
     VISITOR COUNT ANIMATION
  ========================================================= */

  function animateVisitorCount(target) {

    let current = 0;

    const el =
      document.getElementById(
        "visitorCount"
      );

    if (!el)
      return;

    const speed = 60;

    const step =
      Math.ceil(target / 60);


    const counter =
      setInterval(() => {

        current += step;

        if (current >= target) {

          current = target;

          clearInterval(
            counter
          );
        }

        el.innerText =
          current.toLocaleString(
            "en-US"
          );

      }, speed);
  }


  /* =========================================================
     INITIAL VISITOR COUNT
  ========================================================= */

  fetchVisitorCount();


  /* =========================================================
     REFRESH VISITOR COUNT
  ========================================================= */

  const visitorBox =
    document.getElementById(
      "visitorBox"
    );

  if (visitorBox) {

    visitorBox.addEventListener(
      "click",
      fetchVisitorCount
    );
  }

});