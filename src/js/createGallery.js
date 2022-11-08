import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import refs from './refs';
import updateResponce from './updateResponce';

// import checkInputData from './checkInputData';

function createGallery(data) {
  console.log('createGallery', data);

  // const updData = updateResponce(data);
  console.log('createGallery updData', data);

  refs.list.innerHTML = oneMovieCard(data);
}

export default createGallery;
