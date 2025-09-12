let isPlaying = false;
let bpm = 100; // default tempo
let intervalId;
const audio = new Audio("/GetYourTabs/assets/metronome-click.mp3");

const metronomeBtn = document.getElementById("metronome-btn");

const bpmControl = document.createElement("div");
bpmControl.id = "bpm-control";
bpmControl.style.display = "none";
bpmControl.style.marginTop = "0.5rem";
bpmControl.innerHTML = `
  <label for="bpm-slider">BPM: <span id="bpm-value">${bpm}</span></label>
  <input type="range" id="bpm-slider" min="40" max="240" value="${bpm}">
`;

document.querySelector(".search-block").appendChild(bpmControl);

const bpmSlider = document.getElementById("bpm-slider");
const bpmValue = document.getElementById("bpm-value");

bpmSlider.addEventListener("input", () => {
  bpm = parseInt(bpmSlider.value, 10);
  bpmValue.textContent = bpm;
  if (isPlaying) {
    clearInterval(intervalId);
    startMetronome();
  }
});

function startMetronome() {
  const interval = (60 / bpm) * 1000;
  intervalId = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
  }, interval);
}

function stopMetronome() {
  clearInterval(intervalId);
}

if (metronomeBtn) {
  metronomeBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      startMetronome();
      bpmControl.style.display = "block";
      metronomeBtn.querySelector("img").src = "/GetYourTabs/assets/metronome-2.png"; // on
    } else {
      stopMetronome();
      bpmControl.style.display = "none";
      metronomeBtn.querySelector("img").src = "/GetYourTabs/assets/metronome-1.png"; // off
    }
  });
}

