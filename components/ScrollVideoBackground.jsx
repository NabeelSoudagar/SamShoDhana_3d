import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const videoThemes = [
  {
    name: 'particles',
    element: (
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    )
  },
  {
    name: 'waves',
    element: (
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
            fill="url(#wave1)"
            animate={{ d: [
              "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z",
              "M0,300 Q300,500 600,300 T1200,300 V800 H0 Z",
              "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    )
  },
  {
    name: 'grid',
    element: (
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}>
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '25px 25px'
          }}
        />
      </div>
    )
  },
  {
    name: 'orbs',
    element: (
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    )
  },
  {
    name: 'neural',
    element: (
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {[...Array(30)].map((_, i) => (
            <g key={i}>
              <motion.circle
                cx={Math.random() * 800}
                cy={Math.random() * 600}
                r="3"
                fill="#00ccff"
                opacity="0.6"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
              {i > 0 && (
                <motion.line
                  x1={Math.random() * 800}
                  y1={Math.random() * 600}
                  x2={Math.random() * 800}
                  y2={Math.random() * 600}
                  stroke="#0099ff"
                  strokeWidth="1"
                  opacity="0.2"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
    )
  }
];

export default function ScrollVideoBackground() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const videoIndex = Math.floor(scrollPercent * videoThemes.length);
      const clampedIndex = Math.min(videoIndex, videoThemes.length - 1);
      setCurrentVideo(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-20">
      <motion.div
        key={currentVideo}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {videoThemes[currentVideo].element}
      </motion.div>
    </div>
  );
}