(function () {
  'use strict';

  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggle.addEventListener('click', function () {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
})();
