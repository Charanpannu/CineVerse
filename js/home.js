// ============================================
// CINEVERSE — Home Page Logic
// ============================================

// ── Page Loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});

// ── State ──
let currentCategory = 'All';
let activeModalId = null;

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderHero();
  renderCategoryFilters();
  renderAllRows();
  initSearch();
  initModal();
});

// ── Navbar ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  document.querySelectorAll('.nav-link[data-cat]').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      setCategory(link.dataset.cat);
      document.querySelectorAll('.category-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.category === link.dataset.cat)
      );
    });
  });
}

// ── Hero ──
function renderHero() {
  const movie = getFeaturedMovie();
  if (!movie) return;

  const heroBgImg = document.getElementById('hero-bg-img');
  const heroBgGradient = document.getElementById('hero-bg-gradient');
  if (movie.poster) {
    heroBgImg.src = movie.poster;
    heroBgImg.alt = movie.title;
    heroBgImg.style.display = 'block';
    heroBgGradient.style.display = 'none';
  } else {
    heroBgImg.style.display = 'none';
    heroBgGradient.style.cssText = `display:block; background:${movie.gradient};`;
  }

  document.getElementById('hero-title').textContent = movie.title;
  document.getElementById('hero-tagline').textContent = `"${movie.tagline}"`;
  document.getElementById('hero-rating-val').textContent = movie.rating;
  document.getElementById('hero-year').textContent = movie.year;
  document.getElementById('hero-duration').textContent = movie.duration;
  document.getElementById('hero-cert').textContent = movie.certificate;
  document.getElementById('hero-synopsis').textContent = movie.synopsis;

  document.getElementById('hero-genres').innerHTML = movie.genres
    .map(g => `<span class="tag tag-genre">${g}</span>`).join('');

  document.getElementById('hero-book-btn').onclick = () =>
    (window.location.href = `booking.html?id=${movie.id}`);
  document.getElementById('hero-info-btn').onclick = () => openModal(movie.id);
}

// ── Category Filters ──
function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  container.innerHTML = CATEGORIES.map(cat =>
    `<button class="category-btn${cat === 'All' ? ' active' : ''}" data-category="${cat}">${cat}</button>`
  ).join('');
  container.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.nav-link[data-cat]').forEach(l =>
        l.classList.toggle('active', l.dataset.cat === btn.dataset.category)
      );
      setCategory(btn.dataset.category);
    });
  });
}

function setCategory(category) {
  currentCategory = category;
  const gridSection = document.getElementById('grid-section');
  const rows = document.querySelectorAll('section.section[id^="section-"]');
  if (category === 'All') {
    gridSection.classList.remove('visible');
    rows.forEach(r => (r.style.display = ''));
    window.scrollTo({ top: document.getElementById('main-content').offsetTop - 80, behavior: 'smooth' });
  } else {
    gridSection.classList.add('visible');
    rows.forEach(r => (r.style.display = 'none'));
    const filtered = getMoviesByCategory(category);
    document.getElementById('grid-section-title').textContent = `${category} Movies (${filtered.length})`;
    const grid = document.getElementById('movies-grid');
    grid.innerHTML = filtered.map(createCardHTML).join('');
    attachCardEvents(grid);
    window.scrollTo({ top: document.getElementById('main-content').offsetTop - 80, behavior: 'smooth' });
  }
}

// ── Movie Rows ──
function renderAllRows() {
  renderRow('showing', MOVIES);
  renderRow('action', MOVIES.filter(m => ['Action', 'Thriller'].includes(m.category)));
  renderRow('scifi', MOVIES.filter(m => ['Sci-Fi', 'Fantasy'].includes(m.category)));
  renderRow('drama', MOVIES.filter(m => ['Drama', 'Romance'].includes(m.category)));
  renderRow('horror', MOVIES.filter(m => m.category === 'Horror'));

  document.querySelectorAll('.row-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const row = document.getElementById(`row-${btn.dataset.row}`);
      const dir = btn.classList.contains('row-btn-left') ? -1 : 1;
      row.scrollBy({ left: dir * 580, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.section-see-all').forEach(btn => {
    btn.addEventListener('click', () => {
      const catMap = { showing: 'All', action: 'Action', scifi: 'Sci-Fi', drama: 'Drama', horror: 'Horror' };
      const cat = catMap[btn.dataset.row] || 'All';
      setCategory(cat);
      document.querySelectorAll('.category-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.category === cat)
      );
    });
  });
}

function renderRow(rowId, movies) {
  const row = document.getElementById(`row-${rowId}`);
  if (!row) return;
  if (movies.length === 0) {
    row.closest('.section').style.display = 'none';
    return;
  }
  row.innerHTML = movies.map(createCardHTML).join('');
  attachCardEvents(row);
}

// ── Movie Card ──
function createCardHTML(movie) {
  const icon = genreIcon(movie.category);
  const posterContent = movie.poster
    ? `<img class="movie-card-poster" src="${movie.poster}" alt="${escapeHtml(movie.title)}" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
       <div class="movie-card-poster-placeholder" style="background:${movie.gradient};display:none">
         <span class="placeholder-icon">${icon}</span>
         <span class="placeholder-title">${escapeHtml(movie.title)}</span>
       </div>`
    : `<div class="movie-card-poster-placeholder" style="background:${movie.gradient}">
         <span class="placeholder-icon">${icon}</span>
         <span class="placeholder-title">${escapeHtml(movie.title)}</span>
       </div>`;

  return `
    <div class="movie-card" data-id="${movie.id}" role="button" tabindex="0" aria-label="View ${escapeHtml(movie.title)}">
      ${posterContent}
      <div class="movie-card-bottom">
        <div class="movie-card-bottom-title">${escapeHtml(movie.title)}</div>
      </div>
      <div class="movie-card-overlay">
        <div class="movie-card-title">${escapeHtml(movie.title)}</div>
        <div class="movie-card-meta">
          <div class="movie-card-rating">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#f5a623"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${movie.rating}
          </div>
          <span class="movie-card-year">${movie.year}</span>
        </div>
        <div class="movie-card-book-btn" data-book="${movie.id}">🎬 Book Tickets</div>
      </div>
    </div>
  `;
}

function attachCardEvents(container) {
  container.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.movie-card-book-btn')) {
        e.stopPropagation();
        window.location.href = `booking.html?id=${card.dataset.id}`;
      } else {
        openModal(parseInt(card.dataset.id));
      }
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') openModal(parseInt(card.dataset.id));
    });
  });
}

const GENRE_ICONS = {
  Action: '💥', 'Sci-Fi': '🚀', Thriller: '🔪',
  Horror: '👻', Drama: '🎭', Romance: '💕', Fantasy: '🐉'
};
const genreIcon = cat => GENRE_ICONS[cat] || '🎬';

function escapeHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ── Modal ──
function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
  document.getElementById('modal-watchlist-btn').addEventListener('click', () => {
    showToast('❤️ Added to your Watchlist!');
  });
}

function openModal(movieId) {
  const movie = getMovieById(movieId);
  if (!movie) return;
  activeModalId = movieId;
  const icon = genreIcon(movie.category);

  // Hero
  const heroImg = document.getElementById('modal-hero-img');
  const heroPH = document.getElementById('modal-hero-placeholder');
  if (movie.poster) {
    heroImg.src = movie.poster; heroImg.alt = movie.title;
    heroImg.style.display = 'block'; heroPH.style.display = 'none';
  } else {
    heroImg.style.display = 'none';
    heroPH.style.cssText = `display:flex;align-items:center;justify-content:center;font-size:5rem;background:${movie.gradient}`;
    heroPH.textContent = icon;
  }

  // Poster
  const posterImg = document.getElementById('modal-poster-img');
  const posterPH = document.getElementById('modal-poster-placeholder');
  if (movie.poster) {
    posterImg.src = movie.poster;
    posterImg.style.display = 'block'; posterPH.style.display = 'none';
  } else {
    posterImg.style.display = 'none';
    posterPH.style.cssText = `display:flex;align-items:center;justify-content:center;font-size:3rem;background:${movie.gradient}`;
    posterPH.textContent = icon;
  }

  document.getElementById('modal-title').textContent = movie.title;
  document.getElementById('modal-tagline').textContent = `"${movie.tagline}"`;
  document.getElementById('modal-rating').textContent = movie.rating;
  document.getElementById('modal-votes').textContent = `(${movie.votes} votes)`;
  document.getElementById('modal-year').textContent = movie.year;
  document.getElementById('modal-duration').textContent = movie.duration;
  document.getElementById('modal-cert').textContent = movie.certificate;
  document.getElementById('modal-synopsis').textContent = movie.synopsis;
  document.getElementById('modal-director').textContent = movie.director;
  document.getElementById('modal-cast').textContent = movie.cast.slice(0, 3).join(', ');
  document.getElementById('modal-genres').innerHTML = movie.genres
    .map(g => `<span class="tag tag-genre">${g}</span>`).join('');

  document.getElementById('modal-book-btn').onclick = () =>
    (window.location.href = `booking.html?id=${movie.id}`);

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  activeModalId = null;
}

// ── Search ──
function initSearch() {
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { resultsEl.classList.remove('active'); return; }
      const matches = MOVIES.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.toLowerCase().includes(q))
      ).slice(0, 6);
      if (!matches.length) { resultsEl.classList.remove('active'); return; }
      resultsEl.innerHTML = matches.map(m => `
        <div class="search-result-item" data-id="${m.id}">
          <div class="search-result-thumb">
            ${m.poster
              ? `<img src="${m.poster}" alt="${escapeHtml(m.title)}" />`
              : `<div class="thumb-placeholder" style="background:${m.gradient};display:flex;align-items:center;justify-content:center;font-size:1.2rem">${genreIcon(m.category)}</div>`}
          </div>
          <div class="search-result-info">
            <div class="search-result-title">${escapeHtml(m.title)}</div>
            <div class="search-result-meta">
              <span>${m.year}</span><span>•</span>
              <span>${m.category}</span><span>•</span>
              <span>⭐ ${m.rating}</span>
            </div>
          </div>
        </div>
      `).join('');
      resultsEl.classList.add('active');
      resultsEl.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          openModal(parseInt(item.dataset.id));
          resultsEl.classList.remove('active');
          input.value = '';
        });
      });
    }, 200);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search-wrap') && !e.target.closest('.search-results-overlay')) {
      resultsEl.classList.remove('active');
    }
  });
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
