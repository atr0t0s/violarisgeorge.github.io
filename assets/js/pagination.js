// Generic client-side pagination for entry lists
function initPagination(opts) {
  var containerSel = opts.container;
  var entrySel = opts.entry;
  var paginationSel = opts.pagination;
  var perPage = opts.perPage || 5;

  var container = document.querySelector(containerSel);
  if (!container) return;

  var entries = Array.from(container.querySelectorAll(entrySel));
  var paginationEl = document.querySelector(paginationSel);
  if (!entries.length || !paginationEl) return;

  var currentPage = 1;

  function render() {
    var totalPages = Math.max(1, Math.ceil(entries.length / perPage));
    if (currentPage > totalPages) currentPage = totalPages;

    var start = (currentPage - 1) * perPage;
    var end = start + perPage;

    entries.forEach(function (entry, i) {
      entry.hidden = i < start || i >= end;
    });

    renderButtons(totalPages);
  }

  function renderButtons(totalPages) {
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    var prev = document.createElement('button');
    prev.className = 'page-btn';
    prev.textContent = '\u2190';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', function () {
      currentPage--;
      render();
      scrollUp();
    });
    paginationEl.appendChild(prev);

    for (var i = 1; i <= totalPages; i++) {
      var btn = document.createElement('button');
      btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
      btn.textContent = i;
      btn.dataset.page = i;
      btn.addEventListener('click', function () {
        currentPage = parseInt(this.dataset.page);
        render();
        scrollUp();
      });
      paginationEl.appendChild(btn);
    }

    var next = document.createElement('button');
    next.className = 'page-btn';
    next.textContent = '\u2192';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', function () {
      currentPage++;
      render();
      scrollUp();
    });
    paginationEl.appendChild(next);
  }

  function scrollUp() {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render();
}
