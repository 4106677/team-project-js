import { fetchSearchFilm } from './fetchAPI';
import refs from './refs';
import Notiflix from 'notiflix';
import checkInputData from './checkInputData';
import { createGallery, createGalleryNextPage } from './createGallery';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import smoothScroll from './smoothScrool';
import { renderDefaultMovies } from './renderDefaultMovies';

import { spinnerOn, spinnerOff } from './loader';

refs.form.addEventListener('submit', onClickSubmit);
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
  page += 1;
  fetchSearchFilm(value, page)
    .then(data => checkInputData(data, page))
    .catch(error => console.log(error));
  smoothScroll();
}

export default onClickSubmit;
