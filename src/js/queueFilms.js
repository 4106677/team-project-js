import renderOneMovieCard from '../templates/oneMovieCard.hbs';

const queueButton = document.querySelector('#js-QueueButton');
const gallery = document.querySelector('.movies-popular-list');

const LOCAL_STORAGE_QUEUE = 'queueMovie';

queueButton.addEventListener('click', getQueueFilms);

function getQueueFilms() {
  const getFilms = localStorage.getItem(LOCAL_STORAGE_QUEUE);
  const data = JSON.parse(getFilms);

  if (data === null) {
    data = [];
  }
  gallery.innerHTML = '';
 
  renderOneMovieCard({ results: data }, true);
}