// src/components/Hero/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { MONTH_THEMES } from "../../constants/monthThemes";
import "./HeroSection.css";

const HeroSection = ({ currentDate, onPrev, onNext, isFlipping, flipDirection }) => {
  const month = currentDate.getMonth();
  const theme = MONTH_THEMES[month];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prevTheme, setPrevTheme] = useState(theme);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = theme.image;
    img.onload = () => {
      setImageLoaded(true);
      setPrevTheme(theme);
    };
  }, [theme.image]);

  return (
    <div className="hero-section" style={{ "--accent": theme.accent }}>
      {/* Spiral binding */}
      <div className="spiral-binding">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="spiral-ring" />
        ))}
      </div>

      {/* Background image with parallax */}
      <div
        className={`hero-image-wrap ${imageLoaded ? "loaded" : ""} ${isFlipping ? `flip-${flipDirection}` : ""}`}
      >
        <img
          src={theme.image}
          alt={theme.name}
          className="hero-img"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="hero-overlay" style={{ background: theme.gradient.replace("135deg", "180deg") }} />
      </div>

      {/* Month badge */}
      <div className="hero-badge">
        <span className="hero-mood">{theme.mood}</span>
        <span className="hero-season">{theme.season}</span>
      </div>

      {/* Month & Year title */}
      <div className={`hero-title-block ${isFlipping ? `flip-title-${flipDirection}` : ""}`}>
        <h2 className="hero-year">{format(currentDate, "yyyy")}</h2>
        <h1 className="hero-month" style={{ color: theme.accent }}>
          {format(currentDate, "MMMM").toUpperCase()}
        </h1>
        <div className="hero-divider" style={{ background: theme.accent }} />
      </div>

      {/* Navigation arrows */}
      <button className="hero-nav hero-nav--prev" onClick={onPrev} aria-label="Previous month">
        <i className="fas fa-chevron-left" />
      </button>
      <button className="hero-nav hero-nav--next" onClick={onNext} aria-label="Next month">
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
};

export default HeroSection;
