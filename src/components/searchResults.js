import { searchForTitle } from "../services/OMDb";
import { checkUnique } from "../services/watchList";

export async function searchResults(element, titleToSearch) {
  const results = await searchForTitle(titleToSearch);

  // TODO: Complete markup
  const markUp = results
    .map((result) => {
      const isUnique = checkUnique(result.imdbID);
      return `
        <p>${result.Title}</p>
        <img src="${result.Poster}">
        ${
          isUnique
            ? `
            <button data-id="${result.imdbID}">Add To Watch List</button>
          `
            : `
            <button data-id="${result.imdbID}">Remove From Watch List</button>
          `
        }
        
      `;
    })
    .join("");

  element.innerHTML = markUp;
}
