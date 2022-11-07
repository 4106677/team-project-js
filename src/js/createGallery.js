import onClickSubmit from './onSubmitSearch';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './refs';
import openModal from './openModal';

function createGallery(data) {
  const array = data.data.results;
  console.log('createGallery array', array);

  refs.list.innerHTML = oneMovieCard(array);

  refs.list.addEventListener('click', (event) => {
    event.preventDefault();
    const id = event.target.closest('[data-action="modal-open"]').dataset['id'];
    openModal(id);
  });
}

export default createGallery;
