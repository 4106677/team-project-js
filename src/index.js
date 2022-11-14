import 'basiclightbox/dist/basicLightbox.min.css';
import { openLoginModal } from './js/modal-of-login';
import { getDatabase, ref, set } from 'firebase/database';
import modalDetailMovie from './js/modal-detail-movie';
import getAllgenres from './js/apps/getAllGenres';
import { setDataToLocalStorage } from './js/apps/dataBaseApi';

// получаю все жанры и сохраняю в localstorage("genres")
if (!localStorage.getItem('genres')) getAllgenres();

// Проверка зарегистрирован ли пользователь на сайте

let userId = localStorage.getItem('uid');
if (userId) {
  setDataToLocalStorage(userId); // загрузка id сохранненных фильмов из базы в localStorage
} else {
  localStorage.removeItem('watched');
  localStorage.removeItem('queue');
}

// Открытие модального окна входа и регистрации пользователя
openLoginModal();

import axios from 'axios';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
// import galleryMarkup from '/src/templates/galleryMarkup.hbs';
import { renderDefaultMovies } from './js/renderDefaultMovies';
import { getId } from './js/trailer';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './js/refs';
import fetchSearchFilm from './js/fetchAPI';
import response from './js/onSubmitSearch';
import './js/team-modal-service';

// Модалка с подробный описанием  фильма
modalDetailMovie();
import './js/theme';
import './js/btnUp.js';
import './js/lazyScrol.js';
