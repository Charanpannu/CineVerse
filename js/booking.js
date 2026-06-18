// ============================================
// CINEVERSE — Booking Page Logic
// ============================================

// ── State ──
let currentMovie = null;
let selectedSeats = [];
let currentShowtime = null;
const MAX_SEATS = 8;
const CONVENIENCE_FEE = 30;

const TIER_COLORS = {
  gold: '#f5a623',
  silver: '#94a3b8',
  bronze: '#c2631a'
};
const TIER_LABELS = {
  gold: 'Gold — Premium',
  silver: 'Silver — Standard',
  bronze: 'Bronze — Economy'
};
const GENRE_ICONS = {
  Action: '💥', 'Sci-Fi': '🚀', Thriller: '🔪',
  Horror: '👻', Drama: '🎭', Romance: '💕', Fantasy: '🐉'
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  currentMovie = getMovieById(id);

  if (!currentMovie) {
    window.location.href = 'index.html';
    return;
  }

  renderMovieHeader();
  renderShowtimes();
  renderSeatMap();
  initConfirmButton();
});

// ── Movie Header ──
function renderMovieHeader() {
  const m = currentMovie;
  document.title = `Book Seats — ${m.title} | CineVerse`;

  // Nav thumbnail
  const navImg = document.getElementById('nav-thumb-img');
  const navPH = document.getElementById('nav-thumb-placeholder');
  if (m.poster) {
    navImg.src = m.poster;
    navImg.style.display = 'block';
    navPH.style.display = 'none';
  } else {
    navImg.style.display = 'none';
    navPH.textContent = genreIcon(m.category);
    navPH.style.cssText = `display:flex;align-items:center;justify-content:center;background:${m.gradient};width:100%;height:100%;font-size:1rem`;
  }
  document.getElementById('nav-movie-title').textContent = m.title;
  document.getElementById('sidebar-movie-name').textContent = m.title;

  // Banner background
  const bgImg = document.getElementById('header-bg-img');
  const bgGrad = document.getElementById('header-bg-gradient');
  if (m.poster) {
    bgImg.src = m.poster;
    bgImg.style.display = 'block';
    bgGrad.style.display = 'none';
  } else {
    bgImg.style.display = 'none';
    bgGrad.style.cssText = `display:block;background:${m.gradient}`;
  }

  // Poster thumbnail
  const posterImg = document.getElementById('header-poster-img');
  const posterPH = document.getElementById('header-poster-placeholder');
  if (m.poster) {
    posterImg.src = m.poster;
    posterPH.style.display = 'none';
  } else {
    posterImg.style.display = 'none';
    posterPH.style.cssText = `display:flex;align-items:center;justify-content:center;background:${m.gradient};font-size:2.5rem;width:100%;height:100%`;
    posterPH.textContent = genreIcon(m.category);
  }

  document.getElementById('header-title').textContent = m.title;
  document.getElementById('header-rating').textContent = m.rating;
  document.getElementById('header-year').textContent = m.year;
  document.getElementById('header-duration').textContent = m.duration;
  document.getElementById('header-cert').textContent = m.certificate;
  document.getElementById('header-genres').innerHTML = m.genres
    .map(g => `<span class="tag tag-genre">${g}</span>`).join('');
}

// ── Showtimes ──
function renderShowtimes() {
  const container = document.getElementById('showtime-options');
  container.innerHTML = SHOWTIMES.map(s => `
    <button class="showtime-btn" data-id="${s.id}">
      <span class="showtime-label-text">${s.label}</span>
      <span class="showtime-time">${s.time}</span>
    </button>
  `).join('');

  const btns = container.querySelectorAll('.showtime-btn');
  // Default first
  btns[0].classList.add('active');
  currentShowtime = SHOWTIMES[0];
  updateShowtimeSidebar(SHOWTIMES[0]);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentShowtime = SHOWTIMES.find(s => s.id === btn.dataset.id);
      updateShowtimeSidebar(currentShowtime);
    });
  });
}

function updateShowtimeSidebar(showtime) {
  document.getElementById('sidebar-showtime-text').textContent =
    `${showtime.label} Show — ${showtime.time}`;
}

// ── Seat Map ──
function renderSeatMap() {
  const map = document.getElementById('seat-map');
  map.innerHTML = '';

  // Number row header
  const numRow = createNumberRow();
  map.appendChild(numRow);

  SEAT_CONFIG.rowLabels.forEach((rowLabel, rowIndex) => {
    const tier = getTier(rowIndex);

    // Tier divider label
    const isFirstOfTier =
      rowIndex === SEAT_CONFIG.tierRanges.gold[0] ||
      rowIndex === SEAT_CONFIG.tierRanges.silver[0] ||
      rowIndex === SEAT_CONFIG.tierRanges.bronze[0];

    if (isFirstOfTier) {
      map.appendChild(createTierLabel(tier));
    }

    map.appendChild(createSeatRow(rowLabel, rowIndex, tier));
  });
}

function createNumberRow() {
  const numRow = document.createElement('div');
  numRow.className = 'seat-numbers-row';
  for (let n = 1; n <= SEAT_CONFIG.seatsPerRow; n++) {
    const el = document.createElement('div');
    el.className = 'seat-num';
    el.textContent = n;
    numRow.appendChild(el);
    if (n === SEAT_CONFIG.aisleAfter) {
      const gap = document.createElement('div');
      gap.className = 'seat-num aisle';
      numRow.appendChild(gap);
    }
  }
  return numRow;
}

function createTierLabel(tier) {
  const el = document.createElement('div');
  el.className = 'tier-section-label';
  const price = currentMovie.prices[tier];
  el.innerHTML = `
    <span class="tier-line"></span>
    <span class="tier-section-label-text" style="color:${TIER_COLORS[tier]}">${TIER_LABELS[tier]}</span>
    <span class="tier-section-label-price">₹${price}/seat</span>
    <span class="tier-line"></span>
  `;
  return el;
}

function createSeatRow(rowLabel, rowIndex, tier) {
  const row = document.createElement('div');
  row.className = 'seat-row';

  const label = document.createElement('div');
  label.className = 'seat-row-label';
  label.textContent = rowLabel;
  row.appendChild(label);

  const seatsWrap = document.createElement('div');
  seatsWrap.className = 'seat-row-seats';

  for (let n = 1; n <= SEAT_CONFIG.seatsPerRow; n++) {
    const seatId = `${rowLabel}${n}`;
    const booked = SEAT_CONFIG.bookedSeats.includes(seatId);
    const price = currentMovie.prices[tier];

    const seat = document.createElement('div');
    seat.className = `seat ${tier}${booked ? ' booked' : ''}`;
    seat.dataset.seat = seatId;
    seat.dataset.tier = tier;
    seat.dataset.price = price;
    seat.setAttribute('role', 'button');
    seat.setAttribute('aria-label', booked ? `${seatId} — Booked` : `${seatId} — ₹${price}`);
    seat.setAttribute('tabindex', booked ? '-1' : '0');

    if (!booked) {
      seat.addEventListener('click', () => toggleSeat(seat));
      seat.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSeat(seat); }
      });
    }
    seatsWrap.appendChild(seat);

    if (n === SEAT_CONFIG.aisleAfter) {
      const aisle = document.createElement('div');
      aisle.className = 'seat-aisle';
      seatsWrap.appendChild(aisle);
    }
  }
  row.appendChild(seatsWrap);
  return row;
}

function getTier(rowIndex) {
  if (rowIndex <= SEAT_CONFIG.tierRanges.gold[1]) return 'gold';
  if (rowIndex <= SEAT_CONFIG.tierRanges.silver[1]) return 'silver';
  return 'bronze';
}

// ── Seat Toggle ──
function toggleSeat(seatEl) {
  const seatId = seatEl.dataset.seat;
  const tier = seatEl.dataset.tier;
  const price = parseInt(seatEl.dataset.price);

  if (seatEl.classList.contains('selected')) {
    seatEl.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s.id !== seatId);
  } else {
    if (selectedSeats.length >= MAX_SEATS) {
      showToast('⚠️ Maximum 8 seats per booking');
      const warn = document.getElementById('max-seats-warn');
      warn.classList.add('visible');
      setTimeout(() => warn.classList.remove('visible'), 2500);
      return;
    }
    seatEl.classList.add('selected');
    selectedSeats.push({ id: seatId, tier, price });
  }
  updateSidebar();
}

// ── Booking Sidebar ──
function updateSidebar() {
  const emptyMsg = document.getElementById('empty-seats-msg');
  const seatsList = document.getElementById('selected-seats-list');
  const priceSec = document.getElementById('price-breakdown');
  const confirmBtn = document.getElementById('confirm-btn');
  const countInfo = document.getElementById('seats-count-info');

  if (selectedSeats.length === 0) {
    emptyMsg.style.display = 'block';
    seatsList.style.display = 'none';
    priceSec.style.display = 'none';
    confirmBtn.disabled = true;
    countInfo.textContent = 'Select up to 8 seats';
    return;
  }

  emptyMsg.style.display = 'none';
  seatsList.style.display = 'block';
  priceSec.style.display = 'block';
  confirmBtn.disabled = false;

  // Render seat chips
  seatsList.innerHTML = selectedSeats.map(s => `
    <div class="selected-seat-item">
      <div class="seat-item-info">
        <div class="seat-item-dot ${s.tier}"></div>
        <div>
          <div class="seat-item-label">${s.id}</div>
          <div class="seat-item-tier">${capitalize(s.tier)} Class</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <span class="seat-item-price">₹${s.price}</span>
        <span class="seat-item-remove" data-remove="${s.id}" role="button" aria-label="Remove ${s.id}">✕</span>
      </div>
    </div>
  `).join('');

  seatsList.querySelectorAll('.seat-item-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.remove;
      const el = document.querySelector(`.seat[data-seat="${id}"]`);
      if (el) el.classList.remove('selected');
      selectedSeats = selectedSeats.filter(s => s.id !== id);
      updateSidebar();
    });
  });

  // Pricing
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst + CONVENIENCE_FEE;

  document.getElementById('subtotal-val').textContent = `₹${subtotal}`;
  document.getElementById('gst-val').textContent = `₹${gst}`;
  document.getElementById('fee-val').textContent = `₹${CONVENIENCE_FEE}`;
  document.getElementById('total-val').textContent = `₹${total}`;

  const n = selectedSeats.length;
  countInfo.textContent = `${n} seat${n > 1 ? 's' : ''} selected · Total ₹${total}`;
}

// ── Confirm Booking ──
function initConfirmButton() {
  document.getElementById('confirm-btn').addEventListener('click', () => {
    if (!selectedSeats.length || !currentShowtime) return;

    const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst + CONVENIENCE_FEE;

    const booking = {
      bookingId: generateId(),
      movieId: currentMovie.id,
      movieTitle: currentMovie.title,
      moviePoster: currentMovie.poster,
      movieGradient: currentMovie.gradient,
      movieCert: currentMovie.certificate,
      movieDuration: currentMovie.duration,
      movieGenres: currentMovie.genres,
      accentColor: currentMovie.accentColor,
      showtime: currentShowtime,
      seats: selectedSeats,
      subtotal, gst,
      fee: CONVENIENCE_FEE,
      total,
      date: getTomorrowDate(),
      bookedAt: new Date().toISOString()
    };

    localStorage.setItem('cineverse_booking', JSON.stringify(booking));
    window.location.href = 'confirmation.html';
  });
}

// ── Helpers ──
function generateId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = () => chars[Math.floor(Math.random() * chars.length)];
  return `CV-${rand()}${rand()}${rand()}${rand()}-${rand()}${rand()}${rand()}${rand()}-${rand()}${rand()}${rand()}${rand()}`;
}

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function genreIcon(cat) {
  return GENRE_ICONS[cat] || '🎬';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
