import * as basicLightbox from 'basiclightbox';
import { userRegistration, userSingIn } from '../js/firebase';
import { getDatabase, ref, set } from 'firebase/database';
import loginUserForm from '../templates/loginUserForm.hbs';
import userRegistratinForm from '../templates/userRegistrationForm.hbs';

const loginRef = document.querySelector('#login');
const registrationRef = document.querySelector('#registration');
const navLibraryRef = document.querySelector('#nav-library');
const logOutRef = document.querySelector('#logout');
const gbaRef = document.querySelector('#gba');

if (localStorage.getItem('userEmail')) {
  navLibraryRef.removeAttribute('hidden');
  logOutRef.removeAttribute('hidden');
  gbaRef.innerText = localStorage.getItem('userEmail')[0];
  gbaRef.removeAttribute('hidden');
  gbaRef.classList.add('gba-active');

  loginRef.setAttribute('hidden', true);
  registrationRef.setAttribute('hidden', true);
}

const loginModal = basicLightbox.create(loginUserForm());

const registrationModal = basicLightbox.create(userRegistratinForm());

export function openLoginModal() {
  // финкция LogOut
  logOutRef.addEventListener('click', () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('uid');
    localStorage.removeItem('watched');
    localStorage.removeItem('queue');
    document.location.reload();
  });

  // Вход зарегистрированного пользователя
  loginRef.addEventListener('click', () => {
    loginModal.show();
    const modalFormBtn = document.querySelector('.login-form__button');

    modalFormBtn.addEventListener('click', e => {
      singIn(e); // фукция входа зарегистрированного пользоваьеля
    });
    document.addEventListener('keyup', closeModalEsc);

    function closeModalEsc(evt) {
      if (evt.code === 'Escape') {
        loginModal.close();
        document.removeEventListener('keyup', closeModalEsc);
      }
    }
  });

  // ===================== регистрация пользователя =======================
  registrationRef.addEventListener('click', () => {
    registrationModal.show();
    const modalFormBtn = document.querySelector('.login-form');

    modalFormBtn.addEventListener('submit', e => {
      registration(e); // фукция регистрации полдьзователя
    });
    document.addEventListener('keyup', closeModalEsc);

    function closeModalEsc(evt) {
      if (evt.code === 'Escape') {
        registrationModal.close();
        document.removeEventListener('keyup', closeModalEsc);
      }
    }
  });
}

// функция регистрации пользователя
function registration(e) {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;

  if (password !== password2) {
    document.querySelector('.error-message').innerHTML =
      'Please make sure your passwords match';
  } else {
    const user = userRegistration(email, password);

    user.then(user => {
      if (user === 'auth/email-already-in-use') {
        document.querySelector('.error-message').innerHTML =
          'Error!! Email already in use!!!!';
      } else {
        navLibraryRef.removeAttribute('hidden');
        logOutRef.removeAttribute('hidden');

        gbaRef.innerText = localStorage.getItem('userEmail')[0];
        gbaRef.removeAttribute('hidden');
        gbaRef.classList.add('gba-active');

        loginRef.setAttribute('hidden', true);
        registrationRef.setAttribute('hidden', true);
        registrationModal.close();
      }
    });
  }
}

// ===================== Вход зарегистрированного пользователя ==============
function singIn(e) {
  e.preventDefault();
  console.log(navLibraryRef);
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  const user = userSingIn(email, password);
  user.then(user => {
    console.log(user);
    if (user.email) {
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('uid', user.uid);

      gbaRef.innerText = localStorage.getItem('userEmail')[0];
      gbaRef.removeAttribute('hidden');
      gbaRef.classList.add('gba-active');

      loginModal.close();
      navLibraryRef.removeAttribute('hidden');
      logOutRef.removeAttribute('hidden');
      loginRef.setAttribute('hidden', true);
      registrationRef.setAttribute('hidden', true);
    } else if (user === 'auth/user-not-found') {
      document.querySelector('.error-message').innerHTML =
        'Пользователя с таким именем не существует !!!!';
    } else if (user === 'auth/wrong-password') {
      document.querySelector('.error-message').innerHTML =
        'Не правильный пароль !!!!';
    } else {
      document.querySelector('.error-message').innerHTML =
        'Ошибка входа в аккаунт !!!!';
    }
  });

  //   user.then(user => {
  //     console.log(user);
  //   });
  //   const user = userSingIn(email, password);
  //   user.then(user => {
  //     console.log(user);
  //   });
}
