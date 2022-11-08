import * as basicLightbox from 'basiclightbox';
import modalMovieTmp from '../templates/detailDescriptionMovie.hbs';

import { fetchAboutMovies } from './apps/fetchApi';

import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { writeInDataBase } from './apps/dataBaseApi';

let prop = null;

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
      let arr = [];
      for (const name of resp.genres) {
        arr.push(name.name);
      }
      // свойтва которые передаються в шаблон
      const userId = localStorage.getItem('uid');
      const props = {
        userId: userId,
        filmId: resp.id,
        title: resp.original_title,
        poster_url: resp.poster_path,
        vote_average: resp.vote_average.toFixed(1),
        vote_count: resp.vote_count,
        original_title: resp.original_title,
        genres: arr.join(', '),
        overview: resp.overview,
        year: resp.release_date,
        popularity: resp.popularity.toFixed(1),
      };
      const instance_2 = basicLightbox.create(modalMovieTmp(props));

      instance_2.show();

      // ссылки на кнопки
      const watchedBtnRef = document.querySelector('.watched');
      const queueBtnRef = document.querySelector('.queue');
      const closeCross = document.querySelector('#close-btn');

      // слушатели на  кнопки

      watchedBtnRef.addEventListener('click', addMovieToWatchedBase);

      document.addEventListener('keyup', closeModalEsc);

      function closeModalEsc(evt) {
        if (evt.code === 'Escape') {
          instance_2.close();
          document.removeEventListener('keyup', closeModalEsc);
        }
      }
      closeCross.addEventListener('click', onCloseModal);
      function onCloseModal() {
        instance_2.close();
        closeCross.removeEventListener('click', onCloseModal);
      }
    });

    // добавление в ветку watched
    function addMovieToWatchedBase() {
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
    function addMovieToQueuedBase() {
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
