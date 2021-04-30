class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");

    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnarek = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.currentClap = "./sounds/clap-tape.wav";
    this.currentCowbell = "./sounds/cowbell-808.wav";
    this.currentCrash = "./sounds/crash-tape.wav";
    this.currentCrash = "./sounds/openhat-tight.wav";
    this.currentPerc = "./sounds/perc-tambo.wav";
    this.currentRide = "./sounds/ride-acoustic01.wav";
    this.currentShaker = "./sounds/shaker-suckup.wav";
    this.currentTom = "./sounds/tom-rototom.wav";

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.cowbellAudio = document.querySelector(".cowbell-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.percAudio = document.querySelector(".perc-sound");
    this.rideAudio = document.querySelector(".ride-sound");
    this.shakerAudio = document.querySelector(".shaker-sound");
    this.tomAudio = document.querySelector(".tom-sound");

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  // toggle the class
  activePad() {
    this.classList.toggle("active");
  }
  // the functionality
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if pads are active
      if (bar.classList.contains("active")) {
        // check each sound
        // kick
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        // snare
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        // hihat
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        // clap
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        // cowbell
        if (bar.classList.contains("cowbell-pad")) {
          this.cowbellAudio.currentTime = 0;
          this.cowbellAudio.play();
        }
        // crash
        if (bar.classList.contains("crash-pad")) {
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }
        // openhat
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        // percussion
        if (bar.classList.contains("perc-pad")) {
          this.percAudio.currentTime = 0;
          this.percAudio.play();
        }
        // ride
        if (bar.classList.contains("ride-pad")) {
          this.rideAudio.currentTime = 0;
          this.rideAudio.play();
        }
        // shaker
        if (bar.classList.contains("shaker-pad")) {
          this.shakerAudio.currentTime = 0;
          this.shakerAudio.play();
        }
        // tom
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
      }
    });
    this.index++;
  }
  // start to play
  start() {
    const interval = (60 / this.bpm) * 1000;
    // chech if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // clear th interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  // the play button toggle
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  // change the sound
  chandeSound(e) {
    // pick the name of selection
    const selectionName = e.target.name;
    // pick the value of selection
    const selectionValue = e.target.value;
    // switch statement
    switch (selectionName) {
      case "kick-select":
        console.log(selectionValue);
        this.kickAudio.src = selectionValue;
        console.log(selectionValue);
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
      case "cowbell-select":
        this.cowbellAudio.src = selectionValue;
        break;
      case "crash-select":
        this.crashAudio.src = selectionValue;
        break;
      case "openhat-select":
        this.openhatAudio.src = selectionValue;
        break;
      case "perc-select":
        this.percAudio.src = selectionValue;
        break;
      case "ride-select":
        this.rideAudio.src = selectionValue;
        break;
      case "shaker-select":
        this.shakerAudio.src = selectionValue;
        break;
      case "tom-select":
        this.tomAudio.src = selectionValue;
        break;

      default:
        break;
    }
  }
  // mute the sound
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "4":
          this.cowbellAudio.volume = 0;
          break;
        case "5":
          this.crashAudio.volume = 0;
          break;
        case "6":
          this.openhatAudio.volume = 0;
          break;
        case "7":
          this.percAudio.volume = 0;
          break;
        case "8":
          this.rideAudio.volume = 0;
          break;
        case "9":
          this.shakerAudio.volume = 0;
          break;
        case "10":
          this.tomAudio.volume = 0;
          break;

        default:
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "4":
          this.cowbellAudio.volume = 1;
          break;
        case "5":
          this.crashAudio.volume = 1;
          break;
        case "6":
          this.openhatAudio.volume = 1;
          break;
        case "7":
          this.percAudio.volume = 1;
          break;
        case "8":
          this.rideAudio.volume = 1;
          break;
        case "9":
          this.shakerAudio.volume = 1;
          break;
        case "10":
          this.tomAudio.volume = 1;
          break;

        default:
          break;
      }
    }
  }
  // tempo slider func
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
// create a kit
const drumKit = new DrumKit();

// Event listeners
// loops over the pads
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
// on click start
drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.updateBtn();
});
// check selected value
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.chandeSound(e);
  });
});
// mute functionality
drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
// tempo slider
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
// update tempo
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.updateTempo(e);
});
