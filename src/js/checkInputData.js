import createGallery from './createGallery';
import Notiflix from 'notiflix';

function checkInputData(responce) {
  console.log('checkInputData', responce);
  const responceResult = responce.data.results;

  if (responceResult.length === 0) {
    Notiflix.Notify.warning('Sorry... the movie was not found. Try change your search');
    return;
  } else {
    createGallery(responceResult);
  }
}

export default checkInputData;
