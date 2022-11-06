import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import refs from './refs';
import updateResponce from './updateResponce';

// import checkInputData from './checkInputData';

function createGallery(updateResponce) {
  console.log('createGallery', updateResponce);

  refs.list.innerHTML = oneMovieCard(updateResponce);
}

export default createGallery;
