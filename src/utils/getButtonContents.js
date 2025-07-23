export function getButtonContents(inWatchListStatus) {
  return inWatchListStatus
    ? `<img src="/icons/remove.svg" alt="remove from watch list" />Remove`
    : `<img src="/icons/add.svg" alt="add to watch list" />Add`;
}
