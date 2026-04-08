// src/hooks/useCalendar.js
import { useState, useCallback, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { loadNotes, saveNotes, setNoteForDate } from "../utils/storage";
import { formatDateKey } from "../utils/dateUtils";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [notes, setNotes] = useState(loadNotes);
  const [activeNoteDate, setActiveNoteDate] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [focusedDate, setFocusedDate] = useState(null);

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const navigateMonth = useCallback((direction) => {
    setFlipDirection(direction);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate((prev) =>
        direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
      );
      setIsFlipping(false);
    }, 400);
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setFlipDirection(today > currentDate ? "next" : "prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(today);
      setFocusedDate(today);
      setIsFlipping(false);
    }, 400);
  }, [currentDate]);

  // Click to select: first click = start, second click = end
  const handleDayClick = useCallback((day) => {
    if (!isSelectingEnd) {
      // Start new selection
      setSelectedStart(day);
      setSelectedEnd(null);
      setIsSelectingEnd(true);
      setActiveNoteDate(formatDateKey(day));
    } else {
      // Complete selection
      setSelectedEnd(day);
      setIsSelectingEnd(false);
      setActiveNoteDate(null);
    }
  }, [isSelectingEnd]);

  const handleDayHover = useCallback((day) => {
    setHoverDate(day);
  }, []);

  // Drag to select range
  const handleDragStart = useCallback((day) => {
    setIsDragging(true);
    setDragStart(day);
    setSelectedStart(day);
    setSelectedEnd(null);
    setIsSelectingEnd(false);
  }, []);

  const handleDragEnter = useCallback((day) => {
    if (isDragging && dragStart) {
      setSelectedEnd(day);
    }
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setIsSelectingEnd(false);
    setActiveNoteDate(null);
    setHoverDate(null);
  }, []);

  const updateNote = useCallback((dateKey, text) => {
    setNotes((prev) => setNoteForDate(prev, dateKey, text));
  }, []);

  const deleteNote = useCallback((dateKey) => {
    setNotes((prev) => {
      const updated = { ...prev };
      delete updated[dateKey];
      return updated;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!focusedDate) return;
      const keyMap = {
        ArrowRight: 1,
        ArrowLeft: -1,
        ArrowDown: 7,
        ArrowUp: -7,
      };
      if (keyMap[e.key] !== undefined) {
        e.preventDefault();
        setFocusedDate((prev) => {
          const next = new Date(prev);
          next.setDate(next.getDate() + keyMap[e.key]);
          return next;
        });
      }
      if (e.key === "Enter" && focusedDate) {
        handleDayClick(focusedDate);
      }
      if (e.key === "Escape") {
        clearSelection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedDate, handleDayClick, clearSelection]);

  return {
    currentDate, setCurrentDate,
    selectedStart, selectedEnd,
    hoverDate, setHoverDate: handleDayHover,
    isSelectingEnd,
    notes,
    activeNoteDate, setActiveNoteDate,
    isFlipping, flipDirection,
    isDragging,
    focusedDate, setFocusedDate,
    navigateMonth,
    goToToday,
    handleDayClick,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    clearSelection,
    updateNote,
    deleteNote,
  };
};
