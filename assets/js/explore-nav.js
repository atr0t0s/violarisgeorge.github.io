(function () {
  var link = document.getElementById('nav-explore-link');
  if (!link) return;

  function update() {
    var scrollable = document.documentElement.scrollHeight > window.innerHeight + 50;
    if (scrollable) {
      link.classList.add('visible');
    } else {
      link.classList.remove('visible');
    }
  }

  // Smooth scroll to explore section with spotlight overlay
  link.addEventListener('click', function (e) {
    var target = document.getElementById('explore-section');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });

    function dismiss() {
      overlay.classList.remove('active');
      target.classList.remove('explore-spotlight');
      document.body.style.overflow = '';
      overlay.addEventListener('transitionend', function () {
        overlay.remove();
      });
      document.removeEventListener('click', onClickOutside, true);
      document.removeEventListener('keydown', onEsc);
    }

    function onClickOutside(ev) {
      if (!target.contains(ev.target)) {
        dismiss();
      } else {
        // Clicked inside explore — dismiss after following link
        setTimeout(dismiss, 100);
      }
    }

    function onEsc(ev) {
      if (ev.key === 'Escape') dismiss();
    }

    // Create overlay + lock scroll AFTER scroll completes
    var overlay = document.createElement('div');
    overlay.className = 'explore-spotlight-overlay';

    setTimeout(function () {
      document.body.appendChild(overlay);
      target.classList.add('explore-spotlight');
      requestAnimationFrame(function () {
        overlay.classList.add('active');
      });
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', onClickOutside, true);
      document.addEventListener('keydown', onEsc);
    }, 600);
  });

  update();
  window.addEventListener('resize', update);
  window.addEventListener('load', function () {
    update();
    // Re-check after other scripts may have changed DOM height
    setTimeout(update, 300);
  });
})();
