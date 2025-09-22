export function displayAlbum(albumUrl) {
  const iframe = document.createElement("iframe");
  iframe.src = albumUrl;
  iframe.width = "100%";
  iframe.height = "152";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  iframe.className = "album-iframe";
  return iframe;
}
