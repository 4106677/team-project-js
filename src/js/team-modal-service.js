import { arrCards } from './arrTeamForRender';
import icons from '/src/images/icons.svg';
class TeamModalService {
  constructor() {
    this.modalTeam = document.querySelector('.students-team');
    this.closeBtn = document.querySelector('.team-close-btn');
    this.overlayTeam = document.querySelector('.team-modal-overlay');
  }

  openTeamModal() {
    const markup = renderTeamMarkup(arrCards);
    teamList.innerHTML = markup;
    document.querySelectorAll('.team-img-card');
    // .forEach(el => el.classList.add('slide-team'))
    document.querySelector('.team-modal').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100wh';
  }

  closeTeamModal() {
    document.querySelector('.team-modal').classList.remove('is-open');
    document.querySelectorAll('.team-img-card');
    // .forEach(el => el.classList.remove('slide-team'))
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }

  onOverlay(e) {
    if (e.target === e.currentTarget) {
      this.closeTeamModal();
    }
  }
  eventListenerCreator() {
    this.modalTeam.addEventListener('click', this.openTeamModal);
    this.closeBtn.addEventListener('click', this.closeTeamModal);
    this.overlayTeam.addEventListener('click', e => this.onOverlay(e));
  }
}
const teamList = document.querySelector('.team-modal-content-box');

function renderTeamMarkup(cards) {
  return cards
    .map(
      item =>
        `<div class="team-img-card ${item.card}">
      <div class="img-container">
        <img src="${item.img}" alt="${item.name}"/>
      </div>
      <div class="team-card-box">
      <h3  class="team-card-text">${item.name}</h3>
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

export const teamModalService = new TeamModalService();
