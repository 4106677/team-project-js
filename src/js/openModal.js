import getMovie from "./getMovie";
import modal from '/src/templates/modal.hbs';
import refs from './refs';

function openModal(id) {
    getMovie(id).then(response => {
        const data = response.data;
        refs.body.insertAdjacentHTML('beforeend', modal(data));
        
        document.querySelector('[data-action="modal-close"]').addEventListener('click', () => {
            document.querySelector('.modal-backdrop').remove();
        }, true);
    });
}

export default openModal;