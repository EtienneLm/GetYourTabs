document.addEventListener("DOMContentLoaded", () => {
  fetch("/GetYourTabs/pages/accessories/scroll-top-btn.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("scroll-top-placeholder").innerHTML = data;

      const scrollBtn = document.getElementById("scroll-top-btn");

      if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", () => {
          if (window.scrollY > 200) {
            scrollBtn.classList.add("show");
          } else {
            scrollBtn.classList.remove("show");
          }
        });
      }
    })
    .catch(error => console.error("Error loading button:", error));
});
