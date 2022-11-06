import data from '/src/js/onSubmitSearch';
import { onGetFilmGenres, onGetTVGenres } from './fetchAPI';

function updateResponce(data) {
  console.log('updateResponce', data);

  const genresObj = {};
  //   const genresObj2 = {
  //     12: 'Adventure',
  //     14: 'Fantasy',
  //     16: 'Animation',
  //   };

  //   onGetFilmGenres().then(data => {
  //     const dataGenres = data.data.genres;
  //     dataGenres.forEach(item => {
  //       genresObj[item.id] = item.name;
  //     });
  //   });
  //   //   console.log('genresObj', genresObj);

  //   onGetTVGenres().then(data => {
  //     const dataGenres = data.data.genres;
  //     dataGenres.forEach(item => {
  //       genresObj[item.id] = item.name;
  //     });
  //   });
  //   console.log('genresObj', genresObj);

  // console.log(data.data.genres));
  //   console.log('onGetFilmGenres', onGetFilmGenres());

  //   const data = responce.data.results;
  //   console.log(data);
  //   const { poster_path, title, genre_ids, release_date, vote_average } = data;
  //   console.log(release_date);
  const objIdGenres = getGenresId();
  console.log('objIdGenres', objIdGenres);

  const newObj = data.map(item => {
    return {
      year: parseInt(item.release_date),
      poster: item.poster_path,
      title: item.title || item.name,
      vote: item.vote_average.toFixed(1),
      id: item.id,
      genres: item.genre_ids.map(id => {
        let genres = [];
        if (Object.keys(objIdGenres).includes(id)) {
          genres.push(Object.values(objIdGenres));
        }
        return id;
      }),
    };
  });
  console.log('newObj', newObj);
  return newObj;
}

function getGenresId() {
  const genresObj = {};
  const genresObj2 = {
    12: 'Adventure',
    14: 'Fantasy',
    16: 'Animation',
  };

  onGetFilmGenres().then(data => {
    const dataGenres = data.data.genres;
    dataGenres.forEach(item => {
      genresObj[item.id] = item.name;
    });
  });
  //   console.log('genresObj', genresObj);

  onGetTVGenres().then(data => {
    const dataGenres = data.data.genres;
    dataGenres.forEach(item => {
      genresObj[item.id] = item.name;
    });
  });
  console.log('genresObj', genresObj);
  return genresObj;
}

export default updateResponce;
