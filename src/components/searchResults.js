import { searchForTitle } from "../services/OMDb";

export async function searchResults(element, titleToSearch, cb) {
  const results = await searchForTitle(titleToSearch);
  // TODO: Complete markup
  const markUp = results
    .map(
      (result) => `
    <p>${result.Title}</p>
    <img src="${result.Poster}" >
    <button data-id="${result.imdbID}">Add To Watch List</button>
  `
    )
    .join("");

  element.innerHTML = markUp;

  function handleClick(e) {
    return cb(e);
  }

  element.addEventListener("click", handleClick);
}
