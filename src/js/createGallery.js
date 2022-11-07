import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import refs from './refs';

import openModal from './openModal';

import updateResponce from './updateResponce';

// import checkInputData from './checkInputData';


function createGallery(data) {
  console.log('createGallery', data);

  // const updData = updateResponce(data);
  console.log('createGallery updData', data);


  refs.list.addEventListener('click', (event) => {
    event.preventDefault();
    const id = event.target.closest('[data-action="modal-open"]').dataset['id'];
    openModal(id);
  });

  refs.list.innerHTML = oneMovieCard(data);

}

export default createGallery;
