import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled || isOpen ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="relative z-50 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/logo.png" alt="SamShoDhana Logo" className="h-16 w-auto brightness-200" />
        </motion.div>

        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {['About', 'Objectives', 'Execution', 'Benefits', 'Registration', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white transition-colors relative text-sm uppercase tracking-wider font-medium"
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              className="block w-6 h-0.5 bg-white transition-transform"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-white transition-opacity"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              className="block w-6 h-0.5 bg-white transition-transform"
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <motion.div
          className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
        >
          {['About', 'Objectives', 'Execution', 'Benefits', 'Registration', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-3xl font-bold text-white hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}