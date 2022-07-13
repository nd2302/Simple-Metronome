import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const tempoSlider = document.querySelector('.slider');
const decTempoBtn = document.querySelector('.dec');
const incTempoBtn = document.querySelector('.inc');
const subBeatBtn = document.querySelector('.subtract-beats');
const addBeatBtn = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
const startButton = document.querySelector('.start-stop');

const click2 = new Audio('click1.mp3');
const click1 = new Audio('click2.mp3');

let bpm = 100;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';

decTempoBtn.addEventListener('click', () => {
    if (bpm <= 0) { return };
    bpm--;
    validateTempo();
    updateMetronome();
});
incTempoBtn.addEventListener('click', () => {
    if (bpm >= 300) { return };
    bpm++;
    validateTempo();
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

subBeatBtn.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeatBtn.addEventListener('click', () => {
    if (beatsPerMeasure >= 18) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

/* function Start(){
    console.log("Started");
    mixBut.removeEventListener("click", Start);
    mixBut.addEventListener("click", Stop);
    mixBut.value = "Stop";
}

function Stop(){
    console.log("Stopped");
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", Start);
    mixBut.value = "Start";
} */

startButton.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        startButton.click();
    }
    if (event.code === "ArrowLeft") {
        decTempoBtn.click();
    }
    if (event.code === "ArrowRight") {
        incTempoBtn.click();
    }
});

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    if(bpm < 20){ tempoTextString = "Larghissimo"} 
    if(bpm > 20 && bpm <40){ tempoTextString = "Grave"}
    if(bpm > 40 && bpm <60){ tempoTextString = "Largo"}
    if(bpm > 60 && bpm <66){ tempoTextString = "Larghetto"}
    if(bpm > 66 && bpm <76){ tempoTextString = "Adagio"}
    if(bpm > 76 && bpm <108){ tempoTextString = "Andante"}
    if(bpm > 108 && bpm <120){ tempoTextString = "Moderato"}
    if(bpm > 120 && bpm <168){ tempoTextString = "Allegro"}
    if(bpm > 168 && bpm <176){ tempoTextString = "Vivace"}
    if(bpm > 176 && bpm <200){ tempoTextString = "Presto"}
    if(bpm > 200){ tempoTextString = "Prestissimo"}

    tempoText.textContent = tempoTextString;
}
function validateTempo() {
    if (bpm <= 0) { return };
    if (bpm >= 300) { return };
}

function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });
