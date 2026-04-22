/* ─────────────────────────────────────────────
   SCROLL REVEAL + COUNTER ANIMATIONS
───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── INTERSECTION OBSERVER — reveal elements ── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .section-label'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── HERO auto-reveal on load ── */
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal-up').forEach((el) => {
      el.classList.add('visible');
    });
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const startVal = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * (target - startVal) + startVal);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
        el.closest('.stat')?.classList.add('counted');
      }
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEl  = entry.target.querySelector('.stat-number');
          const target = parseInt(numEl.dataset.target, 10);
          animateCounter(numEl, target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('.stat').forEach((el) => statObserver.observe(el));

  /* ── SKILL BAR RIPPLE on hover ── */
  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  /* ── STAGGERED SECTION CHILDREN ── */
  // Project cards
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.1}s`);
  });

})();
