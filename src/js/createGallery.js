import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './refs';

function createGallery(data, page) {
  console.log('createGallery data:', data);
  console.log('createGallery page:', page);

  if (page === 1) {
    refs.list.innerHTML = oneMovieCard(data);
    return;
  }
  refs.list.insertAdjacentHTML('beforeend', oneMovieCard(data));
}

export default createGallery;
