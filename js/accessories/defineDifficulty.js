const difficultyIcon = ["🎵", "🎶", "🎸", "🤘"];
export function addDifficultyIcon(difficulty) {
  if (difficulty === "easy") return difficultyIcon[0];
  if (difficulty === "medium") return difficultyIcon[1];
  if (difficulty === "hard") return difficultyIcon[2];
  if (difficulty === "pro") return difficultyIcon[3];
  return "";
}

// import { addDifficultyIcon } from "./accessories/defineDifficulty.js";