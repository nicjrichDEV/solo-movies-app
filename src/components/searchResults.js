import { searchForTitle } from "../services/OMDb";
import { getWatchList } from "../services/watchList";

export async function searchResults(element, titleToSearch, cb) {
  const results = await searchForTitle(titleToSearch);
  const watchList = getWatchList();

  // TODO: Complete markup
  const markUp = results
    .map((result) => {
      const alreadyFav = watchList.some((fav) => fav.imdbID === result.imdbID);
      return `
        <p>${result.Title}</p>
        <img src="${result.Poster}">
        ${
          alreadyFav
            ? `
            <button data-id="${result.imdbID}">Remove From Watch List</button>
          `
            : `
            <button data-id="${result.imdbID}">Add To Watch List</button>
          `
        }
        
      `;
    })
    .join("");

  element.innerHTML = markUp;

  function handleClick(e) {
    const button = e.target.dataset.id;
    if (button) return cb(button);
  }

  element.addEventListener("click", handleClick);
}
