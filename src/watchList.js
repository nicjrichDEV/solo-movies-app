import { renderWatchList } from "./components/watchList";
import { removeItemWatchList } from "./services/watchList";
import { renderHero } from "./components/hero";
import "./styles/global.css";

document.querySelector("#app").innerHTML = `
    <div id="hero"></div>
    <div id="watch-list"></div>
`;

const heroEl = document.querySelector("#hero");
const watchListEl = document.querySelector("#watch-list");

renderHero(heroEl);
renderWatchList(watchListEl);

watchListEl.addEventListener("click", handleClick);

function handleClick(e) {
  const id = e.target.dataset.id;

  if (!id) return;

  removeItemWatchList(id);
  renderWatchList(watchListEl);
}
