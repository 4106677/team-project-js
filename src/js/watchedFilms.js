import renderOneMovieCard from '../templates/OneMovieCard.hbs';

const watchedButton = document.querySelector('#js-WatchedButton');
const gallery = document.querySelector('.movies-popular-list');

const LOCAL_STORAGE_WATCHED = 'movies';

watchedButton.addEventListener('click', getWatchedFilms);

function getWatchedFilms() {
  const getFilms = localStorage.getItem(LOCAL_STORAGE_WATCHED);
  const data = JSON.parse(getFilms);
  const textCard = document.querySelector('.text-on-card');
  textCard.classList.toggle('visually-hidden');

  if (data === null) {
    data = [];
  }
  gallery.innerHTML = '';

  renderOneMovieCard({ results: data }, true);
}
