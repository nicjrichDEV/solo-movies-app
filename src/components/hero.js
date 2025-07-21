import "../styles/hero.css";

function renderHero(element) {
  const currentRoute = window.location.pathname;

  if (currentRoute === "/") {
    element.innerHTML = `
        <div class="hero-container">
            <div class="hero-copy">
                <h1>Find your film</h1>
                <a href="./mywatchlist">My Watch List</a>
            </div>
        </div>
    `;
  }

  if (currentRoute === "/mywatchlist") {
    element.innerHTML = `
        <div class="hero-container">
            <div class="hero-copy">
                <h1>My Watch List</h1>
                <a href="./">Search for movies</a>
            </div>
        </div>
    `;
  }

  window.addEventListener("change", renderHero);
}

export { renderHero };
