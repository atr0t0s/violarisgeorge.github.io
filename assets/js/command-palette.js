(function () {
  'use strict';

  var overlay = document.getElementById('cmd-palette');
  var input = document.getElementById('cmd-input');
  var results = document.getElementById('cmd-results');
  if (!overlay || !input || !results) return;

  var index = null;
  var documents = [];
  var activeIndex = -1;
  var debounceTimer = null;
  var currentItems = [];

  // Static actions
  var actions = [
    { type: 'action', label: 'Toggle theme', desc: 'Light / Dark', icon: '&#9788;', action: function () { document.getElementById('theme-toggle').click(); } },
    { type: 'action', label: 'GitHub', desc: 'github.com/atr0t0s', icon: '&#10132;', action: function () { window.open('https://github.com/atr0t0s', '_blank'); } },
    { type: 'action', label: 'Blog', desc: 'blog.violaris.org', icon: '&#10132;', action: function () { window.open('https://blog.violaris.org', '_blank'); } }
  ];

  // Load search index
  function loadIndex(callback) {
    if (index) { callback(); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        documents = JSON.parse(xhr.responseText);
        index = lunr(function () {
          this.ref('url');
          this.field('title', { boost: 10 });
          this.field('content');
          for (var i = 0; i < documents.length; i++) {
            this.add(documents[i]);
          }
        });
      }
      callback();
    };
    xhr.send();
  }

  function getDoc(url) {
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].url === url) return documents[i];
    }
    return null;
  }

  function escapeHTML(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function render(items) {
    currentItems = items;
    activeIndex = -1;
    if (items.length === 0 && input.value.trim()) {
      results.innerHTML = '<div class="cmd-palette-no-results">No results found</div>';
      return;
    }

    results.innerHTML = items.map(function (item, i) {
      var icon = item.icon || '&#9656;';
      var desc = item.desc ? '<span class="cmd-palette-item-desc">' + escapeHTML(item.desc) + '</span>' : '';
      var tag = item.type === 'action' ? 'div' : 'a';
      var href = item.url ? ' href="' + item.url + '"' : '';
      return '<' + tag + ' class="cmd-palette-item" data-index="' + i + '"' + href + '>'
        + '<span class="cmd-palette-item-icon">' + icon + '</span>'
        + '<span class="cmd-palette-item-label">' + escapeHTML(item.label) + '</span>'
        + desc
        + '</' + tag + '>';
    }).join('');
  }

  function search(query) {
    if (!query.trim()) {
      render(actions);
      return;
    }

    loadIndex(function () {
      if (!index) return;
      var hits = index.search(query + '~1 ' + query + '*');
      var items = hits.slice(0, 8).map(function (hit) {
        var doc = getDoc(hit.ref);
        return doc ? { type: 'page', label: doc.title, url: doc.url } : null;
      }).filter(Boolean);

      // Append matching actions
      var q = query.toLowerCase();
      actions.forEach(function (a) {
        if (a.label.toLowerCase().indexOf(q) !== -1) items.push(a);
      });

      render(items);
    });
  }

  function setActive(idx) {
    var items = results.querySelectorAll('.cmd-palette-item');
    if (items.length === 0) return;
    items.forEach(function (el) { el.classList.remove('active'); });
    activeIndex = Math.max(0, Math.min(idx, items.length - 1));
    items[activeIndex].classList.add('active');
    items[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  function executeItem(idx) {
    if (idx < 0 || idx >= currentItems.length) return;
    var item = currentItems[idx];
    if (item.action) {
      item.action();
    } else if (item.url) {
      window.location.href = item.url;
    }
    close();
  }

  // Open / close
  function open() {
    overlay.classList.add('open');
    input.value = '';
    render(actions);
    input.focus();
  }

  function close() {
    overlay.classList.remove('open');
    input.value = '';
    activeIndex = -1;
  }

  window.openCommandPalette = open;

  // Events
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { search(input.value); }, 150);
  });

  input.addEventListener('keydown', function (e) {
    var items = results.querySelectorAll('.cmd-palette-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        executeItem(activeIndex);
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  results.addEventListener('click', function (e) {
    var item = e.target.closest('.cmd-palette-item');
    if (!item) return;
    var idx = parseInt(item.dataset.index, 10);
    executeItem(idx);
  });

  // Global shortcut
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        close();
      } else {
        open();
      }
    }
  });
})();
