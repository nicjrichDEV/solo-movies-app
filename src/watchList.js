import "./styles/global.css";
import { getWatchList } from "./services/watchList";
import { alreadyInWatchList } from "./services/watchList";
import { removeItemWatchList } from "./services/watchList";
import { getButtonContents } from "./utils/getButtonContents";
import Result from "./components/Result";
const resultsEl = document.querySelector("#results");

function renderWatchList() {
  const watchList = getWatchList();

  if (watchList.length === 0) {
    resultsEl.classList.add("results__placeholder__state");
    resultsEl.innerHTML = `
      <div class="result__explore">
          <p class="result__explore__copy">
            Your watch list is looking a little empty...
          </p>
          <a href="/">
            <img src="/icons/add.svg" alt="Add a title to your watch list" />
            Let's add some titles!</a
          >
        </div>
    `;
    return;
  }

  resultsEl.classList.remove("results__placeholder__state");
  const markUp = watchList
    .map((title) => {
      if (!title) return;
      return Result(title);
    })
    .join("");

  resultsEl.innerHTML = markUp;
}

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
    renderWatchList();
    return;
  }
}

resultsEl.addEventListener("click", handleClick);

renderWatchList();
