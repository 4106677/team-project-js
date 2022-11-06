import data from '/src/js/onSubmitSearch';
import { onGetFilmGenres, onGetTVGenres } from './fetchAPI';

function updateResponce(data) {
  console.log('updateResponce', data);
  onGetFilmGenres().then(console.log);
  //   console.log('onGetFilmGenres', onGetFilmGenres());

  //   const data = responce.data.results;
  //   console.log(data);
  //   const { poster_path, title, genre_ids, release_date, vote_average } = data;
  //   console.log(release_date);

  const newObj = data.map(item => {
    return {
      year: parseInt(item.release_date),
      poster: item.poster_path,
      title: item.title || item.name,
      vote: item.vote_average.toFixed(1),
      id: item.id,
    };
  });
  console.log('newObj', newObj);
  return newObj;
}

export default updateResponce;
