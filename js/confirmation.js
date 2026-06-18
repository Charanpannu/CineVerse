// ============================================
// CINEVERSE — Confirmation Page Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem('cineverse_booking');
  if (!raw) {
    window.location.href = 'index.html';
    return;
  }
  const booking = JSON.parse(raw);
  populateTicket(booking);
  generateQR(booking.bookingId);
  launchConfetti();
});

// ── Populate Ticket ──
function populateTicket(b) {
  document.title = `Booking Confirmed — ${b.movieTitle} | CineVerse`;

  // Booking ID
  document.getElementById('booking-id-value').textContent = b.bookingId;

  // Ticket header bg
  const bgImg = document.getElementById('ticket-bg-img');
  const bgGrad = document.getElementById('ticket-bg-gradient');
  if (b.moviePoster) {
    bgImg.src = b.moviePoster;
    bgImg.style.display = 'block';
    bgGrad.style.display = 'none';
  } else {
    bgImg.style.display = 'none';
    bgGrad.style.cssText = `display:block; background:${b.movieGradient}`;
  }

  // Ticket poster thumbnail
  const tPosterImg = document.getElementById('ticket-poster-img');
  const tPosterPH = document.getElementById('ticket-poster-placeholder');
  if (b.moviePoster) {
    tPosterImg.src = b.moviePoster;
    tPosterPH.style.display = 'none';
  } else {
    tPosterImg.style.display = 'none';
    tPosterPH.style.cssText = `display:flex;align-items:center;justify-content:center;background:${b.movieGradient};font-size:1.8rem;width:100%;height:100%`;
    tPosterPH.textContent = '🎬';
  }

  // Text fields
  document.getElementById('ticket-movie-title').textContent = b.movieTitle;
  document.getElementById('ticket-cert').textContent = b.movieCert;
  document.getElementById('ticket-duration').textContent = b.movieDuration;
  document.getElementById('ticket-date').textContent = b.date;
  document.getElementById('ticket-showtime').textContent =
    `${b.showtime.label} — ${b.showtime.time}`;
  document.getElementById('ticket-screen').textContent = 'Screen 4 — IMAX';
  document.getElementById('ticket-total').textContent = `₹${b.total}`;
  document.getElementById('qr-code-text').textContent = b.bookingId;

  // Seat chips
  document.getElementById('ticket-seats').innerHTML = b.seats
    .map(s => `<span class="ticket-seat-chip ${s.tier}">${s.id}</span>`)
    .join('');
}

// ── QR Code (visual pattern) ──
function generateQR(bookingId) {
  const qr = document.getElementById('qr-code');
  qr.innerHTML = '';
  const seed = bookingId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const size = 7;

  // Finder pattern positions (top-left, top-right, bottom-left corners)
  const finderCells = new Set();
  // Top-left corner (rows 0-2, cols 0-2)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) finderCells.add(r * size + c);
  // Top-right corner (rows 0-2, cols 4-6)
  for (let r = 0; r < 3; r++) for (let c = 4; c < 7; c++) finderCells.add(r * size + c);
  // Bottom-left corner (rows 4-6, cols 0-2)
  for (let r = 4; r < 7; r++) for (let c = 0; c < 3; c++) finderCells.add(r * size + c);

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.className = 'qr-cell';
    let dark;
    if (finderCells.has(i)) {
      dark = true;
    } else {
      // Pseudo-random data cells
      dark = ((seed * 31 + i * 17 + i * i * 7) % 23) < 11;
    }
    cell.classList.add(dark ? 'dark' : 'light');
    qr.appendChild(cell);
  }
}

// ── Confetti ──
function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const palette = [
    '#e50914', '#f5a623', '#10b981',
    '#3b82f6', '#ec4899', '#8b5cf6',
    '#ffffff', '#facc15', '#34d399'
  ];

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const left = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const dur = 1.8 + Math.random() * 2.2;
    const size = 7 + Math.random() * 9;
    const rot = Math.random() * 360;
    const color = palette[Math.floor(Math.random() * palette.length)];

    piece.style.cssText = `
      left: ${left}%;
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      transform: rotate(${rot}deg);
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (delay + dur) * 1000 + 300);
  }
}
