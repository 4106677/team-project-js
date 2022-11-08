import * as basicLightbox from 'basiclightbox';
import modalMovieTmp from '../templates/detailDescriptionMovie.hbs';

import { fetchAboutMovies } from './apps/fetchApi';

import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { writeInDataBase } from './apps/dataBaseApi';

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

    //   отправление запроса на получание польной нформации  о фильме
    fetchAboutMovies(movieId).then(resp => {
      const genresList = JSON.parse(localStorage.getItem('genres'));

      // свойтва которые передаються в шаблон
      const userId = localStorage.getItem('uid');
      const props = {
        userId: userId,
        filmId: resp.id,
        title: resp.original_title,
        poster_url: resp.poster_path,
        vote_average: resp.vote_average,
        vote_count: resp.vote_count,
        original_title: resp.original_title,
        genres: resp.genres,
        overview: resp.overview,
        year: resp.release_date,
        popularity: resp.popularity.toFixed(1),
      };
      const instance_2 = basicLightbox.create(modalMovieTmp(props));
      instance_2.show();

      // ссылки на кнопки
      const watchedBtnRef = document.querySelector('.watched');
      const queueBtnRef = document.querySelector('.queue');

      // слушатели на  кнопки
      watchedBtnRef.addEventListener('click', addMovieToWatchedBase, props);
      queueBtnRef.addEventListener('click', addMovieToQueuedBase, props);
    });

    // добавление в ветку watched
    function addMovieToWatchedBase(props) {
      writeInDataBase(
        'watched',
        props['userId'],
        props['filmId'],
        props['title'],
        props['genres'],
        props['poster_url'],
        props['vote_average'],
        props['year']
      );
    }
    // добавление в ветку Queue
    function addMovieToQueuedBase(props) {
      writeInDataBase(
        'queue',
        props['userId'],
        props['filmId'],
        props['title'],
        props['genres'],
        props['poster_url'],
        props['vote_average'],
        props['year']
      );
    }
  }
}
