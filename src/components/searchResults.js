import { getTitleData, searchForTitle } from "../services/OMDb";
import { checkUnique } from "../services/watchList";

export async function searchResults(element, titleToSearch) {
  const results = await searchForTitle(titleToSearch);

  // TODO: Complete markup
  const markUp = results
    .map((result) => {
      const isUnique = checkUnique(result.imdbID);

      const titleData = getTitleData(result.imdbID);
      console.log(titleData);

      return `
      <div class="result">
        <img src="${result.Poster}">
        <div class="details">
          <div class="details-row-1">
            <h3>${result.Title}</h3>
          </div>
        </div>
        ${
          isUnique
            ? `
            <button data-id="${result.imdbID}">Add To Watch List</button>
          `
            : `
            <button data-id="${result.imdbID}">Remove From Watch List</button>
          `
        }
        </div>
      `;
    })
    .join("");

  element.innerHTML = markUp;
}
