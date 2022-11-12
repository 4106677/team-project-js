const saveLs = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadLs = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const themeBtn = document.getElementById('toggle-theme-btn');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

const themeValue = loadLs('theme') ? loadLs('theme') : 'light';
saveLs('theme', themeValue);
document.body.classList.add(themeValue);
if (themeValue === 'light') {
  sun.style.visibility = 'hidden';
} else {
  moon.style.visibility = 'hidden';
}
themeBtn.addEventListener('click', () => {
  const val = loadLs('theme');
  if (val === 'light') {
    document.body.classList.add('dark');
    document.querySelector('.footer-section').classList.add('dark');
    moon.style.visibility = 'hidden';
    sun.style.visibility = 'visible';
    saveLs('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    document.querySelector('.footer-section').classList.remove('dark');
    sun.style.visibility = 'hidden';
    moon.style.visibility = 'visible';
    saveLs('theme', 'light');
  }
});
