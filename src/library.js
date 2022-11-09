// import watchedFilms from './js/watchedFilms';
// import queueFilms from './js/queueFilms';
import { writeInDataBase } from './js/apps/dataBaseApi';
import { openLoginModal } from './js/modal-of-login';
import { teamModalService } from './js/team-modal-service';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './js/apps/fireBaseConfig';
import { getDatabase, ref, set, query, onValue } from 'firebase/database';
import oneMovieCardTmp from './templates/oneMovieCard.hbs';
import modalDetailMovie from './js/modal-detail-movie';

teamModalService.eventListenerCreator();

const listSectionRef = document.querySelector('.movies-popular-list');
const inputWatchedRef = document.querySelector('#watched');
const inputQueueRef = document.querySelector('#queue');

inputWatchedRef.addEventListener('change', onWatchedInput);
inputQueueRef.addEventListener('change', onQueueInput);

// ============ первая загрузка страницы =================================
let userid = localStorage.getItem('uid');

// userid = 'E7bAOKLi5uVo2RVCvy4tGxdEo7T2';
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

console.dir(inputWatchedRef);

// Функция чтение из базы данных
function readFromDataBase(uid, target) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const topUserPostsRef = query(ref(database, 'films/' + uid + '/' + target));
  console.log(topUserPostsRef);
  onValue(topUserPostsRef, snapshot => {
    const data = Object.values(snapshot.val());
    console.log(data);

    listSectionRef.innerHTML = oneMovieCardTmp(data);
  });
}

// Открытие модального окна входа и регистрации пользователя
// openLoginModal();
