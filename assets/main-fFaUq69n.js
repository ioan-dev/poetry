(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function BurgerMenu() {
  let burger = document.querySelector(".header__burger");
  let close = document.querySelector(".burger-menu__close");
  let menu = document.querySelector(".burger-menu");
  burger.addEventListener("click", () => {
    menu.classList.toggle("burger-menu--open");
  });
  close.addEventListener("click", () => {
    menu.classList.toggle("burger-menu--open");
  });
}
function ReleasesTabs() {
  const tabsContainer = document.querySelector("[data-tabs]");
  if (!tabsContainer) return;
  const buttons = tabsContainer.querySelectorAll(".releases__btn");
  const lists = tabsContainer.querySelectorAll(".releases__list");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-tab"));
      buttons.forEach((btn) => btn.classList.remove("releases__btn--active"));
      lists.forEach((list) => list.classList.remove("releases__list--active"));
      button.classList.add("releases__btn--active");
      lists[index].classList.add("releases__list--active");
    });
  });
}
function More() {
  document.querySelectorAll(".toggleButton").forEach((button) => {
    button.addEventListener("click", function() {
      const wrapper = this.previousElementSibling;
      const isOpen = wrapper.classList.contains("open");
      if (isOpen) {
        wrapper.style.height = wrapper.scrollHeight + "px";
        void wrapper.offsetWidth;
        wrapper.style.height = "0px";
        wrapper.classList.remove("open");
        this.textContent = "подробнее";
      } else {
        wrapper.classList.add("open");
        wrapper.style.height = wrapper.scrollHeight + "px";
        this.textContent = "свернуть";
      }
    });
    button.previousElementSibling.addEventListener("transitionend", function() {
      if (this.classList.contains("open")) {
        this.style.height = "auto";
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  new BurgerMenu();
  new ReleasesTabs();
  new More();
});
