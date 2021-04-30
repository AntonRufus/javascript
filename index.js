let text = document.getElementById("text");
let clouds = document.getElementById("clouds");
let sun = document.getElementById("sun");
let bird1 = document.getElementById("bird1");
let bird2 = document.getElementById("bird2");
let btn = document.getElementById("btn");
let rocks = document.getElementById("rocks");
let water = document.getElementById("water");
let forest = document.getElementById("forest");
let fish = document.getElementById("fish");

let header = document.getElementById("header");

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  text.style.top = 18.5 + value * -0.3 + "%";
  sun.style.top = value * -0.5 + "px";
  sun.style.left = value * 2 + "px";
  clouds.style.top = value * -0.5 + "px";
  clouds.style.left = value * -5 + "px";
  bird1.style.top = value * -1.5 + "px";
  bird1.style.left = value * 2 + "px";
  bird2.style.top = value * -1.5 + "px";
  bird2.style.left = value * -2 + "px";
  btn.style.marginTop = value * 1.5 + "px";
  rocks.style.top = value * -0.12 + "px";
  forest.style.top = value * 0.25 + "px";
  water.style.top = value * 0.005 + "px";
  fish.style.left = value * 6 + "px";
});
