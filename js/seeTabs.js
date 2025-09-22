import {
  changeSongsDisplayBtn,
  songsVisible,
  changeSongsDisplay,
} from "./iframe/songDisplay.js";
import {
  changeYtbDisplayBtn,
  ytbVisible,
  changeYtbDisplay,
} from "./iframe/ytbDisplay.js";
import {
  changeGuitarDisplayBtn,
  guitarFilterState,
  cycleGuitarFilter,
} from "./buttons/guitarFilter.js";
import { openPopup } from "./accessories/popup.js";
import { addDifficultyIcon } from "./accessories/defineDifficulty.js";

const container = document.getElementById("iframes-container");
const difficultySelect = document.getElementById("difficulty-select");
const artistSelect = document.getElementById("artist-select");

function createFigmaPlaceholder(tab) {
  const wrapper = document.createElement("div");
  wrapper.className = "figma-thumb-wrapper";

  // Thumbnail
  const img = document.createElement("img");
  img.src = "../assets/logo/figma-logo.svg";
  img.alt = "Tab preview";

  // Song name with difficulty icon
  const songName = document.createElement("div");
  songName.className = "song-name";
  const iconSpan = document.createElement("span");
  iconSpan.className = "difficulty-icon";
  iconSpan.textContent = addDifficultyIcon(tab.difficulty) + " - ";
  songName.appendChild(iconSpan);
  songName.appendChild(document.createTextNode(tab.song));

  // Artist
  const artist = document.createElement("div");
  artist.className = "artist-name";
  artist.textContent = tab.artist;

  wrapper.appendChild(img);
  wrapper.appendChild(songName);
  wrapper.appendChild(artist);

  // On click, replace with Figma iframe
  wrapper.addEventListener("click", function () {
    const tabIframe = document.createElement("iframe");
    tabIframe.classList.add("tab-iframe");
    tabIframe.height = 220;
    tabIframe.width = "100%";
    tabIframe.src = tab.src;
    tabIframe.allowFullscreen = true;
    tabIframe.loading = "lazy";
    wrapper.replaceWith(tabIframe);
  });

  return wrapper;
}

async function loadTabs() {
  const response = await fetch("../js/data/songsData.json");
  const tabsData = await response.json();

  // Populate artist dropdown
  const artists = [...new Set(tabsData.map((tab) => tab.artist))].sort();
  artists.forEach((artist) => {
    const option = document.createElement("option");
    option.value = artist;
    option.textContent = artist;
    artistSelect.appendChild(option);
  });

  function renderTabs() {
    const selectedDifficulty = difficultySelect.value;
    const selectedArtist = artistSelect.value;

    container.innerHTML = "";

    tabsData.forEach((tab) => {
      const matchesDifficulty =
        selectedDifficulty === "all" || tab.difficulty === selectedDifficulty;
      const matchesArtist =
        selectedArtist === "all" || tab.artist === selectedArtist;

      let matchesGuitar = true;
      if (guitarFilterState === 1) {
        matchesGuitar = tab.guitarType.includes("acoustic");
      } else if (guitarFilterState === 2) {
        matchesGuitar = tab.guitarType.includes("electric");
      }

      if (matchesDifficulty && matchesArtist && matchesGuitar) {
        const tabWrapper = document.createElement("div");
        tabWrapper.classList.add("tab-wrapper");

        if (tab.src) {
          // Show Figma placeholder instead of iframe
          const placeholder = createFigmaPlaceholder(tab);
          tabWrapper.appendChild(placeholder);
        }

        // Song iframe (Spotify play button)
        const songIframe = document.createElement("iframe");
        songIframe.classList.add("song-iframe");
        songIframe.src = tab.songPresentation;
        songIframe.allow =
          "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        songIframe.loading = "lazy";
        songIframe.style.display = songsVisible ? "block" : "none";

        // YouTube iframe
        const ytbIframe = document.createElement("iframe");
        ytbIframe.classList.add("ytb-iframe");
        ytbIframe.src = tab.ytbTutorial;
        ytbIframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        ytbIframe.allowFullscreen = true;
        ytbIframe.loading = "lazy";
        ytbIframe.style.display = ytbVisible ? "block" : "none";

        // Info button
        const infoBtn = document.createElement("button");
        infoBtn.classList.add("info-btn");
        infoBtn.textContent = "ℹ️";
        infoBtn.style.position = "absolute";
        infoBtn.style.top = "1.5rem";
        infoBtn.style.left = "0.5rem";
        tabWrapper.style.position = "relative";
        infoBtn.addEventListener("click", () => openPopup(tab));

        tabWrapper.appendChild(songIframe);
        tabWrapper.appendChild(ytbIframe);
        container.appendChild(tabWrapper);
        tabWrapper.appendChild(infoBtn);
      }
    });
  }

  renderTabs();

  // Event listeners
  difficultySelect.addEventListener("change", renderTabs);
  artistSelect.addEventListener("change", renderTabs);

  changeSongsDisplayBtn.addEventListener("click", () => {
    changeSongsDisplay();
  });

  changeYtbDisplayBtn.addEventListener("click", () => {
    changeYtbDisplay();
  });

  changeGuitarDisplayBtn.addEventListener("click", () => {
    cycleGuitarFilter();
    renderTabs();
  });
}

loadTabs();
