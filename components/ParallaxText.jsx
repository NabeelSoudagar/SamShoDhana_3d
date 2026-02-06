import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxText() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const chars = gsap.utils.toArray('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const text = "INNOVATE • CREATE • TRANSFORM • INSPIRE";
  
  return (
    <section ref={containerRef} className="py-32 overflow-hidden relative">
      <motion.div 
        style={{ y, opacity }}
        className="text-center"
      >
        <div className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text leading-none">
          {text.split('').map((char, index) => (
            <span 
              key={index} 
              className="char inline-block"
              style={{ 
                transformOrigin: '50% 50% -50px',
                display: char === ' ' ? 'inline' : 'inline-block'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-2xl text-gray-400 font-light tracking-wider"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          The Future is Now
        </motion.div>
      </motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  );
}