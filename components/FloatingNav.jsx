import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', icon: '🏠', href: '#home' },
  { name: 'About', icon: '✨', href: '#about' },
  { name: 'Journey', icon: '🚀', href: '#journey' },
  { name: 'Contact', icon: '💬', href: '#contact' }
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.name.toLowerCase()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.name.toLowerCase())}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium hidden sm:block">{item.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}