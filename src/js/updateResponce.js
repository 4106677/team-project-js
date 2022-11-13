import createGallery from './createGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import smoothScroll from './smoothScrool';
import getAllgenres from '../js/apps/getAllGenres';

async function updateResponce(data, page) {
  // const objIdGenres = await getGenresId();
  if (!localStorage.getItem('genres')) await getAllgenres();
  const objIdGenres = JSON.parse(localStorage.getItem('genres'));
  // console.log(objIdGenres);

  const newObj = data.map(item => {
    const arrQ = localStorage.getItem('queue') || [];
    const queue = arrQ.includes(item.id);
    const arrW = localStorage.getItem('watched') || [];
    const watched = arrW.includes(item.id);

    if (refs.list.childElementCount > 20) smoothScroll();

    if (item.page === 1000) {
      Notify.info(
        "We're sorry, but you've reached the end of films collection."
      );
      button.classList.add('is-hidden');
    }

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
