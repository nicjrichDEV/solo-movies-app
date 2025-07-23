import "./styles/global.css";
import { getTitleData, searchForTitle } from "./services/OMDb";
import {
  addToWatchList,
  removeItemWatchList,
  alreadyInWatchList,
} from "./services/watchList";
const searchEl = document.querySelector("#search");
const resultsEl = document.querySelector("#results");
let searchResults = [];
let searchTimeout;

function renderResults(arrOfTitles) {
  const markUp = arrOfTitles
    .map((title) => {
      if (!title) return;

      resultsEl.classList.remove("results__placeholder__state");
      return `
      <div class="result">
        ${
          title.Poster && title.Poster !== "N/A"
            ? `<img class="result__poster" src="${title.Poster}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
               <div class="result__placeholder" style="display:none;"></div>`
            : `<div class="result__placeholder"></div>`
        }
        <div class="result-details">
          <div class="result-details-row-1">
          <h3>${title.Title}</h3>
          <p>${title.Ratings?.[0]?.Value?.slice(0, 3) || "N/A"}</p>
          </div>
          <div class="results-details-row-2">
            <p>${title.Runtime}</p>
            <p>${title.Genre}</p>
            <button data-id="${title.imdbID}" class="result__btn">
            ${getButtonContents(alreadyInWatchList(title.imdbID))}
            </button>
          </div>
          <p>${title.Plot}</p>
        </div>
      </div>
    `;
    })
    .join("");

  resultsEl.innerHTML = markUp;
}

async function performSearch(query) {
  try {
    searchResults = [];

    const titleIDs = await searchForTitle(query);

    if (!titleIDs || titleIDs.length === 0) {
      console.log("No search result found");
      resultsEl.classList.add("results__placeholder__state");
      resultsEl.innerHTML = `<div>No Titles found. Try a different search</div>`;
      return;
    }

    const arrTitleDetails = await Promise.all(
      titleIDs.map(async (item) => await getTitleData(item.imdbID))
    );

    // filter out any failed api calls
    const validResults = arrTitleDetails.filter((result) => result);

    if (validResults === 0) {
      resultsEl.classList.add("results__placeholder__state");
      resultsEl.innerHTML = `<div>Could not load title details</div>`;
      return;
    }
    renderResults(arrTitleDetails);
    searchResults = [...arrTitleDetails];
  } catch (error) {
    console.error("Search failed", error);
    resultsEl.classList.add("results__placeholder__state");
    resultsEl.innerHTML = `<div>Search failed. Please try again.</div>`;
  }
}

function debounceSearch(query) {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    if (query) performSearch(query);
  }, 350);
}

async function handleSearch(event) {
  const query = event.target.value;
  debounceSearch(query);
}

function getButtonContents(inWatchListStatus) {
  return inWatchListStatus
    ? `<img src="/icons/remove.svg" alt="remove from watch list" />Remove`
    : `<img src="/icons/add.svg" alt="add to watch list" />Add`;
}

// Handle adding or removing from watch list
function handleClick(event) {
  // capture button
  const button = event.target.closest(`button[data-id]`);
  if (!button) return;

  // capture button ID
  const id = button.dataset.id;
  if (!id) return;

  const inWatchList = alreadyInWatchList(id);

  // already in watch list - remove it from watch list and change button text to add
  if (inWatchList) {
    removeItemWatchList(id);
    button.innerHTML = getButtonContents(!inWatchList);
    return;
  }

  // not in watch list - get details and add to Watch List
  const titleDetails = searchResults.find((title) => title.imdbID === id);
  addToWatchList(titleDetails);
  button.innerHTML = getButtonContents(!inWatchList);
}

function handleSearchButton(event) {
  event.preventDefault();
  const query = searchEl.value;

  if (query) {
    clearTimeout(searchTimeout);
    performSearch(query);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearchButton(event);
  }
}

// Event Listeners
searchEl.addEventListener("input", handleSearch);
searchEl.addEventListener("keypress", handleKeyPress);
document
  .querySelector(".search-container button")
  .addEventListener("click", handleSearchButton);
resultsEl.addEventListener("click", handleClick);
