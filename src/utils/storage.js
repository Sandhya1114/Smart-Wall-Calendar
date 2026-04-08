// src/utils/storage.js

const STORAGE_KEY = "smart_wall_calendar_notes";

export const loadNotes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error("Failed to save notes:", e);
  }
};

export const getNoteForDate = (notes, dateKey) => notes[dateKey] || null;

export const setNoteForDate = (notes, dateKey, note) => {
  const updated = { ...notes };
  if (!note || note.trim() === "") {
    delete updated[dateKey];
  } else {
    updated[dateKey] = { text: note.trim(), updatedAt: new Date().toISOString() };
  }
  return updated;
};

export const getNotesForRange = (notes, days) => {
  return days
    .map((d) => {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return notes[key] ? { date: d, key, ...notes[key] } : null;
    })
    .filter(Boolean);
};

export const countNotesInMonth = (notes, year, month) => {
  return Object.keys(notes).filter((k) => {
    const [y, m] = k.split("-");
    return parseInt(y) === year && parseInt(m) === month + 1;
  }).length;
};
