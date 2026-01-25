import { useState, useEffect } from "react";

type Theme = "green" | "blue" | "purple";

const themes = {
  green: {
    // Primary colors
    "--color-primary-green": "#2D5A4A",
    "--color-primary-green-hover": "#245544",
    "--color-primary-green-light": "#E8F0ED",
    // Text colors
    "--color-primary-black": "#1A2332",
    "--color-secondary-black": "#5A6577",
    "--color-tertiary-black": "#8B95A5",
    // Background colors
    "--color-background": "#FAFBFC",
    "--color-surface": "#FFFFFF",
    "--color-surface-hover": "#F5F7F9",
    "--color-background-alt": "#F0F3F6",
    // Banner
    "--color-banner": "#EAEEED",
  },
  blue: {
    // Primary colors
    "--color-primary-green": "#22356F",
    "--color-primary-green-hover": "#1C2C5E",
    "--color-primary-green-light": "#E6EBF5",
    // Text colors - slightly cooler/bluer tint
    "--color-primary-black": "#1A2540",
    "--color-secondary-black": "#5A6480",
    "--color-tertiary-black": "#8B93A8",
    // Background colors - slightly cooler
    "--color-background": "#F9FAFC",
    "--color-surface": "#FFFFFF",
    "--color-surface-hover": "#F4F6FA",
    "--color-background-alt": "#EEF1F7",
    // Banner
    "--color-banner": "#EAECF0",
  },
  purple: {
    // Primary colors
    "--color-primary-green": "#4B3F72",
    "--color-primary-green-hover": "#3F345F",
    "--color-primary-green-light": "#ECEAF3",
    // Text colors - slightly warmer/purple tint
    "--color-primary-black": "#231A33",
    "--color-secondary-black": "#5F5A70",
    "--color-tertiary-black": "#928BA5",
    // Background colors - slightly warmer
    "--color-background": "#FAFAFC",
    "--color-surface": "#FFFFFF",
    "--color-surface-hover": "#F6F5F9",
    "--color-background-alt": "#F1F0F6",
    // Banner
    "--color-banner": "#EDEAEF",
  },
};

const themeOrder: Theme[] = ["green", "blue", "purple"];

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
    setTheme((prev) => {
      const currentIndex = themeOrder.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      return themeOrder[nextIndex];
    });
  };

  const themeColors = {
    green: "bg-[#2D5A4A]",
    blue: "bg-[#22356F]",
    purple: "bg-[#4B3F72]",
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-sm font-sf-medium transition-all duration-200 cursor-pointer bg-white border border-[#E1E5EA] hover:shadow-xl"
    >
      <div
        className={`size-4 rounded-full transition-colors ${themeColors[theme]}`}
      />
      {theme.charAt(0).toUpperCase() + theme.slice(1)}
    </button>
  );
}