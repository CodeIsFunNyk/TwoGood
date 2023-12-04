//Declaring variables
var videocon = document.querySelector("#video-container");
var play = document.querySelector("#play");
var overlay = document.querySelector("#overlay");
var item = document.querySelectorAll(".item-container");
var cursor = document.querySelector("#page2 #cursor");
var page2 = document.querySelector("#page2");
var menu = document.querySelector(".ri-menu-line");
var dropNav = document.querySelector("#dropNav");
var nav = document.querySelector("#nav");
//DropDown Menu Animation
function dropDownMenu() {
  let flag = 0;
  menu.addEventListener("click", function () {
    if (flag == 0) {
      gsap.to("#dropNav", {
        transform: "translateY(0)",
        duration: 0.8,
        transformOrigin: "top right",
        opacity: 1,
      });
      flag++;
    } else {
      gsap.to("#dropNav", {
        transform: "translateY(-100%)",
        duration: 0.7,
      });
      flag--;
    }
  });
}
dropDownMenu();
//changing colors of dropdown menu
function dropDownColorChange() {
  menu.onclick = function () {
    dropNav.classList.toggle("active");
    nav.classList.toggle("active");
  };
}
dropDownColorChange();

//GSAP ScrollTrigger and Locomotive JS code snippet.
function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

//Play cursor animation.
function animated() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#play", {
      top: dets.y,
      left: dets.x,
    });
    gsap.to("#cursor", {
      top: dets.y,
      left: dets.x,
    });
  });
  videocon.addEventListener("mouseleave", (dets) => {
    gsap.to("#play", {
      opacity: 0,
      scale: 0,
    });
  });
  videocon.addEventListener("mouseover", (dets) => {
    gsap.to("#play", {
      transform: "translate(-50%,-50%) scale(1)",
      opacity: 1,
    });
  });
}
animated();
//Animating pink cursor of each element.
function animatedCursor() {
  item.forEach(function (elem) {
    elem.addEventListener("mouseover", () => {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
        opacity: 1,
      });
      elem.addEventListener("mouseleave", () => {
        gsap.to("#cursor", {
          transform: "translate(-50%,-50%) scale(0)",
          opacity: 0,
        });
      });
    });
  });
}
animatedCursor();
//Animating navbar links
function linkAnimation() {
  gsap.to("#navpart2 .links", {
    scrollTrigger: {
      trigger: "#navpart2 .links",
      scroller: "#main",
      scrub: 1,
      // markers: true,
      start: "top -1%",
    },
    y: -100,
    opacity: 0,
  });
}
linkAnimation();

//Animating twoGood logo
function twoGoodAnimation() {
  gsap.to("#navpart1 #twoGood svg", {
    scrollTrigger: {
      trigger: "#twoGood svg",
      scroller: "#main",
      // markers: true,
      scrub: 0.7,
      start: "top -1%",
    },
    transform: "translateY(-150%)",
  });

  gsap.from("#navpart1 #twoGood svg", {
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      // markers: true,
      scrub: 0.7,
      start: "top 30%",
      end: "top 25%",
    },
    transform: "translateY(-155%)",
  });
}
twoGoodAnimation();

//Animating headers for website.
function heroHeaderAnimation() {
  gsap.to("#hero #change, #hero #course", {
    transform: "translateY(0%)",
    duration: 0.5,
    opacity: 1,
    stagger: 0.5,
  });
}
heroHeaderAnimation();
