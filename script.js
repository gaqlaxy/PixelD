const auth = "f6t3QNaETSeeAFyGOgN0RjGvoY3toHEo7JRZZa2WWWUfgAUdg0oPFhfL";

let gallery = document.querySelector(".gallery");
let searchInput = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

let searchValue;
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function genPictures(data) {
  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-img");
    galleryImage.innerHTML = `
    <div class="gallery-info">    
    <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImage);
  });
}

// Fetching Images
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  genPictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  genPictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  genPictures(data);
}
curatedPhotos();
