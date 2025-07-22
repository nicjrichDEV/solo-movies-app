import "./styles/global.css";
import { getTitleData, searchForTitle } from "./services/OMDb";
import {
  addToWatchList,
  removeItemWatchList,
  getWatchList,
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
            <button data-id=${title.imdbID}>Add to watch list</button>
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

function handleClick(event) {
  // Capture button ID
  const id = event.target.dataset.id;
  if (!id) return;

  // Capture button
  const button = document.querySelector(`[data-id="${id}"]`);
  if (!button) return;

  // Already in Watch List - Remove it from watch list and change button text to add
  if (alreadyInWatchList(id)) {
    removeItemWatchList(id);
    button.textContent = BUTTON_TEXT.ADD;
    return;
  }

  // Not in Watch List - Get details and add to Watch List
  const titleDetails = searchResults.find((title) => title.imdbID === id);
  addToWatchList(titleDetails);
  button.textContent = BUTTON_TEXT.REMOVE;
}

// Event Listeners
searchEl.addEventListener("change", handleSearch);
resultsEl.addEventListener("click", handleClick);
