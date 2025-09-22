let audioContext, analyser, dataArray, source;
let isRunning = false;
let animationId;

const startButton = document.getElementById("startbtn");
const startButtonImg = startButton.querySelector("img");

startButton.addEventListener("click", toggleTuner);

async function toggleTuner() {
  if (!isRunning) {
    // Start tuner
    isRunning = true;
    startButtonImg.src = "../assets/icons/tuner-2.svg";

    audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    dataArray = new Float32Array(analyser.fftSize);
    detectPitch();
  } else {
    // Stop tuner
    isRunning = false;
    startButtonImg.src = "../assets/icons/tuner-1.svg"; 

    if (animationId) cancelAnimationFrame(animationId);
    if (source && source.mediaStream) {
      source.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) audioContext.close();

    document.getElementById("note").innerText = "Note: --";
    document.getElementById("freq").innerText = "Frequency: -- Hz";
    document.getElementById("needle").style.transform = "rotate(0deg)";
  }
}

function detectPitch() {
  analyser.getFloatTimeDomainData(dataArray);
  let frequency = autoCorrelate(dataArray, audioContext.sampleRate);

  if (frequency !== -1) {
    const noteInfo = frequencyToNote(frequency);
    document.getElementById("note").innerText = `Note: ${noteInfo.note}${noteInfo.octave}`;
    document.getElementById("freq").innerText = `Frequency: ${frequency.toFixed(2)} Hz`;

    const detune = noteInfo.cents;
    const rotation = Math.max(-50, Math.min(50, detune));
    document.getElementById("needle").style.transform = `rotate(${rotation}deg)`;
  } else {
    resetDisplay();
  }

  animationId = requestAnimationFrame(detectPitch);
}

function resetDisplay() {
    document.getElementById("note").innerText = "Note: --";
    document.getElementById("freq").innerText = "Frequency: -- Hz";
    document.getElementById("needle").style.transform = "rotate(0deg)";
}

/* Autocorrelation algorithm to estimate pitch */
function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    let val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1, thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  let c = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i++)
    for (let j = 0; j < SIZE - i; j++)
      c[i] = c[i] + buffer[j] * buffer[j + i];

  let d = 0; while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
  }
  if (maxpos === -1) return -1;

  return sampleRate / maxpos;
}

/* Convert frequency (Hz) → musical note */
function frequencyToNote(freq) {
  const A4 = 440;
  const noteNames = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

  let n = 12 * (Math.log(freq / A4) / Math.log(2)) + 69;
  let noteIndex = Math.round(n) % 12;
  let octave = Math.floor((Math.round(n) / 12) - 1);
  let cents = (n - Math.round(n)) * 100;

  return {
    note: noteNames[noteIndex],
    octave: octave,
    cents: cents
  };
}

