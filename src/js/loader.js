const spinner = document.querySelector('.loader');


export function spinnerOn() {
  spinner.classList.remove('visually-hidden');
}

export function spinnerOf() {
  spinner.classList.add('visually-hidden');
}
