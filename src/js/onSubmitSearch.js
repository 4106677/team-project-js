import { fetchSearchFilm } from './fetchAPI';
import refs from './refs';
import Notiflix from 'notiflix';
import checkInputData from './checkInputData';
import smoothScroll from './smoothScrool';
import { renderDefaultMovies } from './renderDefaultMovies';

import { spinnerOff, spinnerOn } from './loader';
const form = document.querySelector('.search__form');
form.addEventListener('submit', onClickSubmit);
refs.loadMore.addEventListener('click', onLoadMore);

let value = null;
let page = 1;

function onClickSubmit(event) {
  event.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  if (!value) {
    Notiflix.Notify.failure('Please, enter something to search');
    return;
  }
  refs.loadMore.removeEventListener('click', renderDefaultMovies);
  // spinnerOn();
  fetchSearchFilm(value, page)
    .then(data => checkInputData(data, page))
    // .then(resp => console.log('responce', resp))
    .catch(error => console.log(error))
    .finally(() => spinnerOff());

  event.target.reset();
}

function onLoadMore() {
  if (!value) {
    return;
  }
  page += 1;
  fetchSearchFilm(value, page)
    .then(data => {
      if (data.data.page === data.data.total_pages) {
        refs.loadMore.classList.toggle('visually-hidden');
      }
      checkInputData(data, page);
      smoothScroll();
    })
    .catch(error => console.log(error));
}

export default onClickSubmit;
