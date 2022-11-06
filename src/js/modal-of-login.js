import * as basicLightbox from 'basiclightbox';
import { userRegistration, userSingIn } from '../js/firebase';
import { getDatabase, ref, set } from 'firebase/database';

const loginModal = basicLightbox.create(
  `
    <div class="modal-login">
        <img src="./images/login.png" alt="login image" />
        <p class="modal-login__login">Login</p>
        <p class="modal-login__welcome">Welcome back to account</p>
        <form class="login-form">
            <label for="email">Email</label>
            <input type="email" placeholder="example@mail.com" class="login-form__input" id="email-login">
            <label for="password">Password</label>
             <input type = "password" placeholder="At least 8 characters" class="login-form__input" id="password-login">
            <button type="submit" class="login-form__button">Login</button>
            <!-- <p class="login-form__alternate-access">Don’t have an account ? Register now!</p> -->
            
        </form>
    </div>
`
);

const registrationModal = basicLightbox.create(
  `
    <div class="modal-login">
        <img src="./images/login.png" alt="login image" />
        <p class="modal-login__login">Registration</p>
        <p class="modal-login__welcome">Create your new account</p>
        <form class="login-form">
            <label for="email">Email</label>
            <input type="email" placeholder="example@mail.com" class="login-form__input" id="email">
            <label for="password">Password</label>
            <input type = "password" placeholder="At least 8 characters" class="login-form__input" id="password">
             <label for="password">Check password</label>
             <input type = "checkPwd" placeholder="Type password again" class="login-form__input" checkPwd="checkPwd">
            <p class="error-message"></p>
             <button type="submit" class="login-form__button">Register Account</button>           
            
        </form>
    </div>
`
);

export function openLoginModal() {
  const loginRef = document.querySelector('#login');
  const registrationRef = document.querySelector('#registration');

  // Вход зарегистрированного пользователя
  loginRef.addEventListener('click', () => {
    loginModal.show();
    const modalFormBtn = document.querySelector('.login-form__button');
    console.log(modalFormBtn);
    modalFormBtn.addEventListener('click', e => {
      singIn(e); // фукция входа зарегистрированного пользоваьеля
    });
  });

  // ===================== регистрация пользователя =======================
  registrationRef.addEventListener('click', () => {
    registrationModal.show();
    const modalFormBtn = document.querySelector('.login-form');
    modalFormBtn.addEventListener('submit', e => {
      registration(e); // фукция регистрации полдьзователя
    });
  });
}

function registration(e) {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const user = userRegistration(email, password);

  user.then(user => {
    if (user === 'auth/email-already-in-use') {
      document.querySelector('.error-message').innerHTML =
        'Error!! Email already in use!!!!';
    } else {
      localStorage.setItem('userEmail', user.email);
      registrationModal.close();
    }
  });
}

// ===================== Вход зарегистрированного пользователя ==============
function singIn(e) {
  e.preventDefault();
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  const user = userSingIn(email, password);
  user.then(data => {
    console.log('data', data);
  });

  //   user.then(user => {
  //     console.log(user);
  //   });
  //   const user = userSingIn(email, password);
  //   user.then(user => {
  //     console.log(user);
  //   });
}

// ================= запись в базу данных ==================

// const userID = '9999';
// const filmID = '6666666';
// const filmName = 'Black Adam part 2';
// const genres = ['Action', 'Fantasy', 'Science', 'Fiction'];

// writeUserData(userID, filmID, filmName, genres);

// function writeUserData(userID, filmID, filmName, genres) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userID + '/' + filmID), {
//     filmID: filmID,
//     filmName: filmName,
//     genres: genres,
//   });
// }