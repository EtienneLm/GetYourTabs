export const changeGuitarDisplayBtn = document.getElementById("guitar-type-btn");

export let guitarFilterState = 0;

export function cycleGuitarFilter() {
  guitarFilterState = (guitarFilterState + 1) % 3;

  const iconImg = changeGuitarDisplayBtn.querySelector("img");

  if (guitarFilterState === 1) {
    iconImg.src = "./assets/guitar-icon-2.svg";
    iconImg.alt = "acoustic guitar icon";
  } else if (guitarFilterState === 2) {
    iconImg.src = "./assets/electric-guitar-icon-2.svg";
    iconImg.alt = "electric guitar icon";
  } else {
    iconImg.src = "./assets/guitar-icon-1.svg";
    iconImg.alt = "guitar icon";
  }
}
