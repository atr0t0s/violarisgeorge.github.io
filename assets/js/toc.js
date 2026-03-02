(function () {
  var article = document.querySelector('.article-content');
  if (!article) return;

  var headings = article.querySelectorAll('h2, h3');
  if (headings.length < 3) return;

  // Build ToC
  var nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'Table of contents');

  var label = document.createElement('span');
  label.className = 'toc-label';
  label.textContent = 'On this page';
  nav.appendChild(label);

  var list = document.createElement('ul');

  headings.forEach(function (h, i) {
    if (!h.id) h.id = 'heading-' + i;
    var li = document.createElement('li');
    li.className = h.tagName === 'H3' ? 'toc-h3' : '';
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });

  nav.appendChild(list);

  // Insert after .article-meta if it exists, otherwise at the top
  var meta = article.querySelector('.article-meta');
  if (meta && meta.nextSibling) {
    article.insertBefore(nav, meta.nextSibling);
  } else {
    article.insertBefore(nav, article.firstChild);
  }

  // Highlight current section on scroll
  var links = nav.querySelectorAll('a');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var active = nav.querySelector('a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

  headings.forEach(function (h) { observer.observe(h); });
})();
