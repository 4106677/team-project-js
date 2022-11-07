import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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
const app = initializeApp(firebaseConfig);

// ======== User Registration ===============================
function userRegistration(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode;
    });
}

// ======== User Authentication =============================
function userSingIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode;
    });
}

export { userRegistration, userSingIn };
