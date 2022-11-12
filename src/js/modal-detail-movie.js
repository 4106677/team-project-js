import * as basicLightbox from 'basiclightbox';
import modalMovieTmp from '../templates/detailDescriptionMovie.hbs';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchAboutMovies } from './apps/fetchApi';

import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import fetchTrailer from './trailer';
import { initializeApp } from 'firebase/app';
import {
  writeInDataBase,
  setDataToLocalStorage,
  deleteFromDB,
} from './apps/dataBaseApi';

const body = document.querySelector('body');

let props = null;
let watchedBtnRef = null;
let queueBtnRef = null;
let closeBtn = null;
let instance_2 = null;

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
    body.classList.add('overflow-hidden');
    const movieId = e.target.parentNode.dataset.id;

    // получаю id user
    const userId = localStorage.getItem('uid');

    console.log(userId);

    //   отправление запроса на получание польной нформации  о фильме
    fetchAboutMovies(movieId).then(resp => {
      // создаю новый объект который передаються в шаблон
      const genreArr = resp.genres.map(genre => genre.name);
      let genreList = [];

      if (genreArr.length !== 0) {
        if (genreArr.length > 3) {
          genreList = genreArr.slice(0, 2).push('Other');
        } else {
          genreList = genreArr;
        }
      } else genreList.push('Other');

      props = {
        userId: userId,
        filmId: resp.id,
        title: resp.title,
        poster_url: resp.poster_path,
        vote_average: resp.vote_average.toFixed(1),
        vote_count: resp.vote_count,
        original_title: resp.original_title,
        popularity: resp.popularity.toFixed(1),
        genres: genreList,
        overview: resp.overview,
        year: resp.release_date.split('-')[0],
      };
      // ----------------------------------------------------------------------------

      // создание модального окна
      instance_2 = basicLightbox.create(modalMovieTmp(props));
      const movieLB = document.querySelector('.movie-card');
      movieLB.addEventListener('click', createLightbox);
      function createLightbox() {
        instance_2.show();

        if (e.currentTarget !== e.target) {
          console.log('rr');
          const basicLb = document.querySelector('.basicLightbox');
          basicLb.addEventListener('click', () => {
            body.classList.remove('overflow-hidden');
            instance_2.close();
          });
        }
      }
      createLightbox();

      // ссылки на кнопки
      watchedBtnRef = document.querySelector('.watched');
      queueBtnRef = document.querySelector('.queue');
      closeBtn = document.querySelector('#close-btn');

      // слушатели на  кнопки

      // если юзер не загрегистрирован, то при клике на кнопку вывод сообщения
      if (userId) {
        watchedBtnRef.addEventListener('click', addMovieToWatchedBase); // добавление в Watched
        queueBtnRef.addEventListener('click', addMovieToQueuedBase); // добавление в Queue
      } else {
        watchedBtnRef.addEventListener('click', showToLogInNessage); // добавление в Watched
        queueBtnRef.addEventListener('click', showToLogInNessage); // добавление в Queue
      }

      closeBtn.addEventListener('click', onCloseModal); // закрытие модалки
      document.addEventListener('keyup', closeModalEsc);

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
  }
}

// Удаление из Watched базы данных
function deleteItemfromWatchedDb() {
  deleteFromDB(props.userId, 'watched', props.filmId);
  watchedBtnRef.innerText = 'add to watched';
  watchedBtnRef.classList.remove('in-library');
  watchedBtnRef.removeAttribute('disabled');
  watchedBtnRef.addEventListener('click', addMovieToWatchedBase); // слушатель на добавление фильма
}

// Удаление из Queue базы данных
function deleteItemfromQueueDb() {
  deleteFromDB(props.userId, 'queue', props.filmId);
  queueBtnRef.innerText = 'add to queue';
  queueBtnRef.classList.remove('in-library');
  queueBtnRef.removeAttribute('disabled');
  queueBtnRef.addEventListener('click', addMovieToQueuedBase); // слушатель на добавление фильма
}

// добавление  фильма в ветку watched базы данных
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
  watchedBtnRef.innerText = 'delete from watched';
  watchedBtnRef.classList.add('in-library');
  watchedBtnRef.getAttribute('disabled', '');
  watchedBtnRef.addEventListener('click', deleteItemfromWatchedDb, props); // слушатель на удаление фильма

  // если фильм добавляется в WatchedBase он должен удалиться из QueueD
  deleteItemfromQueueDb();
}

// добавление  фильма в ветку Queue
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
  queueBtnRef.innerText = 'delete from queue';
  queueBtnRef.classList.add('in-library');
  queueBtnRef.getAttribute('disabled', '');
  queueBtnRef.addEventListener('click', deleteItemfromQueueDb); // слушатель на удаление фильма

  // если фильм добавляется в QueuedBase он должен удалиться из WatchedDb
  deleteItemfromWatchedDb();
}

// Проверка есть фильм с указанным ID в базе даных
// Возвращает название очереди в которой находиться фильм
function isMovieInBase(movieId) {
  const watchedBd = JSON.parse(localStorage.getItem('watched'));
  const queueBd = JSON.parse(localStorage.getItem('queue'));

  if (watchedBd.includes(movieId.toString())) {
    return 'watched';
  }
  if (queueBd.includes(movieId.toString())) {
    return 'queue';
  }
}

// Закрытие модалки
function onCloseModal() {
  body.classList.remove('overflow-hidden');
  const button = document.querySelector('.trailer__button');

  button.removeEventListener('click', fetchTrailer);
  instance_2.close();
  closeBtn.removeEventListener('click', onCloseModal);
}

// Сообщение о необходимости зарегистрироваться
function showToLogInNessage() {
  Notify.failure(
    'Sorry! You must be logged in to add a movie to your library.'
  );
}

function closeModalEsc(evt) {
  if (evt.code === 'Escape') {
    body.classList.remove('overflow-hidden');
    const button = document.querySelector('.trailer__button');

    button.removeEventListener('click', fetchTrailer);
    instance_2.close();
    document.removeEventListener('keyup', closeModalEsc);
  }
}

// Сообщение о необходимости зарегистрироваться
function showToLogInNessage() {
  Notify.failure(
    'Sorry! You must be logged in to add a movie to your library.'
  );
}
