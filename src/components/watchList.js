import { getWatchList } from "../services/watchList";

function renderWatchList(element) {
  const watchList = getWatchList();
  const markUp = watchList
    .map((item) => {
      return `
        <p>${item.Title}</p>
        <img src="${item.Poster}">
        <button data-id="${item.imdbID}">Remove From Watch List</button>
    `;
    })
    .join("");

  element.innerHTML = markUp;
}

export { renderWatchList };
