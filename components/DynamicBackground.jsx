import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    name: 'cyber',
    gradient: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    particles: '#7c3aed',
    accent: '#ec4899'
  },
  {
    name: 'neon',
    gradient: 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #660099 100%)',
    particles: '#ff00ff',
    accent: '#00ffff'
  },
  {
    name: 'matrix',
    gradient: 'linear-gradient(135deg, #001100 0%, #003300 50%, #006600 100%)',
    particles: '#00ff00',
    accent: '#33ff33'
  },
  {
    name: 'sunset',
    gradient: 'linear-gradient(135deg, #1a0800 0%, #331100 50%, #662200 100%)',
    particles: '#ff6600',
    accent: '#ff9900'
  },
  {
    name: 'ocean',
    gradient: 'linear-gradient(135deg, #001122 0%, #002244 50%, #003366 100%)',
    particles: '#0099ff',
    accent: '#00ccff'
  }
];

export default function DynamicBackground() {
  const [currentTheme, setCurrentTheme] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const themeIndex = Math.floor(scrollPercent * themes.length);
      const clampedIndex = Math.min(themeIndex, themes.length - 1);
      setCurrentTheme(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          className="absolute inset-0"
          style={{ background: themes[currentTheme].gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`${currentTheme}-${i}`}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{ backgroundColor: themes[currentTheme].particles }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${themes[currentTheme].accent}10 0%, transparent 70%)`
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}