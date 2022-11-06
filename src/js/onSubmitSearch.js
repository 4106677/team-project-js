import fetchSearchFilm from './fetchAPI';
import refs from './refs';
// import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import createGallery from './createGallery';
import checkInputData from './checkInputData';

refs.form.addEventListener('submit', onClickSubmit);
let value = null;
let page = 1;

function onClickSubmit(event) {
  event.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  if (!value) {
    Notiflix.Notify.failure('Please, enter something to search');
    return;
  }

  fetchSearchFilm(value, page)
    .then(checkInputData)
    // .then(resp => console.log('responce', resp))
    .catch(error => console.log(error));
  event.target.reset();
}

export default onClickSubmit;

// function createGallery(data) {
//   const array = data.data.results;
//   console.log('createGallery array', array);

//   refs.list.innerHTML = oneMovieCard(array);
// }
