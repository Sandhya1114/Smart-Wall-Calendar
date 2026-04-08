// src/components/Notes/NotesPanel.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { format, eachDayOfInterval, isAfter } from "date-fns";
import { formatDateKey, formatDisplayDate } from "../../utils/dateUtils";
import "./NotesPanel.css";

// ── NoteEntry must be defined OUTSIDE NotesPanel to prevent remount on every keystroke ──
const NoteEntry = ({
  dateKey, date, existing, isEditing, theme,
  draftText, onDraftChange, onStartEdit, onSave, onCancel, onDelete, textareaRef,
}) => {
  return (
    <div
      className={`note-entry ${existing ? "note-entry--has-note" : "note-entry--empty"} ${isEditing ? "note-entry--editing" : ""}`}
      style={{ "--accent": theme.accent }}
    >
      <div className="note-entry__header">
        <div className="note-entry__date">
          <i className="fas fa-calendar-day note-icon" />
          <span>{formatDisplayDate(date)}</span>
        </div>
        <div className="note-entry__actions">
          {existing && !isEditing && (
            <>
              <button onClick={() => onStartEdit(dateKey, existing.text)} className="note-btn note-btn--edit" title="Edit">
                <i className="fas fa-pen" />
              </button>
              <button onClick={() => onDelete(dateKey)} className="note-btn note-btn--delete" title="Delete">
                <i className="fas fa-trash" />
              </button>
            </>
          )}
          {!existing && !isEditing && (
            <button onClick={() => onStartEdit(dateKey, "")} className="note-btn note-btn--add" title="Add note">
              <i className="fas fa-plus" />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="note-editor">
          <textarea
            ref={textareaRef}
            value={draftText}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Write your note here…"
            className="note-textarea"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) onSave(dateKey);
              if (e.key === "Escape") onCancel();
            }}
          />
          <div className="note-editor__footer">
            <span className="note-hint">Ctrl+Enter to save</span>
            <div className="note-editor__btns">
              <button onClick={onCancel} className="note-action-btn note-action-btn--cancel">Cancel</button>
              <button onClick={() => onSave(dateKey)} className="note-action-btn note-action-btn--save">
                <i className="fas fa-check" /> Save
              </button>
            </div>
          </div>
        </div>
      ) : existing ? (
        <div className="note-content">
          <p className="note-text">{existing.text}</p>
          <span className="note-timestamp">
            <i className="fas fa-clock" />
            {format(new Date(existing.updatedAt), "MMM d, h:mm a")}
          </span>
        </div>
      ) : (
        <p className="note-empty-text">No note yet — click + to add one.</p>
      )}
    </div>
  );
};

const NotesPanel = ({
  notes, selectedStart, selectedEnd, currentDate,
  updateNote, deleteNote, theme,
}) => {
  const [activeTab, setActiveTab] = useState("selected");
  const [editingKey, setEditingKey] = useState(null);
  const [draftText, setDraftText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (selectedStart) setActiveTab("selected");
  }, [selectedStart, selectedEnd]);

  useEffect(() => {
    if (editingKey && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingKey]);

  const getSelectedDates = () => {
    if (!selectedStart) return [];
    if (!selectedEnd) return [selectedStart];
    const start = isAfter(selectedStart, selectedEnd) ? selectedEnd : selectedStart;
    const end = isAfter(selectedStart, selectedEnd) ? selectedStart : selectedEnd;
    return eachDayOfInterval({ start, end });
  };

  const selectedDates = getSelectedDates();

  const monthNotes = Object.entries(notes)
    .filter(([k]) => {
      const [y, m] = k.split("-");
      return (
        parseInt(y) === currentDate.getFullYear() &&
        parseInt(m) === currentDate.getMonth() + 1
      );
    })
    .sort(([a], [b]) => a.localeCompare(b));

  const startEdit = useCallback((key, existingText = "") => {
    setEditingKey(key);
    setDraftText(existingText);
  }, []);

  const saveNote = useCallback((key) => {
    updateNote(key, draftText);
    setEditingKey(null);
    setDraftText("");
  }, [draftText, updateNote]);

  const cancelEdit = useCallback(() => {
    setEditingKey(null);
    setDraftText("");
  }, []);

  return (
    <div className="notes-panel" style={{ "--accent": theme.accent }}>
      {/* Header */}
      <div className="notes-panel__header">
        <div className="notes-panel__title">
          <div className="notes-title-icon-wrap">
            <i className="fas fa-sticky-note" />
          </div>
          <span>Notes</span>
        </div>
        <div className="notes-tabs">
          <button
            className={`notes-tab ${activeTab === "selected" ? "notes-tab--active" : ""}`}
            onClick={() => setActiveTab("selected")}
          >
            <i className="fas fa-crosshairs" />
            <span>Selected</span>
          </button>
          <button
            className={`notes-tab ${activeTab === "month" ? "notes-tab--active" : ""}`}
            onClick={() => setActiveTab("month")}
          >
            <i className="fas fa-layer-group" />
            <span>Month</span>
            {monthNotes.length > 0 && (
              <span className="notes-tab__badge">{monthNotes.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="notes-panel__body">
        {activeTab === "selected" ? (
          selectedDates.length === 0 ? (
            <div className="notes-empty-state">
              <div className="notes-empty-icon-wrap">
                <i className="fas fa-hand-pointer" />
              </div>
              <p className="notes-empty-title">No dates selected</p>
              <p className="notes-empty-sub">Click dates on the calendar to add notes</p>
            </div>
          ) : (
            <div className="notes-list">
              {selectedDates.map((d) => {
                const dk = formatDateKey(d);
                return (
                  <NoteEntry
                    key={dk}
                    dateKey={dk}
                    date={d}
                    existing={notes[dk]}
                    isEditing={editingKey === dk}
                    theme={theme}
                    draftText={draftText}
                    onDraftChange={setDraftText}
                    onStartEdit={startEdit}
                    onSave={saveNote}
                    onCancel={cancelEdit}
                    onDelete={deleteNote}
                    textareaRef={editingKey === dk ? textareaRef : null}
                  />
                );
              })}
            </div>
          )
        ) : monthNotes.length === 0 ? (
          <div className="notes-empty-state">
            <div className="notes-empty-icon-wrap">
              <i className="fas fa-feather" />
            </div>
            <p className="notes-empty-title">Nothing here yet</p>
            <p className="notes-empty-sub">No notes added this month</p>
          </div>
        ) : (
          <div className="notes-list">
            {monthNotes.map(([key, note]) => {
              const [y, m, d] = key.split("-").map(Number);
              return (
                <NoteEntry
                  key={key}
                  dateKey={key}
                  date={new Date(y, m - 1, d)}
                  existing={notes[key]}
                  isEditing={editingKey === key}
                  theme={theme}
                  draftText={draftText}
                  onDraftChange={setDraftText}
                  onStartEdit={startEdit}
                  onSave={saveNote}
                  onCancel={cancelEdit}
                  onDelete={deleteNote}
                  textareaRef={editingKey === key ? textareaRef : null}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPanel;