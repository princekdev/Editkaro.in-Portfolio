/* ==========================================================================
   EDITKARO.IN — FILTER.JS
   Portfolio dataset, card rendering, category filtering and live search.

   NOTE ON MEDIA: Real client footage isn't available in this build
   environment, so each project below embeds a distinct, real, publicly
   embeddable Creative-Commons-licensed short film (Blender Foundation
   open movies) as stand-in footage — every thumbnail and video ID is
   unique, sourced live from YouTube (img.youtube.com), and nothing is
   duplicated across cards. Swap `video` (YouTube ID) per item for real
   client work when it's available — the render/filter/search/lightbox
   logic needs no changes to support that. To add local thumbnail images
   instead of the YouTube CDN, drop files into
   assets/images/thumbnails/<category>/ and point `thumb` at them.
   ========================================================================== */

const PORTFOLIO_DATA = [
  { id:1, title:'Weekend Drop — 9s Hook Reel', desc:'Fast-cut, caption-led short-form reel built for maximum scroll-stop rate.', cat:'short-form', catLabel:'Short Form', time:'00:00:52', video:'Z4C82eyhwgU' },
  { id:2, title:'Founder Story — Full Sitdown', desc:'22-minute long-form YouTube interview edit with chapter markers and B-roll.', cat:'long-form', catLabel:'Long Form', time:'00:10:53', video:'TLkA0RELQ1g' },
  { id:3, title:'Ranked Climb — Highlight Reel', desc:'Beat-synced gaming montage with kinetic titles and clutch-moment replays.', cat:'gaming', catLabel:'Gaming', time:'00:04:23', video:'mN0zPOpADL4' },
  { id:4, title:'Matchday Recap — Derby Edition', desc:'Fast-cut football highlights with live-score graphic overlays.', cat:'football', catLabel:'Football', time:'00:01:30', video:'SkVqJ1SGeL0' },
  { id:5, title:'Studio Headphones — Launch Ad', desc:'Product-first eCommerce ad cut for paid social, built for a 15s Stories loop.', cat:'ecommerce', catLabel:'eCommerce Ads', time:'00:12:11', video:'Y-rmzh0PI3c' },
  { id:6, title:'Field Notes — Character Documentary', desc:'Character-driven documentary short with observational pacing and natural sound.', cat:'documentary', catLabel:'Documentary', time:'00:15:00', video:'R6MlUcmOul8' },
  { id:7, title:'Monsoon Grade — Look Development', desc:'Cinematic color grading pass and LUT development for a travel series.', cat:'color-grading', catLabel:'Color Grading', time:'00:10:34', video:'aqz-KE-bpKQ' },
  { id:8, title:'Ronin — AMV Chapter One', desc:'Beat-mapped anime music video edit with slow-motion duel sequencing.', cat:'anime', catLabel:'Anime', time:'00:07:34', video:'WhWc3b3KhnY' },
  { id:9, title:'Launch Day — Pre-Roll Ad Film', desc:'App-launch advertisement built for YouTube pre-roll with a hard CTA close.', cat:'ads', catLabel:'Advertisement', time:'00:10:53', video:'eRsGyueVLvQ' },
];

function initPortfolio(){
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  const emptyMsg = document.getElementById('portfolioEmpty');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');

  let activeFilter = 'all';
  let query = '';

  const playIconSVG = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 4l11 6-11 6V4z" fill="#fff"/></svg>`;

  function render(){
    const filtered = PORTFOLIO_DATA.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.cat === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.catLabel.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });

    grid.innerHTML = filtered.map((item, i) => `
      <article class="p-card" style="animation-delay:${Math.min(i,8)*0.05}s" data-cat="${item.cat}">
        <div class="p-card__thumb thumb-${item.cat}" role="button" tabindex="0"
             aria-label="Play ${item.title}"
             data-video="${item.video}" data-title="${item.title}">
          <img class="p-card__img" src="https://img.youtube.com/vi/${item.video}/hqdefault.jpg"
               alt="Thumbnail preview for ${item.title}" loading="lazy" width="480" height="360"
               onerror="this.style.display='none'">
          <span class="p-card__badge">${item.catLabel}</span>
          <span class="p-card__time">${item.time}</span>
          <span class="p-card__play">${playIconSVG}</span>
        </div>
        <div class="p-card__body">
          <h3 class="p-card__title">${item.title}</h3>
          <p class="p-card__desc">${item.desc}</p>
        </div>
      </article>
    `).join('');

    if (emptyMsg) emptyMsg.hidden = filtered.length !== 0;

    grid.querySelectorAll('.p-card__thumb').forEach(thumb => {
      thumb.addEventListener('click', () => openLightbox(thumb.dataset.video, thumb.dataset.title));
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          openLightbox(thumb.dataset.video, thumb.dataset.title);
        }
      });
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected','true');
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  if (searchInput){
    searchInput.addEventListener('input', (e) => {
      query = e.target.value;
      render();
    });
  }

  // Footer category shortcuts jump to Portfolio and pre-apply a filter
  document.querySelectorAll('[data-footer-filter]').forEach(link => {
    link.addEventListener('click', () => {
      const cat = link.dataset.footerFilter;
      const btn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
      if (btn) btn.click();
    });
  });

  render();
}
