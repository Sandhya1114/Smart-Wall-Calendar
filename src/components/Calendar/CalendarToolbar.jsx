// src/components/Calendar/CalendarToolbar.jsx
import React from "react";
import { format } from "date-fns";
import { getRangeDuration, formatDisplayDate } from "../../utils/dateUtils";
import "./CalendarToolbar.css";

const CalendarToolbar = ({
  currentDate, selectedStart, selectedEnd,
  isSelectingEnd, theme, onClear, onToday,
}) => {
  const duration = getRangeDuration(selectedStart, selectedEnd);
  const start = selectedStart && !selectedEnd
    ? isSelectingEnd
      ? `From: ${formatDisplayDate(selectedStart)}`
      : formatDisplayDate(selectedStart)
    : null;

  return (
    <div className="calendar-toolbar" style={{ "--accent": theme.accent }}>
      {/* Selection summary */}
      <div className="calendar-toolbar__range">
        {selectedStart && selectedEnd ? (
          <>
            <i className="fas fa-calendar-check toolbar-icon" />
            <span className="toolbar-range-text">
              {formatDisplayDate(selectedStart)} → {formatDisplayDate(selectedEnd)}
              <em className="toolbar-duration">&nbsp;({duration}d)</em>
            </span>
            <button className="toolbar-clear" onClick={onClear} title="Clear selection">
              <i className="fas fa-times" />
            </button>
          </>
        ) : isSelectingEnd ? (
          <>
            <i className="fas fa-circle-dot toolbar-icon blink" />
            <span className="toolbar-hint">Click to set end date…</span>
          </>
        ) : (
          <>
            <i className="fas fa-hand-pointer toolbar-icon" />
            <span className="toolbar-hint">Click a date to start selecting</span>
          </>
        )}
      </div>

      {/* Today button */}
      <button className="toolbar-today-btn" onClick={onToday} title="Jump to today">
        <i className="fas fa-crosshairs" />
        <span>Today</span>
      </button>
    </div>
  );
};

export default CalendarToolbar;
