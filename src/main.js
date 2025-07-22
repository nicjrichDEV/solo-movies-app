import "./styles/global.css";
import { getTitleData, searchForTitle } from "./services/OMDb";
import {
  addToWatchList,
  removeItemWatchList,
  alreadyInWatchList,
} from "./services/watchList";
const searchEl = document.querySelector("#search");
const resultsEl = document.querySelector("#results");
const BUTTON_TEXT = {
  ADD: "Add to Watch List",
  REMOVE: "Remove from Watch List",
};
let searchResults = [];

function renderResults(arrOfTitles) {
  const markUp = arrOfTitles
    .map((title) => {
      return `
      <div class="result">
        <img class="poster" src="${title.Poster}" />
        <div class="result-details">
          <div class="result-details-row-1">
          <h3>${title.Title}</h3>
          <p>${title.Ratings[0].Value.slice(0, 3)}</p>
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

async function handleSearch(event) {
  searchResults = [];
  const query = event.target.value;

  const titleIDs = await searchForTitle(query);
  const arrTitleDetails = await Promise.all(
    titleIDs.map(async (item) => await getTitleData(item.imdbID))
  );

  renderResults(arrTitleDetails);
  searchResults = [...arrTitleDetails];
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

// Event Listeners
searchEl.addEventListener("change", handleSearch);
resultsEl.addEventListener("click", handleClick);
