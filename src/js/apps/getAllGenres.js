import { fetchMoviesGenres, fetchTVShowGenres } from './fetchApi';

export default async function getAllGenres() {
  const genresList = {};
  await fetchMoviesGenres().then(resp => {
    resp.genres.forEach(item => {
      genresList[item.id] = item.name;
    });
  });
  await fetchTVShowGenres().then(resp => {
    resp.genres.forEach(item => {
      genresList[item.id] = item.name;
    });
  });

  localStorage.setItem('genres', JSON.stringify(genresList));
}
