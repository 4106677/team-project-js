// import watchedFilms from './js/watchedFilms';
// import queueFilms from './js/queueFilms';
import { getId } from './js/trailer';
import { setDataToLocalStorage } from './js/apps/dataBaseApi';
import { openLoginModal } from './js/modal-of-login';
import './js/team-modal-service';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './js/apps/fireBaseConfig';
import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import oneMovieCardTmp from './templates/oneMovieCard.hbs';
import modalDetailMovie from './js/modal-detail-movie';
import './js/theme';

// получаю все жанры и сохраняю в localstorage("genres")
if (!localStorage.getItem('genres')) getAllgenres();

// функция LogOut
//
if (localStorage.getItem('userEmail')) {
  const logOutRef = document.querySelector('#logout');
  logOutRef.addEventListener('click', () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('uid');
    localStorage.removeItem('watched');
    localStorage.removeItem('queue');
    document.location.reload();
  });
} else {
  // Если пользователь не авторизирован его преребрасывает на главную страницу
  location.href = './index.html';
}

const listSectionRef = document.querySelector('.movies-popular-list');
const inputWatchedRef = document.querySelector('#watched');
const inputQueueRef = document.querySelector('#queue');

inputWatchedRef.addEventListener('change', onWatchedInput);
inputQueueRef.addEventListener('change', onQueueInput);

// ============ первая загрузка страницы =================================
let userid = localStorage.getItem('uid');

// загрузка очередей фильмов в LocalStorage из DB

if (localStorage.getItem('uid')) {
  setDataToLocalStorage(userid);
}

if (userid) {
  readFromDataBase(userid, 'watched');
} else {
  listSectionRef.innerHTML = '<p> В списке пока еще нет фильмов</p>';
}
// =========================================================================

// Модалка с подробный описанием  фильма
modalDetailMovie();

// Press Watched button
function onWatchedInput() {
  readFromDataBase(userid, 'watched');
}

// Press Queue button
function onQueueInput() {
  readFromDataBase(userid, 'queue');
}

// Функция чтение из базы данных
function readFromDataBase(uid, target) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const topUserPostsRef = query(ref(database, 'films/' + uid + '/' + target));

  onValue(topUserPostsRef, snapshot => {
    try {
      const data = Object.values(snapshot.val());
      listSectionRef.innerHTML = oneMovieCardTmp(data);
    } catch {
      if (target === 'watched') {
        listSectionRef.innerHTML = '<p>Watched library is empty</p>';
      } else {
        listSectionRef.innerHTML = '<p>Queue library is empty</p>';
      }
    }
  });
}
