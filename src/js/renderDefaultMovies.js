import oneMovieCardTpl from '../templates/oneMovieCard.hbs';
import smoothScroll from './smoothScrool';

const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const API_KEY = '3ab3f6572c3def6f6cf5801fb6522013';

const ul = document.querySelector('.movies-popular-list');
const button = document.querySelector('.load-more');

button.addEventListener('click', renderDefaultMovies);

let page = 1;

function fetchDefaultMoviesByApi() {
  return fetch(`${BASE_URL}?page=${page}&api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error('Fail');
    }

    page += 1;
    return response.json();
  });
}

export function renderDefaultMovies() {
  fetchDefaultMoviesByApi().then(data => {

    ul.insertAdjacentHTML('beforeend', oneMovieCardTpl(data.results));

    if (ul.childElementCount > 20) smoothScroll();
    
    if (data.page === 1000) {
      alert("We're sorry, but you've reached the end of films collection.");
      button.classList.add('is-hidden');
    }
  });
}

renderDefaultMovies();
