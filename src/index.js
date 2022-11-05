import axios from 'axios';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import galleryMarkup from '/src/templates/galleryMarkup.hbs';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('#search-form'),
  list: document.querySelector('.movies-popular-list'),
};

console.log(refs.list);

async function fetchSearchFilm(data, page = 1) {
  const API_KEY = '430ce39ddbb6d767664f5ab1d9d53645';
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const URL = `${BASE_URL}?api_key=${API_KEY}&query=${data}&page=${page}`;

  try {
    const responce = axios.get(URL);
    return responce;
  } catch (error) {
    console.log('Something wrong! Can not search films' + error);
  }
}

refs.form.addEventListener('submit', onClickSubmit);
let value = null;
let page = 1;

function onClickSubmit(event) {
  event.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  fetchSearchFilm(value, page)
    .then(createGallery)
    // .then(resp => console.log('responce', resp))
    .catch(error => console.log(error));
}

function createGallery(data) {
  console.log('createGallery data', data);
  const array = data.data.results;
  console.log('createGallery array', array);

  refs.list.innerHTML = oneMovieCard(array);
}
