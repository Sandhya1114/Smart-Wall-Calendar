// src/components/UI/InsightsBar.jsx
import React from "react";
import { useInsights } from "../../hooks/useInsights";
import "./InsightsBar.css";

const InsightsBar = ({ notes, currentDate, selectedStart, selectedEnd, theme }) => {
  const insights = useInsights(notes, currentDate, selectedStart, selectedEnd);

  return (
    <div className="insights-bar" style={{ "--accent": theme.accent }}>
      <div className="insights-bar__label">
        <i className="fas fa-chart-line" />
        <span>Smart Insights</span>
      </div>
      <div className="insights-bar__items">
        {insights.map((insight, i) => (
          <div key={i} className="insight-chip" style={{ "--chip-color": insight.color }}>
            <i className={`fas ${insight.icon} insight-chip__icon`} />
            <span>{insight.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsBar;
