import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import Notiflix from 'notiflix';
import refs from './refs';
// import onClickSubmit from './onSubmitSearch';
// import response from './onSubmitSearch';

// console.log(response);

function createGallery(responce) {
  const array = responce.data.results;
  console.log('createGallery array', array);

  if (array.length === 0) {
    Notiflix.Notify.info('Sorry, we have found nothing. Try change your search');
    return;
  }
  refs.list.innerHTML = oneMovieCard(array);
}

export default createGallery;
