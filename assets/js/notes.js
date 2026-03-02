// Notes page — client-side tag filtering + pagination
(function () {
  var cards = Array.from(document.querySelectorAll('.note-card'));
  var emptyEl = document.getElementById('notes-empty');
  var filterBtns = document.querySelectorAll('#notes-filters .filter-pill');
  var paginationEl = document.getElementById('notes-pagination');
  var PER_PAGE = 10;

  var activeTag = 'all';
  var currentPage = 1;

  function getFiltered() {
    return cards.filter(function (card) {
      if (activeTag === 'all') return true;
      var tags = card.dataset.tags.split(' ');
      return tags.indexOf(activeTag) !== -1;
    });
  }

  function render() {
    var filtered = getFiltered();
    var totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    // Hide all, then show current page
    cards.forEach(function (card) { card.hidden = true; });
    filtered.forEach(function (card, i) {
      card.hidden = i < start || i >= end;
    });

    emptyEl.style.display = filtered.length === 0 ? '' : 'none';
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    // Previous
    var prev = document.createElement('button');
    prev.className = 'page-btn';
    prev.textContent = '\u2190';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', function () {
      currentPage--;
      render();
      scrollToTop();
    });
    paginationEl.appendChild(prev);

    // Page numbers
    for (var i = 1; i <= totalPages; i++) {
      var btn = document.createElement('button');
      btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      btn.dataset.page = i;
      btn.addEventListener('click', function () {
        currentPage = parseInt(this.dataset.page);
        render();
        scrollToTop();
      });
      paginationEl.appendChild(btn);
    }

    // Next
    var next = document.createElement('button');
    next.className = 'page-btn';
    next.textContent = '\u2192';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', function () {
      currentPage++;
      render();
      scrollToTop();
    });
    paginationEl.appendChild(next);
  }

  function scrollToTop() {
    document.querySelector('.notes-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Tag filter clicks
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeTag = btn.dataset.filter;
      currentPage = 1;
      render();
    });
  });

  render();
})();
