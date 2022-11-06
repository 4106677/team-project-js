const modal = document.querySelector('.modal');

modal.addEventListener('click', closeModal);

function closeModal() {
  instance.close();
}

document.addEventListener('keyup', closeModalEsc);
function closeModalEsc(evt) {
  console.log(evt);
  if (evt.code === 'Escape') {
    closeModal();
    document.removeEventListener('keyup', closeModalEsc);
  }
}
