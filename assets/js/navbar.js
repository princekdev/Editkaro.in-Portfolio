/* ==========================================================================
   EDITKARO.IN — NAVBAR.JS
   Sticky navbar, active-link highlighting, mobile hamburger menu,
   in-page smooth scroll, and the scroll-progress "timeline scrubber".
   ========================================================================== */

/* ---------------------------------------------------------------------
   SCROLL PROGRESS (timeline scrubber)
--------------------------------------------------------------------- */
function initScrollProgress(){
  const fill = document.getElementById('scrubFill');
  if (!fill) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = pct + '%';
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------------------------------
   STICKY NAVBAR + ACTIVE LINK HIGHLIGHT
--------------------------------------------------------------------- */
function initNavbar(){
  const nav = document.getElementById('nav');
  if (!nav) return;
  const toggleScrolled = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  document.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled();

  const links = document.querySelectorAll('[data-link]');
  const sections = [...links]
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = '#' + entry.target.id;
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------------------- */
function initMobileMenu(){
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  const close = () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ---------------------------------------------------------------------
   SMOOTH SCROLL for in-page anchors (adds navbar-height offset
   correction and closes the mobile menu on navigation)
--------------------------------------------------------------------- */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
