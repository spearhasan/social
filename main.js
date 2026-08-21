/* =========================================================
   SPEAR HASAN - FINAL JAVASCRIPT
   Canvas / Particle / Fireworks সম্পূর্ণ বাদ
   Default Language = বাংলা
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const translateBtn =
    document.getElementById("translateBtn");

  const themeToggle =
    document.getElementById("themeToggle");

  const qrImage =
    document.getElementById("qrImage");

  const menuToggle =
    document.getElementById("menuToggle");

  const sidebar =
    document.getElementById("sidebar");

  const menuOverlay =
    document.getElementById("menuOverlay");

  const closeMenu =
    document.getElementById("closeMenu");

  const sharePopup =
    document.getElementById("sharePopup");

  const shareOverlay =
    document.getElementById("shareOverlay");

  const closeSharePopup =
    document.getElementById("closeSharePopup");

  const shareLinkInput =
    document.getElementById("shareLink");

  const copyShareBtn =
    document.getElementById("copyShareBtn");

  const visitorBox =
    document.getElementById("visitorBox");

  const visitorCount =
    document.getElementById("visitorCount");


  /* =========================================================
     LANGUAGE DATA
     বাংলা = DEFAULT
  ========================================================= */

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


  /* =========================================================
     MARQUEE SYSTEM
     DEFAULT = বাংলা
  ========================================================= */

  let currentLanguageIndex = 0;

  let marquee =
    document.querySelector(".cx");


  function createMarquee(lang) {

    const newMarquee =
      document.createElement("marquee");

    /*
      গুরুত্বপূর্ণ:
      cx + language class
    */

    newMarquee.className =
      "cx lang-" + lang.code;

    /*
      বাংলা text সরাসরি এখানে বসানো হচ্ছে
    */

    newMarquee.innerHTML =
      lang.text.trim();

    /*
      Urdu / Arabic = Right
      অন্য ভাষা = Left
    */

    newMarquee.setAttribute(
      "direction",
      (
        lang.code === "ur" ||
        lang.code === "ar"
      )
        ? "right"
        : "left"
    );

    /*
      Local font class
    */

    if (lang.code === "bn") {

      newMarquee.classList.add(
        "bangla-font"
      );
    }

    return newMarquee;
  }


  function setLanguage(index) {

    const lang =
      marqueeTexts[index];

    const newMarquee =
      createMarquee(lang);


    /*
      পুরোনো marquee থাকলে
      সেটি replace করবে
    */

    if (marquee) {

      marquee.replaceWith(
        newMarquee
      );

    } else {

      /*
        HTML-এ .cx না থাকলেও
        body-এর শুরুতে তৈরি করবে
      */

      document.body.prepend(
        newMarquee
      );
    }


    marquee =
      newMarquee;
  }


  /*
    PAGE LOAD-এর সময়ই বাংলা চালু হবে
  */

  setLanguage(0);


  /*
    BUTTON CLICK করলে পরের ভাষা
  */

  if (translateBtn) {

    translateBtn.addEventListener(
      "click",
      () => {

        currentLanguageIndex =
          (
            currentLanguageIndex + 1
          ) %
          marqueeTexts.length;

        const lang =
          marqueeTexts[
            currentLanguageIndex
          ];

        setLanguage(
          currentLanguageIndex
        );

        showLangToast(
          lang.name
        );
      }
    );
  }


  /* =========================================================
     LANGUAGE TOAST
  ========================================================= */

  function showLangToast(text) {

    let toast =
      document.getElementById(
        "langToast"
      );


    if (!toast) {

      toast =
        document.createElement(
          "div"
        );

      toast.id =
        "langToast";

      document.body.appendChild(
        toast
      );
    }


    toast.textContent =
      text;

    toast.classList.add(
      "show"
    );


    clearTimeout(
      showLangToast.timer
    );


    showLangToast.timer =
      setTimeout(() => {

        toast.classList.remove(
          "show"
        );

      }, 2000);
  }


  /* =========================================================
     GENERAL TOAST
  ========================================================= */

  function showToast(message) {

    const toast =
      document.getElementById(
        "toast"
      );

    if (!toast)
      return;


    toast.textContent =
      message;

    toast.style.display =
      "block";


    clearTimeout(
      showToast.timer
    );


    showToast.timer =
      setTimeout(() => {

        toast.style.display =
          "none";

      }, 3000);
  }


  /* =========================================================
     THEME
  ========================================================= */

  function updateQR() {

    if (!qrImage)
      return;


    const isDark =
      document.body.classList.contains(
        "dark"
      );


    qrImage.src =
      isDark
        ? "pngs/dark.png"
        : "pngs/light.png";
  }


  function applyAutoTheme() {

    const hour =
      new Date().getHours();


    const isDay =
      hour >= 6 &&
      hour < 18;


    document.body.classList.remove(
      "dark",
      "light"
    );


    document.body.classList.add(
      isDay
        ? "light"
        : "dark"
    );


    updateQR();
  }


  applyAutoTheme();


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const isDark =
          document.body.classList.contains(
            "dark"
          );


        document.body.classList.remove(
          "dark",
          "light"
        );


        document.body.classList.add(
          isDark
            ? "light"
            : "dark"
        );


        updateQR();
      }
    );
  }


  /* =========================================================
     SIDEBAR
  ========================================================= */

  function openMenu() {

    if (sidebar)
      sidebar.classList.add(
        "active"
      );

    if (menuOverlay)
      menuOverlay.classList.add(
        "active"
      );
  }


  function closeMenuFn() {

    if (sidebar)
      sidebar.classList.remove(
        "active"
      );

    if (menuOverlay)
      menuOverlay.classList.remove(
        "active"
      );
  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      openMenu
    );
  }


  if (closeMenu) {

    closeMenu.addEventListener(
      "click",
      closeMenuFn
    );
  }


  if (menuOverlay) {

    menuOverlay.addEventListener(
      "click",
      closeMenuFn
    );
  }


  /* =========================================================
     SHARE POPUP
  ========================================================= */

  const shareBtns =
    document.querySelectorAll(
      ".shareBtn"
    );


  shareBtns.forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        if (shareLinkInput) {

          shareLinkInput.value =
            window.location.href;
        }


        updateQR();


        if (sharePopup) {

          sharePopup.classList.add(
            "active"
          );
        }


        if (shareOverlay) {

          shareOverlay.classList.add(
            "active"
          );
        }


        closeMenuFn();
      }
    );
  });


  function closeShare() {

    if (sharePopup) {

      sharePopup.classList.remove(
        "active"
      );
    }


    if (shareOverlay) {

      shareOverlay.classList.remove(
        "active"
      );
    }
  }


  if (closeSharePopup) {

    closeSharePopup.addEventListener(
      "click",
      closeShare
    );
  }


  if (shareOverlay) {

    shareOverlay.addEventListener(
      "click",
      closeShare
    );
  }


  /* =========================================================
     COPY SHARE LINK
  ========================================================= */

  if (copyShareBtn) {

    copyShareBtn.addEventListener(
      "click",
      async () => {

        if (!shareLinkInput)
          return;


        const url =
          shareLinkInput.value;


        try {

          await navigator.clipboard
            .writeText(url);


          showToast(
            "Link copied successfully"
          );


        } catch (error) {

          try {

            shareLinkInput.select();

            shareLinkInput.setSelectionRange(
              0,
              99999
            );

            document.execCommand(
              "copy"
            );


            showToast(
              "Link copied successfully"
            );


          } catch (fallbackError) {

            showToast(
              "Failed to copy."
            );
          }
        }
      }
    );
  }


  /* =========================================================
     SIDEBAR TAB SWITCHING
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
    content => {

      content.style.display =
        "none";
    }
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
          content => {

            content.style.display =
              "none";
          }
        );


        const target =
          document.getElementById(
            targetId
          );


        if (target) {

          target.style.display =
            "block";
        }


        closeMenuFn();
      }
    );
  });


  /* =========================================================
     VISITOR COUNTER
  ========================================================= */

  /*
     আপনার নতুন Counter API URL এখানে বসাবেন।

     উদাহরণ:

     const COUNTER_API_URL =
       "https://example.com/api/counter";
  */

  const COUNTER_API_URL = "";


  async function fetchVisitorCount() {

    if (!visitorCount)
      return;


    if (!COUNTER_API_URL) {

      visitorCount.innerText =
        "—";

      return;
    }


    try {

      const response =
        await fetch(
          COUNTER_API_URL,
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Counter API Error: " +
          response.status
        );
      }


      const data =
        await response.json();


      const count =
        Number(
          data.count ??
          data.value ??
          data.total ??
          0
        );


      if (
        !Number.isFinite(count)
      ) {

        throw new Error(
          "Invalid visitor count"
        );
      }


      animateVisitorCount(
        count
      );


    } catch (error) {

      console.error(
        "Visitor Counter Error:",
        error
      );


      visitorCount.innerText =
        "Error";
    }
  }


  /* =========================================================
     VISITOR NUMBER ANIMATION
  ========================================================= */

  function animateVisitorCount(
    target
  ) {

    if (!visitorCount)
      return;


    target =
      Math.max(
        0,
        Math.floor(target)
      );


    const start =
      Number(
        visitorCount.dataset.value ||
        0
      );


    const duration =
      1000;


    const startTime =
      performance.now();


    function update(time) {

      const progress =
        Math.min(
          (time - startTime) /
          duration,
          1
        );


      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const current =
        Math.floor(
          start +
          (target - start) *
          eased
        );


      visitorCount.innerText =
        current.toLocaleString(
          "en-US"
        );


      if (progress < 1) {

        requestAnimationFrame(
          update
        );

      } else {

        visitorCount.innerText =
          target.toLocaleString(
            "en-US"
          );

        visitorCount.dataset.value =
          target;
      }
    }


    requestAnimationFrame(
      update
    );
  }


  /* =========================================================
     INITIAL VISITOR COUNT
  ========================================================= */

  fetchVisitorCount();


  /* =========================================================
     REFRESH VISITOR COUNT
  ========================================================= */

  if (visitorBox) {

    visitorBox.addEventListener(
      "click",
      fetchVisitorCount
    );
  }

});
