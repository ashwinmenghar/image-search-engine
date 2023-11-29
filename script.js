// import { links } from "./raw.js";
// const len = Object.keys(links.results).length;

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("show-more-btn");
const accessKey = "naakr6blSZTZAh6lBqR9HhooxoSGtTeH2suv4P3ZpxA";

const galleryColumn = document.getElementsByClassName("gallery__column");
const galleryCol = document.getElementById("gallery__coll");

let keyword = "random";
let page = 1;

async function searchImage() {
    keyword = searchBox.value ? searchBox.value : "random";
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=50`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  console.log(data);
  const results = data.results;
//   const results = links.results;

  var idx = 0;
  var ele = null;

  var gap = 3,
    result = results.reduce((r, v, i) => {
      r[i % gap] = r[i % gap] || [];
      r[i % gap].push(v);
      return r;
    }, []);
  imagesManagement(result[0]);
  imagesManagement(result[1]);
  imagesManagement(result[2]);
  searchMoreBtn.style.display = "block";
}

function imagesManagement(results) {
  const galleryColumnDiv = document.createElement("div");
  galleryColumnDiv.classList.add("gallery__column");

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.classList.add("gallery__image");

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.classList.add("gallery__link");

    var figure = document.createElement("figure");
    figure.classList.add("gallery__thumb");

    figure.appendChild(image);

    var figcaption = document.createElement("figcaption");
    figcaption.classList.add("gallery__caption");
    const text = result.description ?? result.alt_description;
    figcaption.innerText = text.substring(0, 50);

    const downloadBtn = document.createElement("a");
    downloadBtn.setAttribute("target", '_blank');
    downloadBtn.setAttribute("href", `https://unsplash.com/photos/${result.id}/download?ixid=&amp;force=true`);
    downloadBtn.setAttribute("download", "");

    const downloadIcon = document.createElement("img");
    downloadIcon.classList.add("download-icon");
    downloadIcon.setAttribute("src", "./download.png");
    downloadBtn.appendChild(downloadIcon);


    figcaption.appendChild(downloadBtn);

    figure.appendChild(image);
    figure.appendChild(figcaption);
    imageLink.appendChild(figure);

    galleryColumnDiv.appendChild(imageLink);
  });

  searchResult.appendChild(galleryColumnDiv);
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});
searchImage();

searchMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});
