(function () {
  'use strict';

  var searchToggle = document.getElementById('search-toggle');
  var overlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchClose = document.getElementById('search-close');

  if (!searchToggle || !overlay || !searchInput || !searchResults || !searchClose) return;

  var index = null;
  var documents = null;
  var debounceTimer = null;

  function loadIndex(callback) {
    if (index) { callback(); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search.json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) return;
      documents = JSON.parse(xhr.responseText);
      index = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        for (var i = 0; i < documents.length; i++) {
          this.add(documents[i]);
        }
      });
      callback();
    };
    xhr.send();
  }

  function getDocument(url) {
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].url === url) return documents[i];
    }
    return null;
  }

  function getExcerpt(content, terms) {
    var lower = content.toLowerCase();
    var bestPos = 0;
    for (var i = 0; i < terms.length; i++) {
      var pos = lower.indexOf(terms[i].toLowerCase());
      if (pos !== -1) { bestPos = pos; break; }
    }
    var start = Math.max(0, bestPos - 60);
    var end = Math.min(content.length, bestPos + 140);
    var excerpt = (start > 0 ? '...' : '') + content.substring(start, end) + (end < content.length ? '...' : '');
    for (var j = 0; j < terms.length; j++) {
      var re = new RegExp('(' + terms[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      excerpt = excerpt.replace(re, '<mark>$1</mark>');
    }
    return excerpt;
  }

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.innerHTML = '<div class="search-hint">Type to search across all pages</div>';
      return;
    }
    var results = index.search(query + '~1');
    if (results.length === 0) {
      results = index.search(query + '*');
    }
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
      return;
    }
    var terms = query.trim().split(/\s+/);
    var html = '';
    var max = Math.min(results.length, 10);
    for (var i = 0; i < max; i++) {
      var doc = getDocument(results[i].ref);
      if (!doc) continue;
      var excerpt = getExcerpt(doc.content, terms);
      html += '<a class="search-result-item" href="' + doc.url + '">';
      html += '<div class="search-result-title">' + escapeHTML(doc.title) + '</div>';
      html += '<div class="search-result-excerpt">' + excerpt + '</div>';
      html += '</a>';
    }
    searchResults.innerHTML = html;
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openSearch() {
    loadIndex(function () {
      overlay.classList.add('open');
      searchInput.value = '';
      searchResults.innerHTML = '<div class="search-hint">Type to search across all pages</div>';
      searchInput.focus();
    });
  }

  function closeSearch() {
    overlay.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  searchToggle.addEventListener('click', function (e) {
    e.preventDefault();
    openSearch();
  });

  searchClose.addEventListener('click', function (e) {
    e.preventDefault();
    closeSearch();
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      performSearch(searchInput.value);
    }, 200);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
      return;
    }
    if (e.key === '/' && !overlay.classList.contains('open')) {
      var active = document.activeElement;
      var tag = active ? active.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || active.isContentEditable) return;
      e.preventDefault();
      openSearch();
    }
  });
})();
