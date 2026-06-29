"use strict";

(function() {
  // Scroll reveal animations
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });
  }

  // Sticky header — appears when hero CTA scrolls out of view
  var heroCta = document.getElementById('heroCta');
  var stickyHeader = document.getElementById('stickyHeader');
  if (heroCta && stickyHeader) {
    var headerObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyHeader.classList.remove('visible');
        } else {
          stickyHeader.classList.add('visible');
        }
      });
    }, { threshold: 0 });
    headerObs.observe(heroCta);
  }
})();
