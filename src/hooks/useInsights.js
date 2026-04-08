// src/hooks/useInsights.js
import { useMemo } from "react";
import { isToday, isThisWeek, isSameMonth, format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { countNotesInMonth } from "../utils/storage";

export const useInsights = (notes, currentDate, selectedStart, selectedEnd) => {
  return useMemo(() => {
    const insights = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Count notes this month
    const monthNoteCount = countNotesInMonth(notes, year, month);
    if (monthNoteCount > 0) {
      insights.push({
        icon: "fa-sticky-note",
        text: `${monthNoteCount} note${monthNoteCount > 1 ? "s" : ""} in ${format(currentDate, "MMMM")}`,
        color: "#4A90E2",
      });
    }

    // Notes this week
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const weekNoteCount = weekDays.filter((d) => {
      const key = format(d, "yyyy-MM-dd");
      return notes[key];
    }).length;

    if (weekNoteCount > 0) {
      insights.push({
        icon: "fa-calendar-week",
        text: `${weekNoteCount} note${weekNoteCount > 1 ? "s" : ""} this week`,
        color: "#52C41A",
      });
    }

    // Selection info
    if (selectedStart && selectedEnd) {
      const days = Math.abs(
        Math.round((selectedEnd - selectedStart) / (1000 * 60 * 60 * 24))
      ) + 1;
      insights.push({
        icon: "fa-arrows-left-right",
        text: `${days} day${days > 1 ? "s" : ""} selected`,
        color: "#FA8C16",
      });
    }

    // Today check
    const todayKey = format(new Date(), "yyyy-MM-dd");
    if (notes[todayKey]) {
      insights.push({
        icon: "fa-star",
        text: "You have a note for today",
        color: "#E84393",
      });
    }

    // Empty state
    if (insights.length === 0) {
      insights.push({
        icon: "fa-lightbulb",
        text: "Click dates to add notes & insights",
        color: "#8B9A7A",
      });
    }

    return insights;
  }, [notes, currentDate, selectedStart, selectedEnd]);
};
