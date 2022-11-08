import data from '/src/js/onSubmitSearch';
import { onGetFilmGenres, onGetTVGenres } from './fetchAPI';
import createGallery from './createGallery';

async function updateResponce(data) {
  // const objIdGenres = await getGenresId();

  // console.log('objIdGenres', objIdGenres);

  const newObj = await data.map(item => {
    const genres = JSON.parse(localStorage.getItem('genres'));
    return {
      year: parseInt(item.release_date),
      poster: item.poster_path,
      title: item.title || item.name,
      vote: item.vote_average.toFixed(1),
      popularity: item.popularity.toFixed(1),
      id: item.id,
      genres: item.genre_ids
        .map((id, index, arr) => {
          if (index === 2 && arr.length > 3) {
            return 'Other';
          } else if (index <= 2) {
            return genres[id];
          } else if (index === 2 && arr.length === 3) {
            return genres[id];
          }
        })
        .slice(0, 3),
      // .reduce((acc, index, array) => {
      //   if (index > 2) {
      //     acc = [...array.slice(0, 2)];
      //     acc.push('Other');
      //     return acc;
      //   } else {
      //     return array;
      //   }
      // }, []),
    };
  });
  return newObj;
}

export default updateResponce;
