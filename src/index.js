import 'basiclightbox/dist/basicLightbox.min.css';
import { openLoginModal } from './js/modal-of-login';
import { getDatabase, ref, set } from 'firebase/database';
import modalDetailMovie from './js/modal-detail-movie';
import getAllgenres from './js/apps/getAllGenres';

// получаю все жанры и сохраняю в localstorage("genres")
getAllgenres();

// userRegistration('test@user.net', '123456');

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
import { teamModalService } from './js/team-modal-service';
teamModalService.eventListenerCreator();

// Модалка с подробный описанием  фильма
modalDetailMovie();
