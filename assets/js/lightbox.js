/* ==========================================================================
   EDITKARO.IN — LIGHTBOX.JS
   Video preview popup: opens a YouTube embed, supports close-button,
   ESC key, and click-outside-to-close. Restores focus on close.
   ========================================================================== */

let _lastFocused = null;

function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !closeBtn) return;

  lightbox.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeLightbox));
  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

function openLightbox(videoId, title){
  const lightbox = document.getElementById('lightbox');
  const frame = document.getElementById('lightboxFrame');
  if (!lightbox || !frame) return;
  _lastFocused = document.activeElement;

  frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.getElementById('lightboxClose').focus();
}

function closeLightbox(){
  const lightbox = document.getElementById('lightbox');
  const frame = document.getElementById('lightboxFrame');
  if (!lightbox || !frame) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  frame.innerHTML = ''; // stop playback
  if (_lastFocused) _lastFocused.focus();
}
