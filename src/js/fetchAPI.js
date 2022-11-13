import axios from 'axios';
import { API_KEY } from './apps/fetchApi';

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

// async function onGetFilmGenres() {
//   const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
//   const URL = `${BASE_URL}?api_key=${API_KEY}`;

//   try {
//     const responce = axios.get(URL);
//     return responce;
//   } catch (error) {
//     console.error('Something wrong! Can not search films' + error);
//   }
// }

// async function onGetTVGenres() {
//   const BASE_URL = 'https://api.themoviedb.org/3/genre/tv/list';
//   const URL = `${BASE_URL}?api_key=${API_KEY}`;

//   try {
//     const responce = axios.get(URL);
//     return responce;
//   } catch (error) {
//     console.error('Something wrong! Can not search films' + error);
//   }
// }

// export { fetchSearchFilm, onGetFilmGenres, onGetTVGenres };
export { fetchSearchFilm };
