document.addEventListener("DOMContentLoaded", () => {
  const basePath = window.location.pathname.includes("/pages/") ? ".." : ".";

  // Load header
  fetch(`${basePath}/pages/accessories/header.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(error => console.error("Error loading header:", error));
});
