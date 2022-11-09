window.addEventListener('scroll', function () {
  if (this.scrollY > 250) {
    document.getElementById('btnUp').style.display = 'block';
  } else {
    document.getElementById('btnUp').style.display = 'none';
  }
});
