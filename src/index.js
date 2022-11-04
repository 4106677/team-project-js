import axios from 'axios';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import createGallery from '../templates/createGallery.hbs';

const refs = {
  input: document.querySelector('#search-form'),
  list: document.querySelector('.nav list'),
};

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

refs.input.addEventListener('submit', onClickSubmit);
let value = null;
let page = 1;

function onClickSubmit(e) {
  e.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  fetchSearchFilm(searchData)
    // .then(responce => createGallery(responce, page))
    .then(resp => console.log('responce', resp.data))
    .catch(error => console.log(error));
}

function createGallery(data) {
  console.log(data);
  refs.list.insertAdjacentElement('beforeend', galleryMarkup(data));
}
