import image from '/src/images/dev.jpg';
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
    document
      .querySelectorAll('.team-img-card')
      .forEach(el => el.classList.add('slide-team'));
    document.querySelector('.team-modal').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100wh';
  }

  closeTeamModal() {
    document.querySelector('.team-modal').classList.remove('is-open');
    document
      .querySelectorAll('.team-img-card')
      .forEach(el => el.classList.remove('slide-team'));
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
      <p class="team-card-work_text">${item.work}</p>
          <ul class="social-network list">
            <li class="social-network__item">
              <a href="${item.git}" class="social-network__link" aria-label="Фейсбук" target="_blank" rel="noopener noreferrer">
                <svg class="social-network__icon" width="17" height="17">
                  <use href="${icons}#github"></use>
                </svg>
              </a>
            </li>
            <li class="social-network__item">
              <a href="" class="social-network__link" aria-label="Линкедин" target="_blank" rel="noopener noreferrer">
                <svg class="social-network__icon" width="17" height="17">
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

const arrCards = [
  {
    card: 'card-1',
    name: 'Kateryna Dolotova!',
    work: 'Scrum Master',
    img: image,
    git: 'https://github.com/4106677/team-project-js',
  },
  {
    card: 'card-2',
    name: 'Diana',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/diana2907',
  },
  {
    card: 'card-3',
    name: 'Anna',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/anna-zau',
  },
  {
    card: 'card-4',
    name: 'Julia Ihnatenko',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/Lulu0502',
  },
  {
    card: 'card-5',
    name: 'Yaroslav Oliynyk',
    work: 'Team Lead',
    img: image,
    git: 'https://github.com/4106677',
  },
  {
    card: 'card-6',
    name: 'Yriy Protcyshin',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/YriyProtcyshin',
  },
  {
    card: 'card-7',
    name: 'Viktor Litvynchuk',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/Vendettich13',
  },
  {
    card: 'card-8',
    name: 'Romanyuk Roman!',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/4106677/team-project-js',
  },
  {
    card: 'card-9',
    name: 'Andrii Popov',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/Andrii0207',
  },
  {
    card: 'card-10',
    name: 'Oleksandr Pavlov',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/Oleksandr-Pavlov',
  },
  {
    card: 'card-11',
    name: 'Ihor Zhayvoron!',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/4106677/team-project-js',
  },
  {
    card: 'card-12',
    name: 'Maksym Lytovchenko',
    work: 'Frontend Developer',
    img: image,
    git: 'https://github.com/LITOHA-77',
  },
];

export const teamModalService = new TeamModalService();
