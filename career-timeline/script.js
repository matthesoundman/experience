"use strict";

(function() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var heroTitle = document.querySelector('.hero-title');
  var finalTitleLine = heroTitle && heroTitle.lastElementChild;
  var introTimer;

  function completeHeroIntro() {
    if (!body.classList.contains('hero-intro-pending')) return;

    body.classList.remove('hero-intro-pending');
    body.classList.add('hero-intro-complete');
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
    introTimer = window.setTimeout(completeHeroIntro, 4000);
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
