import data from '/src/js/onSubmitSearch';
// import { onGetFilmGenres, onGetTVGenres } from './fetchAPI';
import createGallery from './createGallery';

async function updateResponce(data, page) {
  // const objIdGenres = await getGenresId();
  const objIdGenres = JSON.parse(localStorage.getItem('genres'));
  // console.log(objIdGenres);

  const newObj = data.map(item => {
    const arrQ = localStorage.getItem('queue') || [];
    const queue = arrQ.includes(item.id);
    const arrW = localStorage.getItem('watched') || [];
    const watched = arrW.includes(item.id);
    return {
      year: parseInt(item.release_date) || 'Date not specified',
      poster: item.poster_path,
      title: item.title || item.name,
      original_title: item.original_title,
      vote: item.vote_average.toFixed(1),
      popularity: item.popularity.toFixed(1),
      queue: queue,
      watched: watched,
      id: item.id,
      genres: item.genre_ids
        .map(id => {
          return objIdGenres[id];
        })
        .reduce((acc, element, index, array) => {
          if (index > 2) {
            acc = [...array.slice(0, 2)];

            acc.push('Other');
            return acc;
          } else if (array.length === 0) {
            acc = [...array];
            return acc.push('Other');
          } else return array;
        }, []),
    };
  });

  return createGallery(newObj, page);
}

// function getGenresId() {
//   const genresObj = {};

//   return onGetFilmGenres().then(data => {
//     const dataGenres = data.data.genres;
//     dataGenres.forEach(item => {
//       genresObj[item.id] = item.name;
//     });
//     return genresObj;
//   });
// }

export default updateResponce;
