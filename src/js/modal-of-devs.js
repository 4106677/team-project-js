const refs = {
  link: document.querySelector('#dev-list'),
  modal: document.querySelector('.backdrop'),
};

refs.link.addEventListener('click', openModalOfDevs);

export default function openModalOfDevs() {
  refs.modal.classList.toggle('isActive');
}
