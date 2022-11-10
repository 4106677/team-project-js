import {
  getDatabase,
  ref,
  set,
  query,
  onValue,
  remove,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8Xe_Nj5r_CTsQ1IiUWTLdW_hWsbx85Eg',
  authDomain: 'filmoteka-6051d.firebaseapp.com',
  databaseURL:
    'https://filmoteka-6051d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-6051d',
  storageBucket: 'filmoteka-6051d.appspot.com',
  messagingSenderId: '7192088333',
  appId: '1:7192088333:web:7a18c384db98030289ea44',
};

// Initialize Firebase

// функция записи в базу
function writeInDataBase(
  target,
  uid,
  filmID,
  title,
  genres,
  imageUrl,
  vote_average,
  release_date
) {
  console.log('target', target);
  console.log('target', uid);
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  set(ref(database, 'films/' + uid + '/' + target + '/' + filmID), {
    id: filmID,
    title: title,
    genres: genres,
    poster: imageUrl,
    vote_average: vote_average,
    year: release_date,
  });
}

// Чтение из базы данных
function readFromDataBase(uid, target) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const topUserPostsRef = query(ref(database, 'films/' + uid + '/' + target));

  onValue(topUserPostsRef, snapshot => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
}

// Чтение из базы данных и запись в localStorage
function setDataToLocalStorage(uid) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const watchedDB = query(ref(database, 'films/' + uid + '/' + 'watched'));
  const queueDB = query(ref(database, 'films/' + uid + '/' + 'queue'));

  onValue(watchedDB, snapshot => {
    const data = snapshot.val();
    localStorage.setItem('watched', JSON.stringify(Object.keys(data)));
  });

  onValue(queueDB, snapshot => {
    const data = snapshot.val();
    localStorage.setItem('queue', JSON.stringify(Object.keys(data)));
  });
}

// Удаление записи из базы данных
function deleteFromDB(uid, target, filmId) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  remove(ref(database, 'films/' + uid + '/' + target + '/' + filmId));
}

export {
  writeInDataBase,
  readFromDataBase,
  setDataToLocalStorage,
  deleteFromDB,
};
