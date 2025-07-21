function searchField(element, cb) {
  element.innerHTML = `<input class="search" placeholder="Search for a movie"/>`;

  element.addEventListener("change", handleInput);

  function handleInput(e) {
    e.preventDefault();
    return cb(e);
  }
}

export { searchField };
