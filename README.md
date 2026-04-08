# 🗓 Smart Wall Calendar

A **premium, interactive wall calendar** built with React — designed to stand out from the crowd with stunning aesthetics, smooth animations, and thoughtful UX.

> Built as a frontend engineering challenge. Every detail is intentional.

---

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Physical spiral-bound calendar look with dynamic monthly hero images
- **Day Range Selection** — Click-to-select start/end with animated glow highlight and hover preview
- **Drag to Select** — Click and drag across days to select a range instantly
- **Contextual Notes System** — Notes linked to individual dates or ranges, with dot indicators on dates
- **localStorage Persistence** — All notes persist across browser sessions
- **Fully Responsive** — Desktop split-panel layout; mobile collapses to stacked with a bottom sheet notes drawer

### Wow Factors
- 🌍 **Dynamic Month Themes** — Each of the 12 months has a unique hero image, color palette, and mood (fetched from Unsplash)
- 🔄 **Page Flip Animation** — Month transitions animate like turning a real calendar page
- 📅 **Mini Month Navigation Strip** — Quick-jump to any month in the year from a subtle tab row
- 🎯 **Today Focus Mode** — Jump to today instantly with a single click
- 💡 **Smart Insights Bar** — Live chips showing note counts, selection duration, this-week activity
- 🏖 **Holiday Markers** — Hover a holiday date to see a tooltip with the holiday name
- ⌨️ **Full Keyboard Navigation** — Arrow keys to move, Enter to select, Esc to clear
- 📱 **Mobile Bottom Sheet** — Notes panel slides up from the bottom on small screens

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarGrid.jsx      # Day grid container
│   │   ├── CalendarGrid.css
│   │   ├── CalendarToolbar.jsx   # Selection summary + today button
│   │   ├── CalendarToolbar.css
│   │   ├── DayCell.jsx           # Individual day cell with all visual states
│   │   └── DayCell.css
│   ├── Hero/
│   │   ├── HeroSection.jsx       # Monthly hero image + spiral binding
│   │   └── HeroSection.css
│   ├── Notes/
│   │   ├── NotesPanel.jsx        # Full notes UI (tabs: selected / month)
│   │   └── NotesPanel.css
│   ├── UI/
│   │   ├── InsightsBar.jsx       # Smart insight chips
│   │   ├── InsightsBar.css
│   │   ├── KeyboardShortcuts.jsx # Floating keyboard shortcut guide
│   │   ├── KeyboardShortcuts.css
│   │   ├── MiniMonthNav.jsx      # 12-month quick-nav strip
│   │   └── MiniMonthNav.css
│   ├── SmartCalendar.jsx         # Main orchestrating container
│   └── SmartCalendar.css
├── constants/
│   └── monthThemes.js            # Per-month image/color/gradient/mood config
├── hooks/
│   ├── useCalendar.js            # All calendar state + interactions
│   └── useInsights.js            # Derived insight chips from state
├── utils/
│   ├── dateUtils.js              # date-fns wrappers (range logic, formatting)
│   └── storage.js                # localStorage read/write helpers
├── App.js
├── App.css                       # Global fonts, background, layout
└── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Install & Run

```bash
git clone <your-repo-url>
cd smart-wall-calendar
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Deploy the `build/` folder to Vercel, Netlify, or GitHub Pages.

---

## 🎨 Design Decisions

| Decision | Rationale |
|---|---|
| **Dark theme with per-month color accents** | Creates emotional resonance; calendar feels alive across seasons |
| **Playfair Display + DM Mono font pairing** | Elegant serif for month names; monospace for dates gives a precise, technical feel |
| **Unsplash hero images** | Instantly elevates the calendar from "tool" to "experience" |
| **No backend** | localStorage is sufficient for personal notes; keeps the app blazing fast |
| **Modular hook architecture** | `useCalendar` owns all state; components are pure presentational |
| **CSS animations over JS libraries** | Zero runtime overhead; buttery smooth on low-end devices |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `← → ↑ ↓` | Navigate between dates |
| `Enter` | Select focused date |
| `Esc` | Clear selection |
| `Ctrl + Enter` | Save current note |

---

## 📦 Tech Stack

- **React 18** — Hooks-based, no class components
- **date-fns 3** — Lightweight date manipulation
- **Font Awesome 6** — Icons (CDN)
- **Google Fonts** — Playfair Display + DM Mono
- **CSS Modules / BEM** — Scoped, maintainable styles (no CSS-in-JS overhead)
- **localStorage** — Persistence without a backend

---

## 🔮 Future Enhancements

- [ ] Export notes as PDF
- [ ] iCal / Google Calendar sync
- [ ] Custom event colors
- [ ] Recurring event support
- [ ] Dark/light theme toggle
- [ ] Week view

---

