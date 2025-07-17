function addToWatchList(item) {
  const watchList = getWatchList();

  if (!watchList.some((fav) => fav.imdbID === item.imdbID)) {
    watchList.push(item);
    localStorage.setItem("watchList", JSON.stringify(watchList));
  } else {
    console.log("Item has already been added");
  }
}

// TODO: Add function to check if new item is already in watchList

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
