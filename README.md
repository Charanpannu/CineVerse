# 🎬 CineVerse

> **Stream. Discover. Book.** — A Netflix + BookMyShow hybrid movie platform.

[![Deploy CineVerse to GitHub Pages](https://github.com/Charanpannu/CINEVERSE/actions/workflows/deploy.yml/badge.svg)](https://github.com/Charanpannu/CINEVERSE/actions/workflows/deploy.yml)

🌐 **Live Demo:** [https://charanpannu.github.io/CINEVERSE](https://charanpannu.github.io/CINEVERSE)

---

## ✨ Features

- **Netflix-style Home Page** — Full-screen hero, horizontal movie carousels grouped by genre
- **Movie Detail Modal** — Rating, synopsis, cast, director, genre tags
- **Interactive Seat Booking** — 12×14 seat map with Gold/Silver/Bronze tiers
- **Real-time Pricing** — Subtotal + 18% GST + ₹30 convenience fee
- **Booking Confirmation** — Animated ticket card with QR code & confetti 🎉
- **Search** — Live movie search by title, genre, director, cast
- **Category Filters** — Action, Sci-Fi, Thriller, Horror, Drama, Romance, Fantasy

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS (Glassmorphism, Animations) |
| Logic | Vanilla JavaScript (ES6) |
| Fonts | Google Fonts — Outfit + Inter |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
CINEVERSE/
├── index.html              # Home page (Netflix-style)
├── booking.html            # Seat selection page
├── confirmation.html       # Booking confirmation
├── css/
│   ├── main.css            # Design tokens, glassmorphism, animations
│   ├── home.css            # Hero, navbar, movie cards, modal
│   ├── booking.css         # Seat map, tiers, sidebar
│   └── confirmation.css    # Ticket card, confetti
├── js/
│   ├── data.js             # 10 movies dataset + seat config
│   ├── home.js             # Home page logic
│   ├── booking.js          # Seat booking logic
│   └── confirmation.js     # Confirmation display
├── assets/
│   ├── poster_stellar_horizon.png
│   ├── poster_iron_tempest.png
│   ├── poster_neon_dreams.png
│   └── poster_midnight_requiem.png
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
└── server.js               # Local dev server (Node.js)
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Charanpannu/CINEVERSE.git
cd CINEVERSE

# Start the local server (requires Node.js)
node server.js

# Open in browser
# → http://localhost:3333
```

---

## 🎯 Booking Flow

```
Home Page → Click Movie Card → Movie Detail Modal
         → Book Tickets → Select Showtime → Choose Seats
         → Confirm Booking → Ticket Confirmation 🎉
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#09090f` (deep dark) |
| Surface | `#12121c` |
| Accent Red | `#e50914` (Netflix red) |
| Accent Gold | `#f5a623` |
| Glass | `rgba(255,255,255,0.05)` + `backdrop-filter: blur(16px)` |
| Font Display | Outfit (900 weight) |
| Font Body | Inter |

---

## 🏷️ Seat Tiers

| Tier | Rows | Price Range |
|---|---|---|
| 🥇 Gold (Premium) | A–D | ₹340–₹480 |
| 🥈 Silver (Standard) | E–H | ₹230–₹320 |
| 🥉 Bronze (Economy) | I–L | ₹135–₹190 |

---

*Made with ❤️ for movie lovers*
