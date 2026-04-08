// src/components/UI/KeyboardShortcuts.jsx
import React, { useState } from "react";
import "./KeyboardShortcuts.css";

const shortcuts = [
  { keys: ["←", "→", "↑", "↓"], desc: "Navigate dates" },
  { keys: ["Enter"], desc: "Select focused date" },
  { keys: ["Esc"], desc: "Clear selection" },
  { keys: ["Ctrl", "+Enter"], desc: "Save note" },
];

const KeyboardShortcuts = ({ theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="kb-shortcuts" style={{ "--accent": theme.accent }}>
      <button className="kb-toggle" onClick={() => setOpen((v) => !v)} title="Keyboard shortcuts">
        <i className="fas fa-keyboard" />
      </button>
      {open && (
        <div className="kb-panel">
          <div className="kb-panel__header">
            <i className="fas fa-keyboard" />
            <span>Keyboard Shortcuts</span>
            <button className="kb-close" onClick={() => setOpen(false)}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="kb-list">
            {shortcuts.map((s, i) => (
              <div key={i} className="kb-row">
                <div className="kb-keys">
                  {s.keys.map((k, j) => (
                    <React.Fragment key={j}>
                      <kbd className="kb-key">{k}</kbd>
                      {j < s.keys.length - 1 && <span className="kb-plus">+</span>}
                    </React.Fragment>
                  ))}
                </div>
                <span className="kb-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyboardShortcuts;
