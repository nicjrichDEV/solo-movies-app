function addToWatchList(item) {
  const watchList = getWatchList();
  watchList.push(item);
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

function alreadyInWatchList(id) {
  const watchList = getWatchList();
  return watchList.some((title) => title.imdbID === id);
}

function getWatchList() {
  const stored = localStorage.getItem("watchList");
  return stored ? JSON.parse(stored) : [];
}

function removeItemWatchList(item) {
  const watchList = getWatchList();
  const filtered = watchList.filter((movie) => movie.imdbID !== item);
  localStorage.setItem("watchList", JSON.stringify(filtered));
}

function clearWatchList() {
  localStorage.clear();
  console.log("Storage Cleared");
}

export {
  addToWatchList,
  getWatchList,
  alreadyInWatchList,
  removeItemWatchList,
  clearWatchList,
};
