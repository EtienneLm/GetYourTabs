function initDarkMode() {
  const switcher = document.querySelector("#dark-theme-switcher input");

  if (!switcher) return;

  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    switcher.checked = true;
  }

  switcher.addEventListener("change", () => {
    if (switcher.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#dark-theme-switcher input")) {
    initDarkMode();
  } else {
    document.addEventListener("footerLoaded", initDarkMode);
  }
});
