document.addEventListener("DOMContentLoaded", () => {
  const basePath = window.location.pathname.includes("/pages/") ? ".." : ".";

  // Load header
  fetch(`${basePath}/pages/accessories/header.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => console.error("Error loading header:", error));

  // Load footer
  fetch(`${basePath}/pages/accessories/footer.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
      document.dispatchEvent(new Event("footerLoaded"));
    })
    .catch(error => console.error("Error loading footer:", error));
});
