let bpm = 100; // default BPM
let intervalId;
let state = 0; // 0 = off, 1 = metronome, 2 = drum

const searchBlock = document.querySelector('.search-block');
const metronomeBtn = document.getElementById("metronome-btn");

const metronomeAudio = new Audio("../assets/audio/metronome-click.mp3");
const drumAudio = new Audio("../assets/audio/drum.mp3");

// BPM control
const bpmControl = document.createElement("div");
bpmControl.id = "bpm-control";
bpmControl.style.display = "none";
bpmControl.innerHTML = `
  <label for="bpm-slider">BPM: <span id="bpm-value">${bpm}</span></label>
  <input type="range" id="bpm-slider" min="40" max="240" value="${bpm}">
`;
searchBlock.appendChild(bpmControl);

const bpmSlider = document.getElementById("bpm-slider");
const bpmValue = document.getElementById("bpm-value");

bpmSlider.addEventListener("input", () => {
  bpm = parseInt(bpmSlider.value, 10);
  bpmValue.textContent = bpm;
  if (state === 1 || state === 2) {
    stopInterval();
    startInterval();
  }
});

function startInterval() {
  const interval = (60 / bpm) * 1000;
  const audio = state === 1 ? metronomeAudio : drumAudio;

  intervalId = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
  }, interval);
}

function stopInterval() {
  clearInterval(intervalId);
}

metronomeBtn.addEventListener("click", () => {
  state = (state + 1) % 3;

  switch (state) {
    case 0: // off
      stopInterval();
      bpmControl.style.display = "none";
      metronomeBtn.querySelector("img").src = "../assets/icons/metronome-1.svg";
      if (searchBlock) searchBlock.classList.remove('bpm-active');
      break;
    case 1: // metronome click
      stopInterval();
      startInterval();
      bpmControl.style.display = "block";
      metronomeBtn.querySelector("img").src = "../assets/icons/metronome-2.svg";
      if (searchBlock) searchBlock.classList.add('bpm-active');
      break;
    case 2: // drum loop
      stopInterval();
      startInterval();
      bpmControl.style.display = "block";
      metronomeBtn.querySelector("img").src = "../assets/icons/drum.svg";
      if (searchBlock) searchBlock.classList.add('bpm-active');
      break;
  }
});


export function setBpmAndStart(newBpm) {
  bpm = newBpm;
  bpmSlider.value = newBpm;
  bpmValue.textContent = newBpm;

  stopInterval();

  if (state === 0) {
    state = 1;
    bpmControl.style.display = "block";
    metronomeBtn.querySelector("img").src = "../assets/icons/metronome-2.svg";
    if (searchBlock) searchBlock.classList.add("bpm-active");
  }

  startInterval();
}