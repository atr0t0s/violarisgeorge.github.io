(function () {
  document.querySelectorAll('.cv-entry').forEach(function (entry) {
    var details = entry.querySelector('.cv-details');
    if (!details) return;

    entry.classList.add('cv-entry--expandable');

    entry.addEventListener('click', function (e) {
      // Don't toggle if clicking a link
      if (e.target.closest('a')) return;
      entry.classList.toggle('cv-entry--open');
    });
  });
})();
