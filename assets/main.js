(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.remove('no-js');
  // A short branded loader on the first page view only; it never blocks on third-party assets.
  const loader = $('.site-loader');
  if (loader) {
    let firstView = true;
    try { firstView = sessionStorage.getItem('tcp-visited') !== '1'; sessionStorage.setItem('tcp-visited', '1'); } catch (_) { firstView = true; }
    if (firstView && !reduceMotion) {
      const startedAt = Date.now(); let finished = false; loader.classList.add('active');
      const finishLoader = () => { if (finished) return; finished = true; const hold = Math.max(0, 420 - (Date.now() - startedAt)); setTimeout(() => loader.classList.add('loaded'), hold); };
      window.addEventListener('load', finishLoader, { once: true }); setTimeout(finishLoader, 850);
    } else loader.classList.add('loaded');
  }
  $$('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));

  // Mobile navigation stays keyboard-accessible and closes after route selection.
  const toggle = $('.nav-toggle');
  const nav = $('#primary-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
      document.body.classList.toggle('menu-open', !expanded && window.innerWidth <= 760);
      toggle.innerHTML = expanded ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    });
    $$('#primary-navigation a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation'); document.body.classList.remove('menu-open');
    }));
    window.addEventListener('resize', () => { if (window.innerWidth > 760) { nav.classList.remove('open'); document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded','false'); } });
  }

  // Scroll reveals have a non-GSAP fallback; visible text remains available if scripts fail.
  const reveals = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) reveals.forEach(el => el.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach(el => observer.observe(el));
  }
  if (window.gsap && !reduceMotion) {
    window.addEventListener('load', () => {
      if (!window.gsap) return;
      if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      const heroTitle = $('.hero-copy .display, .page-hero .display');
      if (heroTitle) gsap.fromTo(heroTitle, {y: 24, opacity: 0}, {y: 0, opacity: 1, duration: .85, ease: 'power3.out', delay: .08});
      const heroMedia = $('.hero-art, .page-hero-image');
      if (heroMedia) gsap.fromTo(heroMedia, {y: 18, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: .18});
      if (window.ScrollTrigger) $$('.gsap-stagger').forEach(group => {
        const kids = Array.from(group.children);
        if (!kids.length) return;
        gsap.fromTo(kids, {y: 22, opacity: 0}, {y: 0, opacity: 1, duration: .6, stagger: .09, ease: 'power2.out', scrollTrigger: {trigger: group, start: 'top 85%', once: true}});
      });
    }, {once:true});
  }

  // Smooth, accessible review carousel. It intentionally does not autoplay, so excerpts can be read.
  const track = $('.review-track');
  if (track) {
    const cards = $$('.review-card', track); const prev = $('[data-review-prev]'); const next = $('[data-review-next]'); let index = 0;
    const visibleCount = () => window.innerWidth <= 760 ? 1 : (window.innerWidth <= 1050 ? 2 : 3);
    const maxIndex = () => Math.max(0, cards.length - visibleCount());
    const go = (i) => { index = Math.min(maxIndex(), Math.max(0, i)); const card = cards[0]; if (!card) return; const gap = parseFloat(getComputedStyle(track).gap) || 0; const step = card.getBoundingClientRect().width + gap; track.style.transform = `translateX(${-index * step}px)`; if (prev) prev.disabled = index === 0; if (next) next.disabled = index >= maxIndex(); };
    prev?.addEventListener('click', () => go(index - 1)); next?.addEventListener('click', () => go(index + 1)); window.addEventListener('resize', () => go(index)); go(0);
    let startX = 0; let startY = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, {passive:true});
    track.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - startX; const dy = e.changedTouches[0].clientY - startY; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1)); }, {passive:true});
  }

  // Native disclosure elements are progressively enhanced to keep FAQs accessible without JS.
  $$('.faq-question').forEach(btn => btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const item = btn.closest('.faq-item'); if (item) item.classList.toggle('open', !expanded);
  }));

  // Experience enquiry — opens a composed WhatsApp message, never pretends to submit to a server.
  const enquiryForm = $('#experience-enquiry');
  if (enquiryForm) enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const name = String(data.get('name') || '').trim();
    const date = String(data.get('date') || '').trim();
    const group = String(data.get('group') || '').trim();
    const occasion = String(data.get('occasion') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const lines = ['Hello The Coffee Palette! I would like to ask about planning a visit.'];
    if (name) lines.push('Name: ' + name); if (date) lines.push('Preferred date: ' + date);
    if (group) lines.push('Group size: ' + group); if (occasion) lines.push('Occasion: ' + occasion); if (notes) lines.push('Details: ' + notes);
    lines.push('Please let me know availability and current details.');
    const number = document.body.dataset.whatsapp || '918090753057';
    const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
    const status = $('.form-status', enquiryForm); if (status) { status.textContent = 'Opening WhatsApp with your enquiry…'; status.classList.add('visible'); }
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
