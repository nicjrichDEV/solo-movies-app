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

searchResults(
  document.querySelector("#search-results"),
  "Tron",
  async (item) => {
    const details = await getTitleData(item.target.dataset.id);
    addToWatchList(details);
    console.log(getWatchList());
  }
);
