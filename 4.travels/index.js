//Global selections and variables    -------------------------------------------------------
let controller;
let slideScene;
let pageScene;
let detailScene;

//Functions                          -------------------------------------------------------
// slides animation
function animateSlides() {
  // init controller
  controller = new ScrollMagic.Controller();
  // select
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  // loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //  GSAP
    //  {root: null, rootMargin: "0px", threshold: 0.5}
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    //  create a scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      // colorStart: "white",
      // colorTrigger: "white",
      // name: "slide",
      // })
      .addTo(controller);
    //  a new animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //  create a new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setTween(pageTl)
      // .addIndicators({
      // colorStart: "red",
      // colorTrigger: "red",
      // name: "page",
      // indent: 100,
      // })
      .setPin(slide, { pushFollowers: false })
      .addTo(controller);
  });
}

// cursor animation
const mouse = document.querySelector(".cursor");
const mouseText = document.querySelector(".cursor span");
const burger = document.querySelector(".burger");

function cursor(e) {
  mouse.style.left = e.pageX + "px";
  mouse.style.top = e.pageY + "px";
}

function activeCursor(e) {
  const item = e.target;
  // for #logo and .burger
  if (
    item.id === "logo" ||
    item.classList.contains("burger") ||
    item.classList.contains("fa-home")
  ) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  // for .xplore
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseText.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseText.innerText = "";
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line-1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line-2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 0.4, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line-1", 0.8, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line-2", 0.8, { rotate: "-0", y: 0, background: "white" });
    gsap.to("#logo", 0.1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//Barba page transition             -------------------------------------------------------
const logo = document.querySelector("#logo");
const home = document.querySelector("#main-home");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        logo.href = "./index.html";
        home.href = "../index.html";
        animateSlides();
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        home.href = "../../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "hike",
      beforeEnter() {
        logo.href = "../index.html";
        home.href = "../../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
    {
      namespace: "mountain",
      beforeEnter() {
        logo.href = "../index.html";
        home.href = "../../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //an animation
        const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        timeline.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        timeline.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //when enter to a next page - scroll to the top
        window.scrollTo(0, 0);
        //an animation
        const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        timeline.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done },
          "-=0.2"
        );
        timeline.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        timeline.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1"
        );
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    const nextTitle = nextSlide.querySelector("h1");
    const nextNr = nextSlide.querySelector(".number");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    slideTl.fromTo(nextImg, { y: "100%" }, { y: "0%" });
    slideTl.fromTo(nextTitle, { x: "100%" }, { x: "0%" });
    slideTl.fromTo(nextTitle, { y: "-35%" }, { y: "0%" });
    slideTl.fromTo(nextNr, { x: "-100%" }, { x: "0%" });
    // scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addTo(controller);
  });
}

//Event listeners                   -------------------------------------------------------
window.addEventListener("mousemove", cursor);
window.addEventListener("mousemove", activeCursor);
burger.addEventListener("click", navToggle);

// Invoke functions
// animateSlides();
