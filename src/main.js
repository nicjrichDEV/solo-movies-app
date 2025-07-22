import "./styles/global.css";
import { getTitleData, searchForTitle } from "./services/OMDb";
import {
  addToWatchList,
  removeItemWatchList,
  checkUnique,
} from "./services/watchList";
const searchEl = document.querySelector("#search");
const resultsEl = document.querySelector("#results");

async function handleClick(item) {
  const id = item.target.dataset.id;

  if (!id) return;

  const isUnique = checkUnique(id);

  if (!isUnique) {
    removeItemWatchList(id);
    const element = document.querySelector(`[data-id=${id}]`);
    element.innerText = "Add to Watch List";
    return;
  } else {
    const details = await getTitleData(id);
    addToWatchList(details);
    const element = document.querySelector(`[data-id=${id}]`);
    element.innerText = "Remove from Watch List";
    return;
  }
}

function renderResults(arrOfTitles) {
  const markUp = arrOfTitles
    .map((title) => {
      console.log(title);
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
  const query = event.target.value;

  const titleIDs = await searchForTitle(query);
  const arrTitleDetails = await Promise.all(
    titleIDs.map(async (item) => await getTitleData(item.imdbID))
  );

  renderResults(arrTitleDetails);
}

// Event Listeners
searchEl.addEventListener("change", handleSearch);
// searchResultsEl.addEventListener("click", handleClick);
