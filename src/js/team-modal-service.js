import { arrCards } from './arrTeamForRender';
import icons from '/src/images/icons.svg';

const modalTeam = document.querySelector('.students-team');
const closeBtn = document.querySelector('.team-close-btn');
const overlayTeam = document.querySelector('.team-modal-overlay');

modalTeam.addEventListener('click', openTeamModal);
closeBtn.addEventListener('click', closeTeamModal);
overlayTeam.addEventListener('click', e => onOverlay(e));

function openTeamModal() {
  const markup = renderTeamMarkup(arrCards);
  teamList.innerHTML = markup;
  document.querySelectorAll('.team-img-card');
  document.querySelector('.team-modal').classList.add('is-open');
  document.querySelector('.team-modal').classList.remove('visually-hidden');
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100wh';
  document.addEventListener('keyup', closeTeamModalEsc);
}

function closeTeamModal() {
  document.querySelector('.team-modal').classList.remove('is-open');
  document.querySelector('.team-modal').classList.add('visually-hidden');
  document.querySelectorAll('.team-img-card');
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';
}

function onOverlay(e) {
  if (e.target === e.currentTarget) {
    closeTeamModal();
  }
}

function closeTeamModalEsc(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
    document.removeEventListener('keyup', closeTeamModalEsc);
  }
}

const teamList = document.querySelector('.team-modal-content-box');

function renderTeamMarkup(cards) {
  return cards
    .map(
      item =>
        `<div class="team-img-card ${item.card}">
      <div class="img-container">
        <img src="${item.img}" alt="${item.name}" loading="lazy"/>
      </div>
      <div class="team-card-box">
      <h3  class="team-card-text">${item.name}</h3>
      <p class="team-card-text-work">${item.work}</p>
       <ul class="social-network list">
            <li class="social-network__item">
              <a href="${item.git}" class="social-network__link" aria-label="GitHab" target="_blank" rel="noopener noreferrer">
                <svg class="social-network__icon" width="18" height="18">
                  <use href="${icons}#github"></use>
                </svg>
              </a>
            </li>
            <li class="social-network__item">
              <a href="${item.in}" class="social-network__link" aria-label="linkedin" target="_blank" rel="noopener noreferrer">
                <svg class="social-network__icon" width="18" height="18">
                  <use href="${icons}#linkedin"></use>
                </svg>
              </a>
            </li>
          </ul>
          </div>
          </div>`
    )
    .join(' ');
}
