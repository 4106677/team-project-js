import * as basicLightbox from 'basiclightbox';
import modalMovieTmp from '../templates/detailDescriptionMovie.hbs';

import { fetchAboutMovies } from './apps/fetchApi';

// делигирование события на карточки с фильмами
export default function modalDetailMovie() {
  const moviesListSectionRef = document.querySelector('.movies-popular-list');

  moviesListSectionRef.addEventListener('click', clickOnCard);

  function clickOnCard(e) {
    e.preventDefault();
    const parentNode = e.target.parentNode.nodeName;
    if (parentNode !== 'LI' && parentNode !== 'PICTURE') {
      return;
    }
    const movieId = e.target.parentNode.dataset.id;
    console.log(movieId);

    //   отправление запроса на получание польной нформации  о фильме
    fetchAboutMovies(movieId).then(resp => {
      const genresList = JSON.parse(localStorage.getItem('genres'));

      console.log(resp.genres);

      // свойтва котогрые передаються в шаблон
      const props = {
        title: resp.original_title,
        poster_url: `https://image.tmdb.org/t/p/w300${resp.poster_path}`,
        vote_average: resp.vote_average,
        vote_count: resp.vote_count,
        original_title: resp.original_title,
        genres: resp.genres,
        overview: resp.overview,
      };
      const instance_2 = basicLightbox.create(modalMovieTmp(props));
      instance_2.show();
    });

    // fetchAboutMovies(movieId).then(data => {
    //   aboutMoviesModal(data);
    // });
  }
}
