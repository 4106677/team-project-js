import fetchSearchFilm from './fetchAPI';
import refs from './refs';
import Notiflix from 'notiflix';
import checkInputData from './checkInputData';
import { spinnerOn, spinnerOff } from './loader';

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
  spinnerOn();
  fetchSearchFilm(value, page)
    .then(checkInputData)
    // .then(resp => console.log('responce', resp))
    .catch(error => console.log(error))
    .finally(() => spinnerOff());
  event.target.reset();
}

export default onClickSubmit;

// function createGallery(data) {
//   const array = data.data.results;
//   console.log('createGallery array', array);

//   refs.list.innerHTML = oneMovieCard(array);
// }
