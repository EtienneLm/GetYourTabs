export const changeYtbDisplayBtn = document.getElementById("youtube-btn");

export let ytbVisible = false;
export function changeYtbDisplay() {
  const ytbIframes = document.getElementsByClassName("ytb-iframe");
  ytbVisible = !ytbVisible;
  for (let i = 0; i < ytbIframes.length; i++) {
    const iframe = ytbIframes[i];
    if (ytbVisible) {
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
      iframe.style.display = "block";
    } else {
      iframe.dataset.src = iframe.src;
      iframe.src = "";
      iframe.style.display = "none";
    }
  }

  const iconImg = changeYtbDisplayBtn.querySelector('img');
  if (ytbVisible) {
    iconImg.src = "/GetYourTabs/assets/ytb-logo-2.svg";
    iconImg.alt = "shown ytb logo";
  } else {
    iconImg.src = "/GetYourTabs/assets/ytb-logo-1.svg";
    iconImg.alt = "hidden ytb logo";
  }
}
