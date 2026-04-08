// src/components/Calendar/CalendarGrid.jsx
import React from "react";
import { getCalendarDays } from "../../utils/dateUtils";
import { WEEKDAYS } from "../../constants/monthThemes";
import DayCell from "./DayCell";
import "./CalendarGrid.css";

const CalendarGrid = ({
  currentDate, selectedStart, selectedEnd, hoverDate, notes,
  theme, isSelectingEnd, activeNoteDate, isFlipping, flipDirection,
  onDayClick, onDayHover, onDragStart, onDragEnter, onDragEnd,
  focusedDate, setFocusedDate,
}) => {
  const days = getCalendarDays(currentDate);

  return (
    <div
      className={`calendar-grid-wrap ${isFlipping ? `flip-grid-${flipDirection}` : "flip-grid-in"}`}
      onMouseLeave={onDragEnd}
      onMouseUp={onDragEnd}
    >
      {/* Weekday headers */}
      <div className="calendar-weekdays">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className={`calendar-weekday ${d === "Sun" || d === "Sat" ? "calendar-weekday--weekend" : ""}`}
            style={{ "--accent": theme.accent }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells grid */}
      <div className="calendar-days">
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            currentDate={currentDate}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            hoverDate={hoverDate}
            notes={notes}
            theme={theme}
            isSelectingEnd={isSelectingEnd}
            activeNoteDate={activeNoteDate}
            onClick={onDayClick}
            onMouseEnter={onDayHover}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            focusedDate={focusedDate}
            onFocus={setFocusedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CalendarGrid);
