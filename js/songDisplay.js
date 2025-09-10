export const changeSongsDisplayBtn = document.getElementById(
  "change-songs-display-btn"
);


export let songsVisible = false;
export function changeSongsDisplay() {
  const songIframes = document.getElementsByClassName("song-iframe");
  songsVisible = !songsVisible;
  for (let i = 0; i < songIframes.length; i++) {
    const iframe = songIframes[i];
    if (songsVisible) {
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
  const iconImg = changeSongsDisplayBtn.querySelector("img");
  if (songsVisible) {
    iconImg.src = "../assets/song-icon-2.svg";
    iconImg.alt = "shown songs icon";
  } else {
    iconImg.src = "../assets/song-icon-1.svg";
    iconImg.alt = "hidden songs icon";
  }
}
