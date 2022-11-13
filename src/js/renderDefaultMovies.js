import { spinnerOff, spinnerOn } from './loader';
import updateResponce from './updateResponce';
import { API_KEY } from './apps/fetchApi';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';

// const ul = document.querySelector('.movies-popular-list');
const button = document.querySelector('.load-more');

button.addEventListener('click', renderDefaultMovies);

let page = 1;

export function fetchDefaultMoviesByApi() {
  spinnerOn();
  return fetch(`${BASE_URL}?page=${page}&api_key=${API_KEY}`)
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
