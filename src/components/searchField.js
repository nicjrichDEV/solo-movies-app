function searchField(element, cb) {
  element.innerHTML = `<input />`;

  element.addEventListener("change", handleInput);

  function handleInput(e) {
    e.preventDefault();
    return cb(e);
  }
}

export { searchField };
