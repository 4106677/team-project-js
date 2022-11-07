
import axios from 'axios';

const API_KEY = '430ce39ddbb6d767664f5ab1d9d53645';
// const API_KEY2 = '3ab3f6572c3def6f6cf5801fb6522013';

async function fetchSearchFilm(data, page = 1) {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const URL = `${BASE_URL}?api_key=${API_KEY}&query=${data}&page=${page}`;

  try {
    const responce = axios.get(URL);

    return responce;
  } catch (error) {
    console.error('Something wrong! Can not search films' + error);
  }
}

async function onGetFilmGenres() {
  const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  const URL = `${BASE_URL}?api_key=${API_KEY}`;

  try {
    const responce = axios.get(URL);
    return responce;
  } catch (error) {
    console.error('Something wrong! Can not search films' + error);
  }
}

async function onGetTVGenres() {
  const BASE_URL = 'https://api.themoviedb.org/3/genre/tv/list';
  const URL = `${BASE_URL}?api_key=${API_KEY}`;

  try {
    const responce = axios.get(URL);
    return responce;
  } catch (error) {
    console.error('Something wrong! Can not search films' + error);
  }
}

export { fetchSearchFilm, onGetFilmGenres, onGetTVGenres };
