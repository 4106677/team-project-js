import oneMovieCardTpl from '../templates/oneMovieCard.hbs';
import { spinnerOff, spinnerOn } from './loader';
import smoothScroll from './smoothScrool';
import updateResponce from './updateResponce';
import Notiflix from 'notiflix';

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
  fetchDefaultMoviesByApi()
    .then(data => {
      const resp = updateResponce(data.results);
      const ids = JSON.parse(localStorage.getItem('queue'));
      const arr1 = data.results.map(id => id.id);
      for (const id of ids) {
        if (arr1.includes(Number(id))) {
          console.log('TRUE', ids);
        }
      }
      ul.insertAdjacentHTML('beforeend', oneMovieCardTpl(resp));
      return resp;
    })
    .then(resp => {
      if (ul.childElementCount > 20) smoothScroll();

      if (resp.page === 1000) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of films collection."
        );
        button.classList.add('is-hidden');
      }
    });
  console.log('renderDefaultMovies data.results', data.results);
  updateResponce(data.results);
  console.log('updateResponce', responce);
}

renderDefaultMovies();
//*
