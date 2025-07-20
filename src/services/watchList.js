function addToWatchList(item) {
  const watchList = getWatchList();
  watchList.push(item);
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

function checkUnique(id) {
  const watchList = getWatchList();
  return watchList.some((fav) => fav.imdbID === id) ? false : true;
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
  checkUnique,
  removeItemWatchList,
  clearWatchList,
};
