export default function getGenresId() {
  const genresObj = {};

  return onGetFilmGenres().then(data => {
    const dataGenres = data.data.genres;
    dataGenres.forEach(item => {
      genresObj[item.id] = item.name;
    });
    return genresObj;
  });
  //   console.log('genresObj', genresObj);

  // onGetTVGenres().then(data => {
  //   const dataGenres = data.data.genres;
  //   dataGenres.forEach(item => {
  //     genresObj[item.id] = item.name;
  //   });
  // });
  // console.log('genresObj', genresObj);
}
