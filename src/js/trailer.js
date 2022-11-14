import * as basicLightbox from 'basiclightbox';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
let movieId = '';
let button = null;
// ---------получить id----------

const moviesListSectionRef = document.querySelector('.movies-popular-list');

moviesListSectionRef.addEventListener('click', clickOnTheCard);

export default function clickOnTheCard(e) {
  const parentNode = e.target.parentNode.nodeName;
  console.log(e.target.parentNode);
  movieId = e.target.parentNode.dataset.id;
  const onBtn = () => {
    setTimeout(() => {
      const button = document.querySelector('.trailer__button');
      button.addEventListener('click', fetchTrailer);
    }, 250);
  };
  onBtn();
  function fetchTrailer() {
    const URL = `${BASE_URL}${movieId}/videos?api_key=3ab3f6572c3def6f6cf5801fb6522013&language=en-US`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fail');
        }
        return response.json();
      })
      .then(data => {
        if (!data.results[0]) {
          button.textContent = 'Trailer is not avaliable';
          button.disabled = true;
        }
        if (data.results[0]) {
          const trailerKey = data.results[0].key;
          createTrailer(trailerKey);
        } else {
          return;
        }
      });
  }
}

function createTrailer(trailerKey) {
  const trailerVideo = basicLightbox.create(`<iframe width="880" height="600" 
src="https://www.youtube.com/embed/${trailerKey}" 
frameborder = "0" 
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen > </iframe>`);
  trailerVideo.show();

  document.addEventListener('keyup', closeModalEsc);

  function closeModalEsc(evt) {
    if (evt.code === 'Escape') {
      trailerVideo.close();
      document.removeEventListener('keyup', closeModalEsc);
    }
  }
}
