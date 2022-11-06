import 'basiclightbox/dist/basicLightbox.min.css';
import { openLoginModal } from './js/modal-of-login';
import { getDatabase, ref, set } from 'firebase/database';

// userRegistration('test@user.net', '123456');

// Открытие модального окна входа и регистрации пользователя
openLoginModal();
