import { spinnerOff, spinnerOn } from './loader';
import updateResponce from './updateResponce';
import smoothScroll from './smoothScrool';
import { API_KEY } from './apps/fetchApi';
import refs from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';

// const ul = document.querySelector('.movies-popular-list');
const button = document.querySelector('.load-more');

button.addEventListener('click', renderDefaultMovies);

let page = 1;

export function fetchDefaultMoviesByApi() {
  spinnerOn();
  return fetch(
    `${BASE_URL}?page=${page}&api_key=3ab3f6572c3def6f6cf5801fb6522013`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Fail');
      }

      page += 1;
      return response.json();
    })
    .finally(() => spinnerOff());
}

export function renderDefaultMovies() {
  fetchDefaultMoviesByApi().then(data => {
    const resp = updateResponce(data.results);
    if (refs.list.childElementCount > 20) smoothScroll();
    // smoothScroll();
    if (data.page === 1000) {
      Notify.info(
        "We're sorry, but you've reached the end of films collection."
      );
      button.classList.add('is-hidden');
    }
    return resp;
  });
  // .then(resp => {
  //   ul.insertAdjacentHTML('beforeend', oneMovieCardTpl(resp));
  //   if (ul.childElementCount > 20) smoothScroll();

  //   if (resp.page === 1000) {
  //     Notiflix.Notify.info(
  //       "We're sorry, but you've reached the end of films collection."
  //     );
  //     button.classList.add('is-hidden');
  //   }
  // });
}

renderDefaultMovies();
