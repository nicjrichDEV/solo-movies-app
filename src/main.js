import "./styles/global.css";
import { setupCounter } from "./components/counter";
import { getTitleData, getTitlePoster, searchForTitle } from "./services/OMDb";

document.querySelector("#app").innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector("#counter"));

console.log(await getTitleData());
console.log(await searchForTitle());
