(function () {
  document.querySelectorAll('pre > code').forEach(function (code) {
    var pre = code.parentElement;
    // Skip mermaid blocks
    if (pre.classList.contains('mermaid')) return;

    pre.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });

    pre.appendChild(btn);
  });
})();
