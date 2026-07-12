/* ==========================================================================
   EDITKARO.IN — MAIN.JS
   Boots every module (navbar.js, animation.js, filter.js, lightbox.js)
   and owns the features that don't warrant their own file: testimonials
   carousel, contact form validation, back-to-top, and toast messages.

   Load order in index.html:
   navbar.js -> animation.js -> filter.js -> lightbox.js -> main.js
   All functions are plain globals (no bundler), so main.js can safely
   call initNavbar(), initPortfolio(), openLightbox(), etc.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initPortfolio();
  initTestimonials();
  initLightbox();
  initContactForm();
  initBackToTop();
  initRipple();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------------------
   TESTIMONIALS — auto-sliding carousel
--------------------------------------------------------------------- */
const TESTIMONIALS = [
  { name:'Aarav Mehta', role:'YouTuber, 480K subs', review:'Editkaro turned our weekly upload chaos into a system. Retention is up and I finally sleep before deadlines.', stars:5, initials:'AM' },
  { name:'Simran Kaur', role:'D2C Founder, Lumaire', review:'The ad cutdowns they delivered outperformed our agency-made ads within the first week of testing.', stars:5, initials:'SK' },
  { name:'Rohan Bhatia', role:'Gaming Creator', review:'Fast turnaround, great pacing on montages, and they actually understand what makes a clip clip-worthy.', stars:5, initials:'RB' },
  { name:'Neha Sharma', role:'Marketing Lead, Kavya Foods', review:'Consistent brand look across every reel. Our engagement rate nearly doubled in two months.', stars:4, initials:'NS' },
  { name:'Devansh Rao', role:'Football Content Page', review:'Match recaps land within hours of full-time. That speed alone is worth the retainer.', stars:5, initials:'DR' },
];

function initTestimonials(){
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track || !dotsWrap) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <article class="testi-card">
      <div class="testi-stars" aria-label="${t.stars} out of 5 stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testi-review">"${t.review}"</p>
      <div class="testi-person">
        <span class="testi-avatar">${t.initials}</span>
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </div>
    </article>
  `).join('');

  dotsWrap.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Go to review ${i+1}"></button>`).join('');
  const dots = dotsWrap.querySelectorAll('button');

  let index = 0;
  let timer;

  function goTo(i){
    index = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    const card = track.children[index];
    const offset = card.offsetLeft - (track.parentElement.clientWidth - card.clientWidth) / 2;
    track.style.transform = `translateX(-${Math.max(offset,0)}px)`;
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetTimer(); }));

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 4500);
  }

  window.addEventListener('resize', () => goTo(index));

  goTo(0);
  resetTimer();
}

/* ---------------------------------------------------------------------
   CONTACT FORM — client-side validation
--------------------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const validators = {
    'cf-name': (v) => v.trim().length >= 2 || 'Please enter your name.',
    'cf-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
    'cf-message': (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };

  function validateField(input){
    const rule = validators[input.id];
    if (!rule) return true;
    const result = rule(input.value);
    const row = input.closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${input.id}"]`);
    if (result === true){
      row.classList.remove('has-error');
      errorEl.textContent = '';
      return true;
    } else {
      row.classList.add('has-error');
      errorEl.textContent = result;
      return false;
    }
  }

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-row').classList.contains('has-error')) validateField(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll('input, textarea')];
    const allValid = inputs.map(validateField).every(Boolean);

    if (!allValid){
      showToast('Please fix the highlighted fields.');
      return;
    }

    // Simulated submission (no backend in this static build).
    // Wire this up to your own endpoint / form service (e.g. Formspree)
    // by replacing the setTimeout block with a real fetch() call.
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';

    setTimeout(() => {
      if (success) success.hidden = false;
      form.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send message';
      showToast('Message sent — we\'ll be in touch soon!');
    }, 900);
  });
}

/* ---------------------------------------------------------------------
   BACK TO TOP
--------------------------------------------------------------------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  document.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 700);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------------------
   TOAST
--------------------------------------------------------------------- */
let _toastTimer;
function showToast(message){
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearInterval(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}
