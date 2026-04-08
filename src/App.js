// src/App.js
import React from "react";
import SmartCalendar from "./components/SmartCalendar";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      {/* Ambient background glow */}
      <div className="app-bg" />
      <main className="app-main">
        <SmartCalendar />
      </main>
      <footer className="app-footer">
        <span>Smart Wall Calendar </span>
      </footer>
    </div>
  );
}

export default App;
