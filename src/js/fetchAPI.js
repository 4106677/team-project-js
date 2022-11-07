import axios from 'axios';
import Notiflix from 'notiflix';

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

export default fetchSearchFilm;
