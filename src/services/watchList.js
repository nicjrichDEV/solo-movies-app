function addToWatchList(item) {
  // TODO: Check if item already exists before adding to watchList array
  const watchList = getWatchList();
  watchList.push(item);
  localStorage.setItem("watchList", JSON.stringify(watchList));
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

export { addToWatchList, getWatchList, removeItemWatchList, clearWatchList };
