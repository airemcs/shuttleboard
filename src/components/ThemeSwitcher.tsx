import { useState, useEffect } from "react";

type Theme = "green" | "blue";

const themes = {
  green: {
    "--color-primary-green": "#2D5A4A",
    "--color-primary-green-hover": "#245544",
    "--color-primary-green-light": "#E8F0ED",
  },
  blue: {
    "--color-primary-green": "#22356F",
    "--color-primary-green-hover": "#1C2C5E",
    "--color-primary-green-light": "#E6EBF5",
  },
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("green");

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[theme];
    
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "green" ? "blue" : "green"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-sm font-sf-medium transition-all duration-200 cursor-pointer bg-white border border-[#E1E5EA] hover:shadow-xl"
    >
      <div
        className={`size-4 rounded-full transition-colors ${
          theme === "green" ? "bg-[#2D5A4A]" : "bg-[#22356F]"
        }`}
      />
      {theme === "green" ? "Green" : "Blue"}
    </button>
  );
}