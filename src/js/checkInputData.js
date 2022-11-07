import createGallery from './createGallery';
import Notiflix from 'notiflix';
import updateResponce from './updateResponce';

function checkInputData(responce) {
  console.log('checkInputData', responce);
  const responceResult = responce.data.results;
  console.log('checkInputData responce.data.results:', responceResult);

  if (responceResult.length === 0) {
    Notiflix.Notify.warning('Sorry... the movie was not found. Try change your search');
    return;
  } else {
    updateResponce(responceResult);
  }
}

export default checkInputData;
