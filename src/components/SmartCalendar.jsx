// src/components/SmartCalendar.jsx
// Main container — orchestrates all sub-components
import React, { useState, useCallback } from "react";
import { addMonths, subMonths } from "date-fns";
import { MONTH_THEMES } from "../constants/monthThemes";
import { useCalendar } from "../hooks/useCalendar";
import HeroSection from "./Hero/HeroSection";
import CalendarGrid from "./Calendar/CalendarGrid";
import CalendarToolbar from "./Calendar/CalendarToolbar";
import NotesPanel from "./Notes/NotesPanel";
import InsightsBar from "./UI/InsightsBar";
import MiniMonthNav from "./UI/MiniMonthNav";
import KeyboardShortcuts from "./UI/KeyboardShortcuts";
import "./SmartCalendar.css";

const SmartCalendar = () => {
  const cal = useCalendar();
  const theme = MONTH_THEMES[cal.currentDate.getMonth()];

  // Mobile: show notes as a bottom sheet
  const [showMobileNotes, setShowMobileNotes] = useState(false);

  // Handle multi-step month navigation from MiniMonthNav
  const handleMiniNav = useCallback((direction, steps = 1) => {
    let d = cal.currentDate;
    for (let i = 0; i < steps; i++) {
      d = direction === "next" ? addMonths(d, 1) : subMonths(d, 1);
    }
    cal.navigateMonth(direction);
    // If steps > 1, just jump directly
    if (steps > 1) {
      setTimeout(() => cal.setCurrentDate(d), 420);
    }
  }, [cal]);

  return (
    <div
      className="smart-calendar"
      style={{
        "--accent": theme.accent,
        "--bg": theme.palette.bg,
        "--surface": theme.palette.surface,
        "--primary": theme.palette.primary,
      }}
    >
      {/* Paper shadow / book spine effect */}
      <div className="calendar-spine" />

      {/* ── LEFT PANEL: Hero + Calendar ── */}
      <div className="calendar-panel">
        {/* Spiral hero image */}
        <HeroSection
          currentDate={cal.currentDate}
          onPrev={() => cal.navigateMonth("prev")}
          onNext={() => cal.navigateMonth("next")}
          isFlipping={cal.isFlipping}
          flipDirection={cal.flipDirection}
        />

        {/* Quick month navigation strip */}
        <MiniMonthNav
          currentDate={cal.currentDate}
          onNavigate={handleMiniNav}
          theme={theme}
        />

        {/* Selection toolbar */}
        <CalendarToolbar
          currentDate={cal.currentDate}
          selectedStart={cal.selectedStart}
          selectedEnd={cal.selectedEnd}
          isSelectingEnd={cal.isSelectingEnd}
          theme={theme}
          onClear={cal.clearSelection}
          onToday={cal.goToToday}
        />

        {/* Calendar grid */}
        <CalendarGrid
          currentDate={cal.currentDate}
          selectedStart={cal.selectedStart}
          selectedEnd={cal.selectedEnd}
          hoverDate={cal.hoverDate}
          notes={cal.notes}
          theme={theme}
          isSelectingEnd={cal.isSelectingEnd}
          activeNoteDate={cal.activeNoteDate}
          isFlipping={cal.isFlipping}
          flipDirection={cal.flipDirection}
          onDayClick={cal.handleDayClick}
          onDayHover={cal.setHoverDate}
          onDragStart={cal.handleDragStart}
          onDragEnter={cal.handleDragEnter}
          onDragEnd={cal.handleDragEnd}
          focusedDate={cal.focusedDate}
          setFocusedDate={cal.setFocusedDate}
        />

        {/* Insights bar */}
        <InsightsBar
          notes={cal.notes}
          currentDate={cal.currentDate}
          selectedStart={cal.selectedStart}
          selectedEnd={cal.selectedEnd}
          theme={theme}
        />

        {/* Bottom bar: keyboard shortcuts + mobile notes toggle */}
        <div className="calendar-bottom-bar">
          <KeyboardShortcuts theme={theme} />
          <button
            className="mobile-notes-toggle"
            onClick={() => setShowMobileNotes(true)}
          >
            <i className="fas fa-sticky-note" />
            <span>Notes</span>
            {Object.keys(cal.notes).length > 0 && (
              <span className="mobile-notes-badge">{Object.keys(cal.notes).length}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL: Notes ── */}
      <div className="notes-panel-wrap">
        <NotesPanel
          notes={cal.notes}
          selectedStart={cal.selectedStart}
          selectedEnd={cal.selectedEnd}
          currentDate={cal.currentDate}
          updateNote={cal.updateNote}
          deleteNote={cal.deleteNote}
          theme={theme}
        />
      </div>

      {/* ── MOBILE BOTTOM SHEET for Notes ── */}
      {showMobileNotes && (
        <div className="mobile-sheet-overlay" onClick={() => setShowMobileNotes(false)}>
          <div
            className="mobile-sheet"
            onClick={(e) => e.stopPropagation()}
            style={{ "--accent": theme.accent, "--surface": theme.palette.surface }}
          >
            <div className="mobile-sheet__handle" />
            <button className="mobile-sheet__close" onClick={() => setShowMobileNotes(false)}>
              <i className="fas fa-chevron-down" />
            </button>
            <NotesPanel
              notes={cal.notes}
              selectedStart={cal.selectedStart}
              selectedEnd={cal.selectedEnd}
              currentDate={cal.currentDate}
              updateNote={cal.updateNote}
              deleteNote={cal.deleteNote}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCalendar;
