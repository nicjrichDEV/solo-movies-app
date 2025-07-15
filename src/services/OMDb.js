async function getTitleData(IMDbID = "tt1285016") {
  const rep = await fetch(
    `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_KEY
    }&i=${IMDbID}`
  );
  const data = await rep.json();

  return data;
}

async function getTitlePoster(IMDbID = "tt1285016") {
  const rep = await fetch(
    `http://img.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_KEY
    }&i=${IMDbID}&r=json`
  );
  const data = await rep.json();
  console.log(data);

  return data;
}

async function searchForTitle(title = "The Matrix") {
  const rep = await fetch(
    `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&t=${title}`
  );
  const data = await rep.json();

  return data;
}

export { getTitleData, getTitlePoster, searchForTitle };
