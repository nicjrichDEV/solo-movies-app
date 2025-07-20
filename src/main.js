import "./styles/global.css";
import { getTitleData } from "./services/OMDb";
import {
  addToWatchList,
  removeItemWatchList,
  checkUnique,
} from "./services/watchList";
import { searchResults } from "./components/searchResults";
import { searchField } from "./components/searchField";
import { router } from "./router";

document.querySelector("#app").innerHTML = `
  <div id="hero"></div>
  <div id="search-field"></div>
  <div id="search-results"></div>
`;

const searchFieldEl = document.querySelector("#search-field");
const searchResultsEl = document.querySelector("#search-results");

// Register Routes
router.addRoute("/", function () {
  console.log("Home page handler called");
});

router.addRoute("/watchlist", function () {
  console.log("Watch list page handler called");
});

console.log("All routes registered:", router.routes);

function handleSearchField(query) {
  // TODO: Handle failed or no entry data searches
  const searchString = query.target.value;
  if (searchString === "") alert("Enter at least three character");
  searchResults(searchResultsEl, searchString);
}

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

function init() {
  searchField(searchFieldEl, handleSearchField);
  searchResultsEl.addEventListener("click", handleClick);
}

init();
