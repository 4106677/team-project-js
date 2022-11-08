import data from '/src/js/onSubmitSearch';
import { onGetFilmGenres, onGetTVGenres } from './fetchAPI';
import createGallery from './createGallery';

async function updateResponce(data) {
  console.log('updateResponce', data);

  const objIdGenres = await getGenresId();

  console.log('objIdGenres', objIdGenres);

  const newObj = data.map(item => {
    return {
      year: parseInt(item.release_date),
      poster: item.poster_path,
      title: item.title || item.name,
      vote: item.vote_average.toFixed(1),
      id: item.id,
      genres: item.genre_ids.map(id => {
        return objIdGenres[id];
      }),
    };
  });
  console.log('newObj', newObj);
  return createGallery(newObj);
}

function getGenresId() {
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

export default updateResponce;
