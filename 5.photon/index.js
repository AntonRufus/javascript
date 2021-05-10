// Global selections and variables
const auth = "563492ad6f91700001000001c448a5fd878543d38afd32fa62bd21a0";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector(".submit-btn");
const searchForm = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let pageNr = 1;
let fetchLink;
let currentSearch;

// GET https://api.pexels.com/v1/curated

//Event listeners
searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

// Functions
function updateInput(event) {
  //grab the input value
  searchValue = event.target.value;
}

async function fetchApi(url) {
  //fetch the data
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  //convert to json
  const data = await dataFetch.json();

  //return the data
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
              <p>${photo.photographer}</p>
              <a target="_blank" href=${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img>
        `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  // link
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
  // fetch API
  const data = await fetchApi(fetchLink);

  // HTML generation
  generatePictures(data);
}

async function searchPhotos(query) {
  // clear old HTML
  clear();
  // link
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  // fetch API
  const data = await fetchApi(fetchLink);

  // HTML generation
  generatePictures(data);
}

//clear old HTML
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  // increase the page number
  pageNr++;
  // link load fork
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${pageNr}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageNr}`;
  }
  // fetch the data
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//Invoke the func
curatedPhotos();
