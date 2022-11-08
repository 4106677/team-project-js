import { fetchSearchFilm } from './fetchAPI';
import refs from './refs';
import Notiflix from 'notiflix';
import checkInputData from './checkInputData';
import oneMovieCardTpl from '../templates/oneMovieCard.hbs';
import { renderDefaultMovies } from './renderDefaultMovies';

import { spinnerOn, spinnerOff } from './loader';
import updateResponce from './updateResponce';

refs.form.addEventListener('submit', onClickSubmit);
let value = null;
let page = 1;
const button = document.querySelector('.load-more');

function onClickSubmit(event) {
  event.preventDefault();

  value = refs.input.value.toLowerCase().trim();

  if (!value) {
    Notiflix.Notify.failure('Please, enter something to search');
    return;
  } else button.removeEventListener('click', renderDefaultMovies);
  spinnerOn();

  button.addEventListener('click', onRenderMovieCards);
  onRenderMovieCards();
  event.target.reset();
}

export default onClickSubmit;

// function createGallery(data) {
//   const array = data.data.results;
//   console.log('createGallery array', array);

//   refs.list.innerHTML = oneMovieCard(array);
// }
function onRenderMovieCards() {
  fetchSearchFilm(value)
    .then(data => {
      if (data.data.results.length === 0) {
        Notiflix.Notify.warning('Please enter correct querry');
      }
      return data.data.results;
    })
    .then(resp => {
      console.log('RESP', resp);
      const updatedResp = updateResponce(resp);
      // page += 1;
      return updatedResp;
    })
    .then(data => {
      console.log('DATA', data);
      refs.list.innerHTML = oneMovieCardTpl(data);
    })
    .catch(error => console.log(error))
    .finally(() => spinnerOff());
}
