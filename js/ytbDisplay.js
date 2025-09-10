export const changeYtbDisplayBtn = document.getElementById("youtube-btn");

// Toggle display of song iframes
export let ytbVisible = false;
export function changeYtbDisplay() {
  const ytbIframes = document.getElementsByClassName("ytb-iframe");
  ytbVisible = !ytbVisible;
  for (let i = 0; i < ytbIframes.length; i++) {
    const iframe = ytbIframes[i];
    if (ytbVisible) {
      // Restore src from data-src
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
      iframe.style.display = "block";
    } else {
      // Store src in data-src and clear src to stop playback
      iframe.dataset.src = iframe.src;
      iframe.src = "";
      iframe.style.display = "none";
    }
  }

  // Change icon
  const iconImg = changeYtbDisplayBtn.querySelector('img');
  if (ytbVisible) {
    iconImg.src = "../assets/ytb-logo-2.svg";
    iconImg.alt = "shown ytb logo";
  } else {
    iconImg.src = "../assets/ytb-logo-1.svg";
    iconImg.alt = "hidden ytb logo";
  }
}
