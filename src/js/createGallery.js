import onClickSubmit from './onSubmitSearch';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './refs';

function createGallery(data) {
  const array = data.data.results;
  console.log('createGallery array', array);

  refs.list.innerHTML = oneMovieCard(array);
}

export default createGallery;
