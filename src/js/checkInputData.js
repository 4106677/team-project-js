import createGallery from './createGallery';
import onClickSubmit from './onSubmitSearch';
import Notiflix from 'notiflix';
import refs from './refs';

function checkInputData(responce) {
  console.log('checkInputData', responce);
  const responceResult = responce.data.results;

  if (responceResult.length === 0) {
    Notiflix.Notify.failure('Sorry... the movie was not found. Try change your search');
    return;
  } else {
    createGallery(responceResult);
  }
}

export default checkInputData;
