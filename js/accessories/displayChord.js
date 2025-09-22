export function displayChord(chord) {
  const chordImg = document.createElement("img");
  chordImg.className = "chord-image";

  let fileName;
  if (chord === "G") {
    fileName = "g-chord.svg";
  } else if (chord === "D") {
    fileName = "d-chord.svg";
  } else if (chord === "C") {
    fileName = "c-chord.svg";
  } else if (chord === "A") {
    fileName = "a-chord.svg";
  } else {
    fileName = `${chord}.svg`;
  }

  chordImg.src = `../assets/chords/${fileName}`;
  return chordImg;
}

export const supportedChords = ["G", "D", "C", "A"];

