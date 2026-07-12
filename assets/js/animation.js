/* ==========================================================================
   EDITKARO.IN — ANIMATION.JS
   Loading screen, scroll-reveal system, animated stat counters, and the
   button ripple micro-interaction.
   ========================================================================== */

/* ---------------------------------------------------------------------
   LOADING SCREEN
--------------------------------------------------------------------- */
function initLoader(){
  const loader = document.getElementById('loader');
  if (!loader) return;
  const hide = () => {
    loader.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  };
  document.body.classList.add('no-scroll');
  window.addEventListener('load', () => setTimeout(hide, 500));
  // Fallback in case the window 'load' event is delayed
  setTimeout(hide, 2500);
}

/* ---------------------------------------------------------------------
   SCROLL REVEAL — fades/slides [data-reveal] elements into view once
--------------------------------------------------------------------- */
function initScrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------------------
   ANIMATED COUNTERS — counts up to data-count when scrolled into view
--------------------------------------------------------------------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

/* ---------------------------------------------------------------------
   RIPPLE EFFECT for buttons
--------------------------------------------------------------------- */
function initRipple(){
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('ripple');
    btn.addEventListener('click', function(e){
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-el';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
