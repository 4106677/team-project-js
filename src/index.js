
import axios from 'axios';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import galleryMarkup from '/src/templates/galleryMarkup.hbs';
import { renderDefaultMovies } from './js/renderDefaultMovies';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import refs from './js/refs';
import fetchSearchFilm from './js/fetchAPI';
import response from './js/onSubmitSearch';
