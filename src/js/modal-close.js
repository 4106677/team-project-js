import openModalOfDevs from './modal-of-devs';
const backdrop = document.querySelector('.backdrop');

backdrop.addEventListener('click', closeModal);

function closeModal() {
  backdrop.classList.remove('isActive');
}

document.addEventListener('keyup', closeModalEsc);

function closeModalEsc(evt) {
  console.log(evt);
  if (evt.code === 'Escape') {
    closeModal();
    document.removeEventListener('keyup', closeModalEsc);
  }
}
