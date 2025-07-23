import { getButtonContents } from "../utils/getButtonContents";
import { alreadyInWatchList } from "../services/watchList";

export default function Result(title) {
  return `
        <div class="result" data-result=${title.imdbID}>
        ${
          title.Poster && title.Poster !== "N/A"
            ? `<img class="result__poster" src="${title.Poster}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
               <div class="result__placeholder" style="display:none;"></div>`
            : `<div class="result__placeholder"></div>`
        }
        <div class="result-details">
          <div class="result-details-row-1">
          <h3>${title.Title}</h3>
          <p>${title.Ratings?.[0]?.Value?.slice(0, 3) || "N/A"}</p>
          </div>
          <div class="results-details-row-2">
            <p>${title.Runtime}</p>
            <p>${title.Genre}</p>
            <button data-id="${title.imdbID}" class="result__btn">
            ${getButtonContents(alreadyInWatchList(title.imdbID))}
            </button>
          </div>
          <p>${title.Plot}</p>
        </div>
      </div>
    `;
}
