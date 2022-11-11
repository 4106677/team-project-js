import * as basicLightbox from 'basiclightbox';
import modalMovieTmp from '../templates/detailDescriptionMovie.hbs';

import { fetchAboutMovies } from './apps/fetchApi';

import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { writeInDataBase } from './apps/dataBaseApi';

let props = null;

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
      // const genresList = JSON.parse(localStorage.getItem('genres'));

      // свойтва которые передаються в шаблон
      const userId = localStorage.getItem('uid');

      props = {
        userId: userId,
        filmId: resp.id,
        title: resp.original_title,
        poster_url: resp.poster_path,
        vote_average: resp.vote_average.toFixed(1),
        vote_count: resp.vote_count,
        original_title: resp.original_title,
        popularity: resp.popularity.toFixed(1),
        genres: resp.genres.map(genre => genre.name).join(', '),
        overview: resp.overview,
        year: resp.release_date.split('-')[0],
      };

      const instance_2 = basicLightbox.create(modalMovieTmp(props));
      instance_2.show();

      // ссылки на кнопки
      const watchedBtnRef = document.querySelector('.watched');
      const queueBtnRef = document.querySelector('.queue');
      const closeBtn = document.querySelector('#close-btn');

      // слушатели на  кнопки
      watchedBtnRef.addEventListener('click', addMovieToWatchedBase); // добавление в Watched
      queueBtnRef.addEventListener('click', addMovieToQueuedBase); // добавление в Queue
      closeBtn.addEventListener('click', onCloseModal); // закрытие модалки

      // проверка есть ли данный фильм в базе данных
      // если есть добавлянтся стиль кнопки "in-library" и добавляю аттрибут disabled
      if (isMovieInBase(props.filmId) === 'watched') {
        watchedBtnRef.innerText = 'delete from watched';
        watchedBtnRef.classList.add('in-library');
        watchedBtnRef.getAttribute('disabled', '');
        watchedBtnRef.addEventListener('click', deleteItemfromWatchedDb, props); // слушатель на удаление фильма
      }

      if (isMovieInBase(props.filmId) === 'queue') {
        queueBtnRef.innerText = 'delete from queue';
        queueBtnRef.classList.add('in-library');
        queueBtnRef.getAttribute('disabled', '');
        queueBtnRef.addEventListener('click', deleteItemfromQueueDb, props); // слушатель на удаление фильма
      }
      // ------------------------------------------------------------------------------
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
