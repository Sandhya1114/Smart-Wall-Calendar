// src/constants/monthThemes.js
// Each month has a unique hero image (Unsplash), accent color, and gradient

export const MONTH_THEMES = {
  0: {
    name: "January",
    season: "Winter",
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=80",
    accent: "#4A90E2",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    cardBg: "#0d1b2a",
    textAccent: "#4A90E2",
    mood: "❄️ Crisp & Cold",
    palette: { primary: "#4A90E2", secondary: "#7EC8E3", bg: "#0d1b2a", surface: "#152535" }
  },
  1: {
    name: "February",
    season: "Winter",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80",
    accent: "#E84393",
    gradient: "linear-gradient(135deg, #2d1b2e 0%, #3d1c3e 50%, #5c1a4a 100%)",
    cardBg: "#1e0f1f",
    textAccent: "#E84393",
    mood: "💝 Love & Warmth",
    palette: { primary: "#E84393", secondary: "#F9A8D4", bg: "#1e0f1f", surface: "#2d1830" }
  },
  2: {
    name: "March",
    season: "Spring",
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80",
    accent: "#52C41A",
    gradient: "linear-gradient(135deg, #0d2010 0%, #1a3d1e 50%, #1f5c28 100%)",
    cardBg: "#0a1a0c",
    textAccent: "#52C41A",
    mood: "🌸 Fresh Beginnings",
    palette: { primary: "#52C41A", secondary: "#95DE64", bg: "#0a1a0c", surface: "#122016" }
  },
  3: {
    name: "April",
    season: "Spring",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc9c?w=1200&q=80",
    accent: "#FFB347",
    gradient: "linear-gradient(135deg, #1f1a00 0%, #2e2800 50%, #3d3500 100%)",
    cardBg: "#1a1500",
    textAccent: "#FFB347",
    mood: "🌷 Blooming Days",
    palette: { primary: "#FFB347", secondary: "#FFD591", bg: "#1a1500", surface: "#251f00" }
  },
  4: {
    name: "May",
    season: "Spring",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80",
    accent: "#36CFC9",
    gradient: "linear-gradient(135deg, #001a1f 0%, #002a30 50%, #003d42 100%)",
    cardBg: "#001518",
    textAccent: "#36CFC9",
    mood: "🌿 Green & Serene",
    palette: { primary: "#36CFC9", secondary: "#87E8DE", bg: "#001518", surface: "#002020" }
  },
  5: {
    name: "June",
    season: "Summer",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    accent: "#FFA940",
    gradient: "linear-gradient(135deg, #1f0a00 0%, #3d1800 50%, #5c2500 100%)",
    cardBg: "#1a0800",
    textAccent: "#FFA940",
    mood: "☀️ Sun & Surf",
    palette: { primary: "#FFA940", secondary: "#FFD591", bg: "#1a0800", surface: "#271200" }
  },
  6: {
    name: "July",
    season: "Summer",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80",
    accent: "#FF7A00",
    gradient: "linear-gradient(135deg, #1f0500 0%, #3d0e00 50%, #5c1500 100%)",
    cardBg: "#1a0400",
    textAccent: "#FF7A00",
    mood: "🔥 Peak Summer",
    palette: { primary: "#FF7A00", secondary: "#FFA940", bg: "#1a0400", surface: "#260900" }
  },
  7: {
    name: "August",
    season: "Summer",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80",
    accent: "#FADB14",
    gradient: "linear-gradient(135deg, #1a1500 0%, #2e2400 50%, #423300 100%)",
    cardBg: "#141000",
    textAccent: "#FADB14",
    mood: "🌻 Golden Days",
    palette: { primary: "#FADB14", secondary: "#FFE58F", bg: "#141000", surface: "#201900" }
  },
  8: {
    name: "September",
    season: "Autumn",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    accent: "#D4380D",
    gradient: "linear-gradient(135deg, #1a0800 0%, #2e1200 50%, #421a00 100%)",
    cardBg: "#150600",
    textAccent: "#D4380D",
    mood: "🍂 Golden Autumn",
    palette: { primary: "#D4380D", secondary: "#FF7A45", bg: "#150600", surface: "#200d00" }
  },
  9: {
    name: "October",
    season: "Autumn",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&q=80",
    accent: "#FA8C16",
    gradient: "linear-gradient(135deg, #1a0d00 0%, #2e1800 50%, #421f00 100%)",
    cardBg: "#150a00",
    textAccent: "#FA8C16",
    mood: "🎃 Spooky Season",
    palette: { primary: "#FA8C16", secondary: "#FFC069", bg: "#150a00", surface: "#221200" }
  },
  10: {
    name: "November",
    season: "Autumn",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    accent: "#8C6244",
    gradient: "linear-gradient(135deg, #12100e 0%, #1f1c18 50%, #2c2820 100%)",
    cardBg: "#0e0c0a",
    textAccent: "#A0785A",
    mood: "🍁 Cozy Vibes",
    palette: { primary: "#A0785A", secondary: "#C4A882", bg: "#0e0c0a", surface: "#1a1714" }
  },
  11: {
    name: "December",
    season: "Winter",
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&q=80",
    accent: "#2F88FF",
    gradient: "linear-gradient(135deg, #0a0f1a 0%, #121b2e 50%, #1a2742 100%)",
    cardBg: "#080e18",
    textAccent: "#2F88FF",
    mood: "🎄 Winter Magic",
    palette: { primary: "#2F88FF", secondary: "#85C1FF", bg: "#080e18", surface: "#101a28" }
  }
};

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const HOLIDAYS = {
  "01-01": "🎆 New Year's Day",
  "02-14": "💝 Valentine's Day",
  "03-08": "👩 Women's Day",
  "04-01": "😄 April Fool's",
  "05-01": "🌿 Labour Day",
  "06-21": "☀️ Summer Solstice",
  "08-15": "🇮🇳 Independence Day",
  "10-02": "🙏 Gandhi Jayanti",
  "10-31": "🎃 Halloween",
  "11-14": "👶 Children's Day",
  "12-25": "🎄 Christmas",
  "12-31": "🎆 New Year's Eve",
};
