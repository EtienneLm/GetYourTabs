import { displayChord, supportedChords } from "../accessories/displayChord.js";
import { displayAlbum } from "../accessories/displayAlbum.js";
import { setBpmAndStart } from "../buttons/metronome.js";

async function loadPopup() {
  const placeholder = document.getElementById("popup-placeholder");
  if (!placeholder) return;

  const response = await fetch("./accessories/popup.html");
  const html = await response.text();
  placeholder.innerHTML = html;

  attachPopupEvents();
}

function attachPopupEvents() {
  const popup = document.getElementById("song-popup");
  const closeBtn = document.getElementById("popup-close");

  closeBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });
}

function hasCapo(capo) {
  return capo == 0 ? "no" : "fret " + capo;
}

function strummingPattern(strummingPattern) {
  return strummingPattern == "no" ? "no" : strummingPattern;
}

function difficultyColor(difficulty) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "#98d990";
    case "medium":
      return "#ffbe80";
    case "hard":
      return "#ff8f8f";
    case "pro":
      return "#f1a2ff";
    default:
      return "inherit";
  }
}

export function openPopup(tab) {
  document.getElementById("popup-title").textContent = tab.song || "N/A";
  document.getElementById("popup-capo").textContent = hasCapo(tab.capo);
  document.getElementById("popup-strumming").textContent = strummingPattern(
    tab.strummingPattern
  );
  document.getElementById("popup-bpm").textContent = tab.bpm || "N/A";

  const artistEl = document.getElementById("popup-artist");
  const albumEl = document.getElementById("popup-album");
  const bpmEl = document.getElementById("popup-bpm");

  const albumContainer = document.getElementById("album-iframe-container");
  const artistContainer = document.getElementById("artist-iframe-container");
  const chordImageContainer = document.getElementById("chord-image-container");

  albumContainer.innerHTML = "";
  artistContainer.innerHTML = "";
  chordImageContainer.innerHTML = "";

  const difficultyEl = document.getElementById("popup-difficulty");
  difficultyEl.textContent = tab.difficulty || "N/A";
  difficultyEl.style.color = difficultyColor(tab.difficulty || "");

  // --- Artist ---
  if (tab.artistPresentation) {
    artistEl.classList.add("artist-link");

    const newArtistEl = artistEl.cloneNode(true);
    artistEl.parentNode.replaceChild(newArtistEl, artistEl);

    newArtistEl.textContent = tab.artist || "N/A";

    newArtistEl.addEventListener("click", () => {
      const currentIframe = artistContainer.querySelector("iframe");

      if (currentIframe) {
        artistContainer.innerHTML = "";
      } else {
        albumContainer.innerHTML = "";
        chordImageContainer.innerHTML = "";
        artistContainer.innerHTML = "";
        artistContainer.appendChild(displayAlbum(tab.artistPresentation));
      }
    });
  } else {
    artistEl.classList.remove("artist-link");
  }

  // --- Album ---
  if (tab.album[1]) {
    albumEl.classList.add("album-link");

    const newAlbumEl = albumEl.cloneNode(true);
    albumEl.parentNode.replaceChild(newAlbumEl, albumEl);

    newAlbumEl.textContent = tab.album[0] || "N/A";

    newAlbumEl.addEventListener("click", () => {
      const currentIframe = albumContainer.querySelector("iframe");

      if (currentIframe) {
        albumContainer.innerHTML = "";
      } else {
        artistContainer.innerHTML = "";
        chordImageContainer.innerHTML = "";
        albumContainer.innerHTML = "";
        albumContainer.appendChild(displayAlbum(tab.album[1]));
      }
    });
  } else {
    albumEl.classList.remove("album-link");
  }

  // --- Chords ---
  const chordsContainer = document.getElementById("popup-chords");
  chordsContainer.innerHTML = "";

  if (tab.chords && tab.chords.length > 0) {
    tab.chords.forEach((chord, index) => {
      if (index > 0) chordsContainer.append(" ");

      if (supportedChords.includes(chord)) {
        const chordLink = document.createElement("span");
        chordLink.textContent = chord;
        chordLink.className = "chord-link";

        chordLink.addEventListener("click", () => {
          const currentImg = chordImageContainer.querySelector("img");

          if (currentImg && currentImg.dataset.chord === chord) {
            chordImageContainer.innerHTML = "";
          } else {
            albumContainer.innerHTML = "";
            artistContainer.innerHTML = "";
            chordImageContainer.innerHTML = "";
            const img = displayChord(chord);
            img.dataset.chord = chord;
            chordImageContainer.appendChild(img);
          }
        });

        chordsContainer.appendChild(chordLink);
      } else {
        const plainChord = document.createElement("span");
        plainChord.textContent = chord;
        chordsContainer.appendChild(plainChord);
      }
    });
  } else {
    chordsContainer.textContent = "coming soon...";
  }

  // --- BPM click to set metronome ---
  if (tab.bpm) {
    bpmEl.textContent = tab.bpm;
    bpmEl.classList.add("bpm-link");

    const newBpmEl = bpmEl.cloneNode(true);
    bpmEl.parentNode.replaceChild(newBpmEl, bpmEl);

    newBpmEl.addEventListener("click", () => {
      setBpmAndStart(parseInt(tab.bpm, 10));
    });
  } else {
    bpmEl.textContent = "N/A";
    bpmEl.classList.remove("bpm-link");
  }

  document.getElementById("song-popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("song-popup").classList.add("hidden");
}

loadPopup();
