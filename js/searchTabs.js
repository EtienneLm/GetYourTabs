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

const container = document.getElementById("iframes-container");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-btn");

async function loadTabs() {
  const response = await fetch("../js/data/songsData.json");
  const tabsData = await response.json();

  function displayTabs(query) {
    container.innerHTML = "";

    if (!query && guitarFilterState === 0) return;

    const filteredTabs = tabsData.filter((tab) => {
      const matchesQuery =
        !query ||
        tab.song.toLowerCase().includes(query) ||
        tab.artist.toLowerCase().includes(query) ||
        tab.difficulty.toLowerCase().includes(query) ||
        tab.genre.some((g) => g.toLowerCase().includes(query)) ||
        tab.guitarType.some((g) => g.toLowerCase().includes(query)) ||
        tab.album[0].toLowerCase().includes(query);

      let matchesGuitar = true;
      if (guitarFilterState === 1) {
        matchesGuitar = tab.guitarType.includes("acoustic");
      } else if (guitarFilterState === 2) {
        matchesGuitar = tab.guitarType.includes("electric");
      }

      return matchesQuery && matchesGuitar;
    });

    filteredTabs.forEach((tab) => {
      const tabWrapper = document.createElement("div");
      tabWrapper.classList.add("tab-wrapper");

      // Tab iframe
      const tabIframe = document.createElement("iframe");
      tabIframe.classList.add("tab-iframe");
      tabIframe.src = tab.src;
      tabIframe.allowFullscreen = true;
      tabIframe.loading = "lazy";

      // song Spotify iframe
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

      tabWrapper.appendChild(tabIframe);
      tabWrapper.appendChild(songIframe);
      tabWrapper.appendChild(ytbIframe);
      container.appendChild(tabWrapper);
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      displayTabs(query);
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      displayTabs("");
    });
  }

  // Songs / YouTube
  changeSongsDisplayBtn.addEventListener("click", () => {
    changeSongsDisplay();
  });
  changeYtbDisplayBtn.addEventListener("click", () => {
    changeYtbDisplay();
  });

  // Guitar filter
  if (changeGuitarDisplayBtn) {
    changeGuitarDisplayBtn.addEventListener("click", () => {
      cycleGuitarFilter();
      const query = searchInput.value.toLowerCase();
      displayTabs(query);
    });
  }
}

loadTabs();
