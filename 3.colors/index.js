//Global selections and variables    -------------------------------------------------------
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll("input[type='range']");
const currentHexes = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjustBtn = document.querySelectorAll(".adjust");
const lockBtn = document.querySelectorAll(".lock");
const lockBtnIcon = document.querySelectorAll(".lock i");
const closeAdjustmensBtn = document.querySelectorAll(".close-adjustment");
const sliderContainer = document.querySelectorAll(".sliders");
let initialColors;
//for local storage
let savedPalettes = [];

//Event listeners    --------------------------------------------------------------------------
sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
  div.addEventListener("change", () => {
    updateTextUI(index);
  });
});

currentHexes.forEach((hex) => {
  hex.addEventListener("click", () => {
    copyToClipboard(hex);
  });
});

popup.addEventListener("transitionend", () => {
  const popupBox = popup.children[0];
  popup.classList.remove("active");
  popupBox.classList.remove("active");
});

adjustBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    openAdjustmentPanel(index);
  });
});

closeAdjustmensBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    closeAdjustmentPanel(index);
  });
});

generateBtn.addEventListener("click", randomColors);

lockBtn.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    lockLayer(e, index);
  });
});

//Functions  -------------------------------------------------------------------------------------
// color generator

//  manual method
/*function generateHex() {
  const letters = "0123456789ABCDEF";
  let hash = "#";
  for (let i = 0; i < 6; i++) {
    hash += letters[Math.floor(Math.random() * 16)];
  }
  return hash;
}*/

//  using chomajs library
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

// random colors
function randomColors() {
  //  initial colors
  initialColors = [];

  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    //   add it to the array
    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      initialColors.push(chroma(randomColor).hex());
    }
    //   add the color to the background
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    //   check for contrast
    checkTextContrast(randomColor, hexText);
    //   initial colorize sliders
    const sliders = div.querySelectorAll(".sliders input");

    const color = chroma(randomColor);
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, saturation, brightness);
  });

  //  reset inputs
  resetInputs();

  //  check for a button contrast
  adjustBtn.forEach((button, index) => {
    checkTextContrast(initialColors[index], button);
    checkTextContrast(initialColors[index], lockBtn[index]);
  });
}

// change the text contrast
function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

// colorize sliders
function colorizeSliders(color, hue, saturation, brightness) {
  //  scale saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);
  //  scale brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  // update input colors
  //     saturation
  saturation.style.backgroundImage = `linear-gradient(
      to right, 
    ${scaleSat(0)}, 
    ${scaleSat(1)}
    )`;
  //     brightness
  brightness.style.backgroundImage = `linear-gradient(
      to right, 
    ${scaleBright(0)}, 
    ${scaleBright(0.5)}, 
    ${scaleBright(1)}
    )`;
  //     hue
  hue.style.backgroundImage = `linear-gradient(
      to right, 
    rgb(204,75,75),
    rgb(204,204,75),
    rgb(75,204,75),
    rgb(75,204,204),
    rgb(75,75,204),
    rgb(204,75,204),
    rgb(204,75,75)
    )`;
}

// input colors controls
function hslControls(e) {
  const index =
    e.target.getAttribute("data-bright") ||
    e.target.getAttribute("data-hue") ||
    e.target.getAttribute("data-sat");

  let sliders = e.target.parentElement.querySelectorAll("input[type='range'");

  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  // const bgColor = colorDivs[index].querySelector("h2").innerText;
  const bgColor = initialColors[index];

  let color = chroma(bgColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);

  colorDivs[index].style.backgroundColor = color;

  // colorize input/sliders
  colorizeSliders(color, hue, brightness, saturation);
}

// update text ui
function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll(".controls button");
  textHex.innerText = color.hex();
  //  check contrast
  checkTextContrast(color, textHex);
  for (icon of icons) {
    checkTextContrast(color, icon);
  }
}

// reset inputs
function resetInputs() {
  const sliders = document.querySelectorAll(".sliders input");
  sliders.forEach((slider) => {
    // for hue
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      const hueValue = Math.floor(chroma(hueColor).hsl()[0]);
      //  set the current hue value
      slider.value = hueValue;
    }
    // for brightness
    if (slider.name === "brightness") {
      const brightnessColor = initialColors[slider.getAttribute("data-bright")];
      const brightnessValue =
        Math.floor(chroma(brightnessColor).hsl()[2] * 100) / 100;
      //  set the current brightness value
      slider.value = brightnessValue;
    }
    // for saturation
    if (slider.name === "saturation") {
      const saturationColor = initialColors[slider.getAttribute("data-sat")];
      const saturationValue =
        Math.floor(chroma(saturationColor).hsl()[1] * 100) / 100;
      //  set the current saturation value
      slider.value = saturationValue;
    }
  });
}

// copy to clipboadr
function copyToClipboard(hex) {
  //  add a textarea
  const element = document.createElement("textarea");
  //  add into it the hex value
  element.value = hex.innerText;
  //  add the element into the document
  document.body.appendChild(element);
  // select the element
  element.select();
  // copy the element
  document.execCommand("copy");
  //  remove the element from the document
  document.body.removeChild(element);
  //  popup animation
  const popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");
}

// toggle an adjustment panel
function openAdjustmentPanel(index) {
  sliderContainer[index].classList.toggle("active");
}

// close an adjustment panel
function closeAdjustmentPanel(index) {
  sliderContainer[index].classList.remove("active");
}

// lock layer
function lockLayer(e, index) {
  const lockSVG = e.target.children[0];
  const activeBg = colorDivs[index];
  activeBg.classList.toggle("locked");

  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<i class="fas fa-lock"></i>';
  } else {
    e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
  }
}

//IMPLEMENT SAVE TO PALETTE AND LOCAL STORAGE
const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-container");
const libraryBtn = document.querySelector(".library");
const libraryClear = document.querySelector(".library-clear");
const closeLibraryBtn = document.querySelector(".close-library");

//Event listeners
saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);
libraryClear.addEventListener("click", clearLocalStorage);

//Functions
// open palette
function openPalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
}

// close palette
function closePalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
}

// save palette
function savePalette(e) {
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
  const name = saveInput.value;
  const colors = [];
  currentHexes.forEach((hex) => {
    colors.push(hex.innerText);
  });

  // generate the object
  let paletteNr;
  const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
  if (paletteObjects) {
    paletteNr = paletteObjects.length;
  } else {
    paletteNr = savedPalettes.length;
  }

  const paletteObj = { name, colors, nr: paletteNr };
  savedPalettes.push(paletteObj);

  // save to the local storage
  saveToLocal(paletteObj);
  saveInput.value = "";

  // generate the palette for the library
  generatePalette(paletteObj);
}

// generate the palette for the library
function generatePalette(paletteObj) {
  const paletteObjects = JSON.parse(localStorage.getItem("palettes"));

  const palette = document.createElement("div");
  palette.classList.add("current-palette");

  const title = document.createElement("h4");
  title.innerText = paletteObj.name;

  const preview = document.createElement("div");
  preview.classList.add("small-preview");

  paletteObj.colors.forEach((smallColor) => {
    const smallDiv = document.createElement("div");
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
  });

  const paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-paette-btn");
  paletteBtn.classList.add(paletteObj.nr);
  paletteBtn.innerText = "Select";

  // attach event to the btn
  paletteBtn.addEventListener("click", (e) => {
    //  close the palet
    closeLibrary();
    //  pick the index of palette chosen
    const paletteIndex = e.target.classList[1];
    console.log(savedPalettes);
    //  initial the current state
    initialColors = [];
    //  pick chosen colors and update the current
    paletteObjects[paletteIndex].colors.forEach((color, index) => {
      initialColors.push(color);
      colorDivs[index].style.backgroundColor = color;
      const text = colorDivs[index].children[0];
      checkTextContrast(color, text);
      updateTextUI(index);
    });
    resetInputs();
  });

  // append to the library
  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  libraryContainer.children[0].appendChild(palette);
}

// save to local storage
function saveToLocal(paletteObj) {
  let localPalettes;
  // check if we have any palettes
  if (localStorage.getItem("palettes") === null) {
    //  if we don't
    localPalettes = [];
  } else {
    //  if we do
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  // push a new data
  localPalettes.push(paletteObj);
  // then push it back
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

// get from local storage
function getLocalStorage() {
  if (localStorage.getItem("palettes") == null) {
    localPalettes = [];
  } else {
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    savedPalettes = [...paletteObjects];
    paletteObjects.forEach((paletteObj) => {
      generatePalette(paletteObj, paletteObjects);
    });
  }
}

// clear the local storage
function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}

// open library
function openLibrary(e) {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.add("active");
  popup.classList.add("active");
}

// close library
function closeLibrary(e) {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.remove("active");
  popup.classList.remove("active");
}

//Invoke the functions
getLocalStorage();
randomColors();
