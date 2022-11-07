import { getDatabase, ref, set, query, onValue } from 'firebase/database';
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
  databaseURL:
    'https://filmoteka-6051d-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase

// функция записи в базу
function writeInDataBase(
  target,
  userEmail,
  filmID,
  title,
  genres,
  imageUrl,
  vote_average,
  release_date
) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  set(ref(database, 'films/' + userEmail + '/' + target + '/' + filmID), {
    filmID: filmID,
    title: title,
    genres: genres,
    imageUrl: imageUrl,
    vote_average: vote_average,
    release_date: release_date,
  });
}

async function readFromDataBase(uid, target) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const topUserPostsRef = await query(
    ref(database, 'films/' + uid + '/' + target)
  );
  await onValue(topUserPostsRef, snapshot => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
}

export { writeInDataBase, readFromDataBase };