// script.js

const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const toast = document.getElementById("toast");

let currentLanguage = localStorage.getItem("language") || "hu";
let currentTheme = localStorage.getItem("theme") || "dark";


/* =========================
   DARK / LIGHT MODE
========================= */

function setTheme(theme) {

  currentTheme = theme;

  document.body.classList.toggle(
    "light",
    theme === "light"
  );

  themeToggle.textContent =
    theme === "dark" ? "☀" : "☾";

  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {

  setTheme(
    currentTheme === "dark"
      ? "light"
      : "dark"
  );

});


/* =========================
   LANGUAGE SWITCH
========================= */

function setLanguage(language) {

  currentLanguage = language;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-hu][data-en]").forEach(element => {

    if (element.tagName === "INPUT") {
      element.placeholder =
        element.dataset[language];
    }

    else {
      element.innerHTML =
        element.dataset[language];
    }

  });


  languageToggle.textContent =
    language === "hu" ? "EN" : "HU";

  localStorage.setItem(
    "language",
    language
  );
}


languageToggle.addEventListener("click", () => {

  setLanguage(
    currentLanguage === "hu"
      ? "en"
      : "hu"
  );

});


/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("open");

});


document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});


/* =========================
   PLACEHOLDER LINKS
========================= */

document.querySelectorAll(".placeholder-link").forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const message =
      currentLanguage === "hu"
        ? link.dataset.placeholderHu
        : link.dataset.placeholderEn;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

  });

});


/* =========================
   YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================
   INITIAL SETTINGS
========================= */

setTheme(currentTheme);
setLanguage(currentLanguage);