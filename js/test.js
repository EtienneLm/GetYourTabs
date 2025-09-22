// js/buttons/pickRandomSong.js

async function pickRandomSong() {
  try {
    const response = await fetch("../js/data/songsData.json");
    const songs = await response.json();

    if (!songs.length) return;

    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    const iframe = document.querySelector(".blindtest-content .song-iframe");
    if (iframe && randomSong.songPresentation) {
      iframe.src = randomSong.songPresentation;
    }
  } catch (error) {
    console.error("Error loading songs data:", error);
  }
}

// attach to button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".pick-a-song");
  if (btn) {
    btn.addEventListener("click", pickRandomSong);
  }
});
