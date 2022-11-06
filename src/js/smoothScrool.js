import refs from './refs';

function smoothScroll() {
  const { height: cardHeight } = refs.list.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export default smoothScroll;
