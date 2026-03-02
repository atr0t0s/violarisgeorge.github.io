(function () {
  var API = 'https://news.violaris.org';
  var grid = document.getElementById('news-grid');
  var loading = document.getElementById('news-loading');
  var empty = document.getElementById('news-empty');
  var error = document.getElementById('news-error');
  var loadMore = document.getElementById('news-load-more');

  if (!grid) return;

  var offset = 0;
  var limit = 18;
  var total = 0;

  function timeAgo(dateStr) {
    var now = Date.now();
    var then = new Date(dateStr).getTime();
    var diff = Math.floor((now - then) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function truncate(text, max) {
    if (!text) return '';
    return text.length > max ? text.substring(0, max) + '...' : text;
  }

  function renderCard(article) {
    var card = document.createElement('a');
    card.href = article.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'news-card';

    var imgHtml = '';
    if (article.image_url) {
      imgHtml = '<div class="news-card-image"><img src="' + article.image_url + '" alt="" loading="lazy" onerror="this.parentElement.classList.add(\'news-card-image--fallback\')"></div>';
    } else {
      imgHtml = '<div class="news-card-image news-card-image--fallback"></div>';
    }

    var sourceHtml = '';
    if (article.source_name) {
      var iconHtml = article.source_icon
        ? '<img src="' + article.source_icon + '" alt="" class="news-source-icon" onerror="this.style.display=\'none\'">'
        : '';
      sourceHtml = '<span class="news-card-source">' + iconHtml + article.source_name + '</span>';
    }

    card.innerHTML =
      imgHtml +
      '<div class="news-card-body">' +
        '<h3 class="news-card-title">' + article.title + '</h3>' +
        '<p class="news-card-desc">' + truncate(article.description, 150) + '</p>' +
        '<div class="news-card-meta">' +
          sourceHtml +
          '<span class="news-card-time">' + timeAgo(article.published_at) + '</span>' +
        '</div>' +
      '</div>';

    return card;
  }

  function loadArticles() {
    fetch(API + '/articles?limit=' + limit + '&offset=' + offset)
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(function (data) {
        loading.style.display = 'none';
        total = data.total;

        if (data.articles.length === 0 && offset === 0) {
          empty.style.display = 'block';
          return;
        }

        data.articles.forEach(function (article) {
          grid.appendChild(renderCard(article));
        });

        offset += data.articles.length;

        if (offset < total) {
          loadMore.style.display = 'block';
        } else {
          loadMore.style.display = 'none';
        }
      })
      .catch(function () {
        loading.style.display = 'none';
        if (offset === 0) error.style.display = 'block';
      });
  }

  loadMore.addEventListener('click', function () {
    loadMore.style.display = 'none';
    loadArticles();
  });

  loadArticles();
})();
