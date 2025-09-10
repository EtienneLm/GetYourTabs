import { tabsData } from "./tabsData.js";
import {
  changeSongsDisplayBtn,
  songsVisible,
  changeSongsDisplay,
} from "./songDisplay.js";
import {
  changeYtbDisplayBtn,
  ytbVisible,
  changeYtbDisplay,
} from "./ytbDisplay.js";
import {
  changeGuitarDisplayBtn,
  guitarFilterState,
  cycleGuitarFilter,
} from "./guitarFilter.js";

const container = document.getElementById("iframes-container");
const difficultySelect = document.getElementById("difficulty-select");
const artistSelect = document.getElementById("artist-select");

const artists = [...new Set(tabsData.map((tab) => tab.artist))].sort();
artists.forEach((artist) => {
  const option = document.createElement("option");
  option.value = artist;
  option.textContent = artist;
  artistSelect.appendChild(option);
});

function createFigmaPlaceholder(tab) {
  const wrapper = document.createElement("div");
  wrapper.className = "figma-thumb-wrapper";

  // Thumbnail
  const img = document.createElement("img");
  img.src = "./assets/figma-logo.svg";
  img.alt = "Tab preview";

  // Song name
  const songName = document.createElement("div");
  songName.className = "song-name";
  songName.textContent = tab.song;

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
    // tabIframe.style.border = "none";
    wrapper.replaceWith(tabIframe);
  });
  return wrapper;
}

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

      tabWrapper.appendChild(songIframe);
      tabWrapper.appendChild(ytbIframe);
      container.appendChild(tabWrapper);
    }
  });
}

renderTabs();

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