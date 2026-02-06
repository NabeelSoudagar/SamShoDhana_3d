import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ setCursorVariant }) {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true });

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
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const text = "WE CREATE DIGITAL EXPERIENCES THAT MATTER";

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2
            className="text-4xl md:text-7xl font-black mb-8 leading-tight"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {text.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
                {word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="char inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    style={{ transformOrigin: "50% 50% -50px" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 mb-8 leading-relaxed"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We are a creative studio specializing in innovative digital solutions.
            Our team combines technical expertise with artistic vision to deliver
            exceptional results that push boundaries and exceed expectations.
          </motion.p>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:scale-105 transition-transform"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Learn More
          </motion.button>
        </div>

        <div className="relative">
          <motion.div
            className="w-full h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="mb-6 w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-white/20 shadow-lg shadow-purple-500/30">
                <img
                  src="/hero-texture.jpg"
                  alt="Innovation"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Innovation First
              </h3>
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
}