"use strict";

(function() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var heroTitle = document.querySelector('.hero-title');
  var finalTitleLine = heroTitle && heroTitle.lastElementChild;
  var stickyHeader = document.getElementById('stickyHeader');
  var introTimer;

  function completeHeroIntro() {
    if (!body.classList.contains('hero-intro-pending')) return;

    body.classList.remove('hero-intro-pending');
    body.classList.add('hero-intro-complete');
    if (stickyHeader) stickyHeader.classList.add('visible');
    window.clearTimeout(introTimer);
  }

  if (reducedMotion || !finalTitleLine) {
    completeHeroIntro();
  } else {
    finalTitleLine.addEventListener('transitionend', function handleIntroEnd(event) {
      if (event.propertyName !== 'opacity') return;

      finalTitleLine.removeEventListener('transitionend', handleIntroEnd);
      completeHeroIntro();
    });

    // Prevent a hidden page if the transition is interrupted or unsupported.
    introTimer = window.setTimeout(completeHeroIntro, 1800);
  }

  // Scroll reveal animations
  if (!reducedMotion) {
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

  document.querySelectorAll('.sticky-header-cta, .hero-cta, .btn-primary').forEach(function(button) {
    button.addEventListener('click', function() {
      button.classList.add('resume-clicked');
    });
  });
})();
