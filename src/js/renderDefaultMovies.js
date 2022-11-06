import oneMovieCardTpl from '../templates/oneMovieCard.hbs';
import { spinnerOff, spinnerOn } from './loader';
import smoothScroll from './smoothScrool';
import updateResponce from './updateResponce';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const API_KEY = '3ab3f6572c3def6f6cf5801fb6522013';

const ul = document.querySelector('.movies-popular-list');
const button = document.querySelector('.load-more');

button.addEventListener('click', renderDefaultMovies);

let page = 1;

function fetchDefaultMoviesByApi() {
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
    console.log('data.results', data.results);
    const responce = updateResponce(data.results);
    console.log('updateResponce', responce);
    ul.insertAdjacentHTML('beforeend', oneMovieCardTpl(responce));

    if (ul.childElementCount > 20) smoothScroll();

    if (data.page === 1000) {
      alert("We're sorry, but you've reached the end of films collection.");
      button.classList.add('is-hidden');
    }
  });
}

renderDefaultMovies();
