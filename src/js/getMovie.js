import axios from 'axios';

async function getMovie(id) {
  const API_KEY = '430ce39ddbb6d767664f5ab1d9d53645';
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const URL = `${BASE_URL}${id}?api_key=${API_KEY}`;

  try {
    const responce = axios.get(URL);
    return responce;
  } catch (error) {
    console.log('Something wrong! Can not search films' + error);
  }
}

export default getMovie;