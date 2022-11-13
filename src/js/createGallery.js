import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './refs';

function createGallery(data, page) {
  if (page === 1) {
    refs.list.innerHTML = oneMovieCard(data);

    return;
  }
  refs.list.insertAdjacentHTML('beforeend', oneMovieCard(data));
}

export default createGallery;
