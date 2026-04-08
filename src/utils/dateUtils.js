// src/utils/dateUtils.js
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval,
  isToday, addMonths, subMonths, parseISO, isAfter, isBefore,
  differenceInDays, getWeek
} from "date-fns";

export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  return eachDayOfInterval({ start: calStart, end: calEnd });
};

export const formatDateKey = (date) => format(date, "yyyy-MM-dd");

export const formatMonthYear = (date) => format(date, "MMMM yyyy");

export const formatDisplayDate = (date) => format(date, "MMM d, yyyy");

export const isInRange = (day, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  const start = isAfter(startDate, endDate) ? endDate : startDate;
  const end = isAfter(startDate, endDate) ? startDate : endDate;
  return isWithinInterval(day, { start, end });
};

export const isRangeStart = (day, startDate, endDate) => {
  if (!startDate) return false;
  const start = endDate && isAfter(startDate, endDate) ? endDate : startDate;
  return isSameDay(day, start);
};

export const isRangeEnd = (day, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  const end = isAfter(startDate, endDate) ? startDate : endDate;
  return isSameDay(day, end);
};

export const getRangeDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  return Math.abs(differenceInDays(startDate, endDate)) + 1;
};

export const getWeekNumber = (date) => getWeek(date);

export { isSameMonth, isSameDay, isToday, addMonths, subMonths, format, parseISO };
