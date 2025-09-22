const basePath = window.location.pathname.includes("/pages/") ? ".." : ".";
export const changeGuitarDisplayBtn = document.getElementById("guitar-type-btn");

export let guitarFilterState = 0;

export function cycleGuitarFilter() {
  guitarFilterState = (guitarFilterState + 1) % 3;

  const iconImg = changeGuitarDisplayBtn.querySelector("img");

  if (guitarFilterState === 1) {
    iconImg.src = `${basePath}/assets/icons/guitar-icon-2.svg`;
    iconImg.alt = "acoustic guitar icon";
  } else if (guitarFilterState === 2) {
    iconImg.src = `${basePath}/assets/icons/electric-guitar-icon-2.svg`;
    iconImg.alt = "electric guitar icon";
  } else {
    iconImg.src = `${basePath}/assets/icons/guitar-icon-1.svg`;
    iconImg.alt = "guitar icon";
  }
}
