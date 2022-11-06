import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import refs from './refs';
// import checkInputData from './checkInputData';

function createGallery(responce) {
  refs.list.innerHTML = oneMovieCard(responce);
}

export default createGallery;
