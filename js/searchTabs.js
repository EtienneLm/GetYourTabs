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
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-btn");

function displayTabs(query) {
  container.innerHTML = "";

  if (!query && guitarFilterState === 0) return; 

  const filteredTabs = tabsData.filter((tab) => {
    const matchesQuery =
      !query ||
      tab.song.toLowerCase().includes(query) ||
      tab.artist.toLowerCase().includes(query) ||
      tab.difficulty.toLowerCase().includes(query);

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
