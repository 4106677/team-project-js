window.addEventListener('scroll', function () {
  if (scrollY > 1500) {
    document.getElementById('btnUp').style.display = 'block';
  } else {
    document.getElementById('btnUp').style.display = 'none';
  }
});
