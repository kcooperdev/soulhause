window.bootFolxReveal = function bootFolxReveal() {
  if (window.__folxReveal) return;
  window.__folxReveal = true;

  function load(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function wordWindow(progress, index, total, overlapWords) {
    var totalTime = 1 + overlapWords / total;
    var start = index / total / totalTime;
    var end = (index / total + overlapWords / total) / totalTime;
    var duration = Math.max(0.0001, end - start);
    if (progress <= start) return 0;
    if (progress >= end) return 1;
    return (progress - start) / duration;
  }

  function applyProgress(words, progress) {
    var total = words.length;
    if (!total) return;

    words.forEach(function (word, index) {
      var local = wordWindow(progress, index, total, 14);
      var keyword = word.classList.contains("keyword-wrapper");
      var span = word.querySelector("span");
      var shown = local > 0.02;
      var pill = local < 0.86 ? 1 : 1 - (local - 0.86) / 0.14;
      var text = Math.max(0, Math.min(1, (local - 0.02) / 0.1));
      word.style.opacity = shown ? "1" : "0";
      word.style.setProperty("--grey", keyword ? "0" : String(Math.max(0, Math.min(1, pill))));
      word.style.setProperty("--accent", keyword ? String(Math.max(0, Math.min(1, local))) : "0");
      if (span) span.style.opacity = String(Math.max(0, Math.min(1, text)));
    });
  }

  function start() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var Lenis = window.Lenis;
    if (!gsap || !ScrollTrigger || !Lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".folx-scroll .anim-text-container").forEach(function (section) {
      var words = section.querySelectorAll(".word");
      if (reduce) {
        words.forEach(function (word) {
          var span = word.querySelector("span");
          word.style.opacity = "1";
          word.style.setProperty("--grey", "0");
          word.style.setProperty("--accent", word.classList.contains("keyword-wrapper") ? "1" : "0");
          if (span) span.style.opacity = "1";
        });
        return;
      }
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        start: "top top",
        end: "+=420%",
        scrub: true,
        onUpdate: function (self) {
          applyProgress(words, self.progress);
        },
        onRefresh: function (self) {
          applyProgress(words, self.progress);
        },
      });
      applyProgress(words, 0);
    });

    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
    });
  }

  var tries = 0;
  function wait() {
    if (document.querySelector(".folx-scroll .word")) {
      start();
      return;
    }
    if (++tries > 240) return;
    requestAnimationFrame(wait);
  }

  Promise.resolve()
    .then(function () {
      return load("/vendor/gsap.min.js");
    })
    .then(function () {
      return load("/vendor/ScrollTrigger.min.js");
    })
    .then(function () {
      return load("/vendor/lenis.min.js");
    })
    .then(wait);
};
