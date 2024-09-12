const yearNow = document.querySelector(".year");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const btnHeader = document.querySelector(".header");
const allLinks = document.querySelectorAll("a:link");
const sectionHeroEl = document.querySelector(".section-hero");

//? Mobile Navigation
btnHeader.addEventListener("click", function () {
  btnHeader.classList.toggle("nav-open");
});

//? Set current year for the Copyright
const currentYear = new Date().getFullYear();
yearNow.textContent = currentYear;

//? Smooth scrolling
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");

    //? Scrolling back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //? Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //? Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      btnHeader.classList.add("nav-open");
    }
  });
});

//? Sticky navigation
const observerEl = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) document.body.classList.add("sticky");

    if (ent.isIntersecting === true) document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observerEl.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
//? Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//? https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
