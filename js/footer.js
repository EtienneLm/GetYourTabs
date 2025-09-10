document.addEventListener("DOMContentLoaded", () => {
fetch("/GetYourTabs/pages/accessories/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
      document.dispatchEvent(new Event("footerLoaded"));
    })
    .catch(error => console.error("Error loading footer:", error));
});
