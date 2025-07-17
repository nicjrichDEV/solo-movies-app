import "./styles/global.css";
import { getTitleData, getTitlePoster, searchForTitle } from "./services/OMDb";
import {
  addToWatchList,
  getWatchList,
  removeItemWatchList,
  clearWatchList,
} from "./services/watchList";
import { searchResults } from "./components/searchResults";

document.querySelector("#app").innerHTML = `
  <div id="search-results"></div>
`;

const searchEl = document.querySelector("#search-results");
const search = "Tron";

searchResults(searchEl, search, async (item) => {
  const details = await getTitleData(item.target.dataset.id);
  addToWatchList(details);
  console.log(getWatchList());
});

// TODO: Handle DOM Updates to Search Based off WatchList Status
async function handleClick(buttonID) {
  const watchList = getWatchList();

  if (watchList.some((fav) => fav.imdbId === buttonID)) {
  }
}
