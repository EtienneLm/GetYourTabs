import { tabsData } from "./tabsData.js";

const artistsContainer = document.getElementById("artists-container");

// Get unique artists
const uniqueArtists = [];
const seen = new Set();

tabsData.forEach((tab) => {
  if (!seen.has(tab.artist)) {
    seen.add(tab.artist);
    uniqueArtists.push({
      artist: tab.artist,
      artistPres: tab.artistPresentation,
    });
  }
});

// Generate Spotify iframes
uniqueArtists.forEach(({ artist, artistPres }) => {
  const div = document.createElement("div");
  div.classList.add("artist-card");

  const title = document.createElement("h3");
  title.textContent = artist;

  const iframe = document.createElement("iframe");
  iframe.classList.add("artist-iframe"); 
  iframe.style.borderRadius = "12px";
  iframe.src = artistPres;
  iframe.width = "100%";
  iframe.height = "152";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";

  div.appendChild(title);
  div.appendChild(iframe);
  artistsContainer.appendChild(div);
});
