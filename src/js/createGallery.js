import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './refs';
// import onClickSubmit from './onSubmitSearch';
// import response from './onSubmitSearch';

// console.log(response);

function createGallery(responce) {
  const array = responce.data.results;
  console.log('createGallery array', array);

  if (responce.length === 0) {
  }
  refs.list.innerHTML = oneMovieCard(array);
}

export default createGallery;
