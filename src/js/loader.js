const spinner = document.querySelector('.loader');

export function spinnerOn() {
  spinner.classList.remove('visually-hidden');
}

export function spinnerOff() {
  spinner.classList.add('visually-hidden');
}
