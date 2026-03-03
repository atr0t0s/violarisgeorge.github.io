(function () {
  'use strict';

  // Skip full-page navigation on mobile — normal scrolling instead
  var isMobile = window.matchMedia('(max-width: 767px)').matches;
  if (isMobile) return;

  // Prevent browser from restoring scroll position on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  var sections = [];
  var dots = [];
  var currentIndex = 0;
  var isScrolling = false;
  var scrollTimer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gather sections
  var els = document.querySelectorAll('[data-section]');
  if (!els.length) return;

  for (var i = 0; i < els.length; i++) {
    var isHero = els[i].classList.contains('landing-hero');
    sections.push({
      el: els[i],
      name: els[i].getAttribute('data-section'),
      isHero: isHero,
      scrollTarget: 0 // computed below
    });
    // Set z-index for stacking parallax (higher = on top)
    if (!isHero) {
      els[i].style.zIndex = i;
    }
  }

  // Cache scroll positions at init (before sticky kicks in, page at top)
  function cachePositions() {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].isHero) {
        sections[i].scrollTarget = 0;
      } else {
        // Use cumulative offset: landing-body offset + section offset within it
        var el = sections[i].el;
        var top = 0;
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent;
        }
        sections[i].scrollTarget = top;
      }
    }
  }
  cachePositions();
  window.addEventListener('resize', cachePositions);

  // Build indicator dots (left)
  var indicator = document.createElement('nav');
  indicator.className = 'section-indicator';
  indicator.setAttribute('aria-label', 'Section navigation');

  for (var d = 0; d < sections.length; d++) {
    var dot = document.createElement('button');
    dot.className = 'section-dot' + (d === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to ' + sections[d].name);
    dot.setAttribute('type', 'button');
    var tooltip = document.createElement('span');
    tooltip.className = 'section-tooltip';
    tooltip.textContent = sections[d].name;
    dot.appendChild(tooltip);
    (function (idx) {
      dot.addEventListener('click', function () { navigateTo(idx); });
    })(d);
    dots.push(dot);
    indicator.appendChild(dot);
  }
  document.body.appendChild(indicator);

  // Build arrow buttons (right)
  var arrows = document.createElement('div');
  arrows.className = 'section-arrows';

  var upBtn = document.createElement('button');
  upBtn.className = 'section-arrow disabled';
  upBtn.setAttribute('aria-label', 'Previous section');
  upBtn.setAttribute('type', 'button');
  upBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  upBtn.addEventListener('click', function () { navigateTo(currentIndex - 1); });

  var downBtn = document.createElement('button');
  downBtn.className = 'section-arrow';
  downBtn.setAttribute('aria-label', 'Next section');
  downBtn.setAttribute('type', 'button');
  downBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  downBtn.addEventListener('click', function () { navigateTo(currentIndex + 1); });

  arrows.appendChild(upBtn);
  arrows.appendChild(downBtn);
  document.body.appendChild(arrows);

  function navigateTo(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    clearTimeout(scrollTimer);

    var top = sections[index].scrollTarget;

    window.scrollTo({
      top: top,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });

    setActive(index);

    scrollTimer = setTimeout(function () {
      isScrolling = false;
    }, 800);
  }

  // Public API: navigate to a section by name
  window.sectionNav = {
    goTo: function (name) {
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].name === name) {
          navigateTo(i);
          return;
        }
      }
    }
  };

  function setActive(index) {
    currentIndex = index;
    for (var i = 0; i < dots.length; i++) {
      if (i === index) {
        dots[i].classList.add('active');
      } else {
        dots[i].classList.remove('active');
      }
    }
    // Arrow states
    if (index === 0) {
      upBtn.classList.add('disabled');
    } else {
      upBtn.classList.remove('disabled');
    }
    if (index === sections.length - 1) {
      downBtn.classList.add('disabled');
    } else {
      downBtn.classList.remove('disabled');
    }
  }

  // Check if scrolled past all nav sections (explore/footer zone)
  function isPastLastSection() {
    var lastTarget = sections[sections.length - 1].scrollTarget;
    return window.pageYOffset > lastTarget + 100;
  }

  // Wheel navigation — snap between sections
  // Accumulate trackpad delta to avoid double-scroll from momentum
  var accumulatedDelta = 0;
  var deltaResetTimer = null;
  var DELTA_THRESHOLD = 50; // px of accumulated delta before triggering nav

  window.addEventListener('wheel', function (e) {
    if (isScrolling) { e.preventDefault(); return; }

    // Past last section: scroll up snaps back, scroll down is free
    if (isPastLastSection()) {
      if (e.deltaY < 0) {
        e.preventDefault();
        navigateTo(sections.length - 1);
      }
      return;
    }

    e.preventDefault();

    accumulatedDelta += e.deltaY;
    clearTimeout(deltaResetTimer);
    deltaResetTimer = setTimeout(function () { accumulatedDelta = 0; }, 200);

    if (accumulatedDelta > DELTA_THRESHOLD) {
      accumulatedDelta = 0;
      navigateTo(currentIndex + 1);
    } else if (accumulatedDelta < -DELTA_THRESHOLD) {
      accumulatedDelta = 0;
      navigateTo(currentIndex - 1);
    }
  }, { passive: false });

  // Touch navigation — swipe up/down to snap
  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    // Allow free scroll when past last section
    if (isPastLastSection()) return;
    // Allow free scroll at last section swiping down
    if (currentIndex === sections.length - 1) {
      var currentY = e.touches[0].clientY;
      if (currentY < touchStartY) return; // finger up = scroll down
    }
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchend', function (e) {
    if (isScrolling) return;
    var dy = touchStartY - e.changedTouches[0].clientY;

    // Past last section: swipe down snaps back
    if (isPastLastSection()) {
      if (dy < -30) navigateTo(sections.length - 1);
      return;
    }

    if (dy > 30) {
      navigateTo(currentIndex + 1);
    } else if (dy < -30) {
      navigateTo(currentIndex - 1);
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      navigateTo(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      navigateTo(currentIndex - 1);
    }
  });
})();
