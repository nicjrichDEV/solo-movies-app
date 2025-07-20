function renderHero(element) {
  const currentRoute = window.location;
  console.log(currentRoute);
  element.innerHTML = `
        <div class="hero-container">
            <div class="hero-copy">
                <h1>My Watch List</h1>
                <a href="./">Search for movies</a>
            </div>
        </div>
    `;
}

export { renderHero };
