// src/components/Calendar/DayCell.jsx
import React from "react";
import { isToday, isSameMonth, format } from "date-fns";
import { isInRange, isRangeStart, isRangeEnd, formatDateKey } from "../../utils/dateUtils";
import { HOLIDAYS } from "../../constants/monthThemes";
import "./DayCell.css";

const DayCell = ({
  day, currentDate, selectedStart, selectedEnd, hoverDate,
  notes, theme, isSelectingEnd, activeNoteDate,
  onClick, onMouseEnter, onDragStart, onDragEnter,
  focusedDate, onFocus,
}) => {
  const dateKey = formatDateKey(day);
  const mmdd = format(day, "MM-dd");
  const holiday = HOLIDAYS[mmdd];
  const hasNote = !!notes[dateKey];
  const isCurrentMonth = isSameMonth(day, currentDate);
  const isCurrentDay = isToday(day);
  const isFocused = focusedDate && format(focusedDate, "yyyy-MM-dd") === dateKey;

  // Range logic — when picking end, use hoverDate as preview
  const effectiveEnd = isSelectingEnd && hoverDate ? hoverDate : selectedEnd;

  const inRange = isInRange(day, selectedStart, effectiveEnd);
  const rangeStart = isRangeStart(day, selectedStart, effectiveEnd);
  const rangeEnd = isRangeEnd(day, selectedStart, effectiveEnd);
  const isActive = activeNoteDate === dateKey;

  const isWeekend = day.getDay() === 0 || day.getDay() === 6;

  const classes = [
    "day-cell",
    !isCurrentMonth && "day-cell--outside",
    isCurrentDay && "day-cell--today",
    rangeStart && "day-cell--start",
    rangeEnd && "day-cell--end",
    inRange && !rangeStart && !rangeEnd && "day-cell--in-range",
    isActive && "day-cell--active",
    isFocused && "day-cell--focused",
    isWeekend && isCurrentMonth && "day-cell--weekend",
    holiday && "day-cell--holiday",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      style={{ "--accent": theme.accent, "--accent-soft": theme.accent + "33" }}
      onClick={() => isCurrentMonth && onClick(day)}
      onMouseEnter={() => { onMouseEnter(day); onFocus && onFocus(day); }}
      onMouseDown={() => isCurrentMonth && onDragStart(day)}
      onMouseOver={() => isCurrentMonth && onDragEnter(day)}
      tabIndex={isCurrentMonth ? 0 : -1}
      aria-label={`${format(day, "MMMM d, yyyy")}${hasNote ? " (has note)" : ""}${isCurrentDay ? " (today)" : ""}`}
      role="button"
    >
      {/* Range background bar */}
      {(inRange || rangeStart || rangeEnd) && (
        <div className="day-cell__range-bar" />
      )}

      {/* Day number */}
      <span className="day-cell__number">{format(day, "d")}</span>

      {/* Note dot indicator */}
      {hasNote && isCurrentMonth && (
        <div className="day-cell__note-dot" style={{ background: theme.accent }} />
      )}

      {/* Holiday tooltip */}
      {holiday && isCurrentMonth && (
        <div className="day-cell__holiday-tip">{holiday}</div>
      )}

      {/* Today pulse ring */}
      {isCurrentDay && <div className="day-cell__today-ring" />}
    </div>
  );
};

export default React.memo(DayCell);
