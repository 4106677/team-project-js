import createGallery from './createGallery';
import Notiflix from 'notiflix';
import updateResponce from './updateResponce';

function checkInputData(responce, page) {
  console.log('checkInputData responce:', responce);
  console.log('checkInputData page:', page);
  const responceResult = responce.data.results;
  console.log('checkInputData responce.data.results:', responceResult);

  if (responceResult.length === 0) {
    Notiflix.Notify.warning(
      'Sorry... the movie was not found. Try change your search'
    );
    return;
  } else {
    updateResponce(responceResult, page);
  }
}

export default checkInputData;
