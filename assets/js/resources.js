// Resources page — client-side filtering + search
(function () {
  var cards = Array.from(document.querySelectorAll('.resource-card'));
  var countEl = document.getElementById('resource-count');
  var emptyEl = document.getElementById('resources-empty');
  var searchInput = document.getElementById('resource-search');
  var categoryBtns = document.querySelectorAll('#category-filters .filter-pill');
  var typeBtns = document.querySelectorAll('#type-filters .filter-pill');

  var activeCategory = 'all';
  var activeType = 'all';
  var searchTerm = '';
  var debounceTimer;

  function applyFilters() {
    var visible = 0;
    var term = searchTerm.toLowerCase();

    cards.forEach(function (card) {
      var matchCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      var matchType = activeType === 'all' || card.dataset.type === activeType;
      var matchSearch = !term || card.textContent.toLowerCase().indexOf(term) !== -1;
      var show = matchCategory && matchType && matchSearch;
      card.hidden = !show;
      if (show) visible++;
    });

    countEl.textContent = visible;
    emptyEl.style.display = visible === 0 ? '' : 'none';
  }

  function bindPills(buttons, setter) {
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        setter(btn.dataset.filter);
        applyFilters();
      });
    });
    // activate "All" by default
    buttons[0].classList.add('active');
  }

  bindPills(categoryBtns, function (v) { activeCategory = v; });
  bindPills(typeBtns, function (v) { activeType = v; });

  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      searchTerm = searchInput.value;
      applyFilters();
    }, 200);
  });
})();
