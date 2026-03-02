(function () {
  var link = document.getElementById('nav-explore-link');
  if (!link) return;

  function update() {
    var scrollable = document.documentElement.scrollHeight > window.innerHeight + 100;
    if (scrollable) {
      link.classList.add('visible');
    } else {
      link.classList.remove('visible');
    }
  }

  // Smooth scroll to explore section
  link.addEventListener('click', function (e) {
    var target = document.getElementById('explore-section');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  update();
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
})();
