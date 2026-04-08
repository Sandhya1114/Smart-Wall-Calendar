// src/components/UI/MiniMonthNav.jsx
// Shows a horizontal strip of months for quick navigation
import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import "./MiniMonthNav.css";

const MONTH_ABBR = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

const MiniMonthNav = ({ currentDate, onNavigate, theme }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  return (
    <div className="mini-month-nav" style={{ "--accent": theme.accent }}>
      {MONTH_ABBR.map((abbr, i) => {
        const isActive = i === currentMonth;
        const hasToday = i === today.getMonth() && currentYear === today.getFullYear();
        const diff = i - currentMonth;

        return (
          <button
            key={i}
            className={`mini-month-btn ${isActive ? "mini-month-btn--active" : ""} ${hasToday ? "mini-month-btn--today" : ""}`}
            onClick={() => {
              if (diff !== 0) {
                // Navigate via addMonths/subMonths relative
                onNavigate(diff > 0 ? "next" : "prev", Math.abs(diff));
              }
            }}
            title={`${abbr} ${currentYear}`}
          >
            {abbr}
            {hasToday && <span className="mini-today-dot" />}
          </button>
        );
      })}
    </div>
  );
};

export default MiniMonthNav;
