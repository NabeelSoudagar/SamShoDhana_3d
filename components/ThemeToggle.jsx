import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    name: 'Grid',
    layout: 'grid',
    bg: 'from-purple-900 via-blue-900 to-indigo-900',
    accent: 'purple',
    description: 'Structured grid layout'
  },
  {
    name: 'Circle',
    layout: 'circle',
    bg: 'from-pink-900 via-purple-900 to-indigo-900',
    accent: 'pink',
    description: 'Circular arrangement'
  },
  {
    name: 'Wave',
    layout: 'wave',
    bg: 'from-green-900 via-emerald-900 to-teal-900',
    accent: 'green',
    description: 'Flowing wave patterns'
  },
  {
    name: 'Minimal',
    layout: 'minimal',
    bg: 'from-orange-900 via-red-900 to-pink-900',
    accent: 'orange',
    description: 'Clean minimal design'
  }
];

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function ThemeToggle({ children }) {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const cycleTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  const selectTheme = (index) => {
    setCurrentTheme(index);
    setIsOpen(false);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], currentTheme }}>
      {children}
      {/* Theme toggle UI removed per user request */}
    </ThemeContext.Provider>
  );
}
