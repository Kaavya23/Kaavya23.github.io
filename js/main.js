/* ─────────────────────────────────────────────
   MAIN — cursor, nav, misc interactions
───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── CUSTOM CURSOR ── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  let   mouseX = -100, mouseY = -100;
  let   trailX = -100, trailY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth trail
  function trailLoop() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(trailLoop);
  }
  trailLoop();

  // Hover state on links / buttons
  const interactives = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .edu-card, .stat');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-on-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on-link'));
  });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // animate hamburger → X
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ── ACTIVE NAV LINK on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinkEls.forEach((l) => l.style.color = '');
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.style.color = 'var(--mauve-soft)';
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ── SMOOTH PARALLAX on hero orbs ── */
  document.addEventListener('mousemove', (e) => {
    const px = (e.clientX / window.innerWidth  - 0.5) * 20;
    const py = (e.clientY / window.innerHeight - 0.5) * 20;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    if (orb1) orb1.style.transform = `translate(${px * 1.2}px, ${py * 1.2}px)`;
    if (orb2) orb2.style.transform = `translate(${-px}px, ${-py}px)`;
    if (orb3) orb3.style.transform = `translate(${px * 0.6}px, ${py * 0.6}px)`;
  }, { passive: true });

  /* ── RIPPLE effect on buttons ── */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect   = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      circle.style.cssText = `
        position:absolute;
        width:${diameter}px;height:${diameter}px;
        left:${e.clientX - rect.left - diameter/2}px;
        top:${e.clientY - rect.top - diameter/2}px;
        background:rgba(255,255,255,0.2);
        border-radius:50%;
        transform:scale(0);
        animation:rippleAnim 0.6s linear;
        pointer-events:none;
      `;
      // inject keyframes once
      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = '@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}';
        document.head.appendChild(style);
      }
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 620);
    });
  });

  /* ── MAGNETIC effect on contact cards ── */
  document.querySelectorAll('.contact-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) * 0.1;
      const dy   = (e.clientY - cy) * 0.1;
      card.style.transform = `translateY(-6px) translate(${dx}px,${dy}px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── TILT effect on project cards ── */
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
    card.style.transformStyle = 'preserve-3d';
  });

  /* ── TYPING CURSOR on hero subtitle ── */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = originalText + '<span class="type-cursor">|</span>';
    const style = document.createElement('style');
    style.textContent = `.type-cursor{animation:blink 1.1s step-end infinite;color:var(--mauve);margin-left:2px}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`;
    document.head.appendChild(style);
  }

  /* ── SMOOTH SCROLL for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
