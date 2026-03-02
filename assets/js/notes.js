// Notes page — client-side tag filtering
(function () {
  var cards = Array.from(document.querySelectorAll('.note-card'));
  var emptyEl = document.getElementById('notes-empty');
  var filterBtns = document.querySelectorAll('#notes-filters .filter-pill');

  var activeTag = 'all';

  function applyFilter() {
    var visible = 0;

    cards.forEach(function (card) {
      var tags = card.dataset.tags.split(' ');
      var show = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      card.hidden = !show;
      if (show) visible++;
    });

    emptyEl.style.display = visible === 0 ? '' : 'none';
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeTag = btn.dataset.filter;
      applyFilter();
    });
  });
})();
