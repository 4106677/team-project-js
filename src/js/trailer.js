import * as basicLightbox from 'basiclightbox';

const API_KEY = '430ce39ddbb6d767664f5ab1d9d53645';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
let movieId = '';

// ---------получить id----------

const moviesListSectionRef = document.querySelector('.movies-popular-list');

moviesListSectionRef.addEventListener('click', clickOnTheCard);

function clickOnTheCard(e) {
  const parentNode = e.target.parentNode.nodeName;
  movieId = e.target.parentNode.dataset.id;
  console.log(movieId);
  // button.addEventListener('click', fetchTrailer);

  const onBtn = () => {
    setTimeout(() => {
      const button = document.querySelector('.trailer__button');
      console.log(button);
      button.addEventListener('click', fetchTrailer);
    }, 250);
  };
  onBtn();
  function fetchTrailer() {
    console.log(movieId);
    const URL = `${BASE_URL}${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fail');
        }
        return response.json();
      })
      .then(data => {
        if (data.results[0]) {
          console.log(data.results);
          const trailerKey = data.results[0].key;
          console.log(trailerKey);
          createTrailer(trailerKey);
        } else {
          console.log('No triler');
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
