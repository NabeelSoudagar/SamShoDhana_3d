import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ImageSequence from "./components/ImageSequence";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import DynamicBackground from "./components/DynamicBackground";
import ScrollVideoBackground from "./components/ScrollVideoBackground";
import ThemeToggle, { useTheme } from "./components/ThemeToggle";
import Cursor from "./components/Cursor";
import Particles from "./components/Particles";
import ParallaxLayers from "./components/ParallaxLayers";
import { useScrollAnimation, useParallax, useMagneticHover } from "./hooks/useScrollAnimation";
import { useFormattedCounter } from "./hooks/useCounter";
import "./styles/Theme.css";

export default function App() {
  const { theme } = useTheme();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Counter hooks for statistics
  const counter1 = useFormattedCounter(3000, 2500);
  const counter2 = useFormattedCounter(1550, 2500);
  const counter3 = useFormattedCounter(6700, 2500);
  const counter4 = useFormattedCounter(100, 2500);

  const counters = [counter1, counter2, counter3, counter4];

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: false,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 35,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      wheelMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.layout);
  }, [theme]);

  useEffect(() => {
    // Program Execution animations
    const executionSteps = gsap.utils.toArray(".program-execution-step");

    executionSteps.forEach((step, index) => {
      gsap.fromTo(step,
        {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );
    });

    // Program Timeline animations
    const timelineSteps = gsap.utils.toArray(".program-timeline-step");

    timelineSteps.forEach((step, index) => {
      gsap.fromTo(step,
        {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );

      // Progress bar animation
      const progressBar = step.querySelector(".progress-bar");
      if (progressBar) {
        gsap.fromTo(progressBar,
          { width: "0%" },
          {
            width: "95%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            }
          }
        );
      }
    });

    // Benefits for Students animations
    const benefitsSteps = gsap.utils.toArray(".benefits-step");

    benefitsSteps.forEach((step, index) => {
      gsap.fromTo(step,
        {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );

      // Progress bar animation
      const progressBar = step.querySelector(".progress-bar");
      if (progressBar) {
        gsap.fromTo(progressBar,
          { width: "0%" },
          {
            width: "85%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            }
          }
        );
      }
    });

    // Enhanced scroll-triggered transitions
    // Slide panels horizontally
    const slidePanels = gsap.utils.toArray(".slide-panel");
    slidePanels.forEach((panel) => {
      gsap.fromTo(panel,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Rotate cards on scroll
    const rotateCards = gsap.utils.toArray(".rotate-card");
    rotateCards.forEach((card) => {
      gsap.fromTo(card,
        { rotationY: -90, opacity: 0 },
        {
          rotationY: 0,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    // Stagger header reveals
    const staggerHeaders = gsap.utils.toArray(".stagger-header");
    staggerHeaders.forEach((header) => {
      const letters = header.textContent.split("");
      header.innerHTML = "";
      letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.display = "inline-block";
        header.appendChild(span);

        gsap.fromTo(span,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 90%",
            }
          }
        );
      });
    });

    // Fade on scroll with progress
    const fadeElements = gsap.utils.toArray(".fade-on-scroll");
    fadeElements.forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          }
        }
      );
    });

    // Pin sections during scroll
    const pinSections = gsap.utils.toArray(".pin-section");
    pinSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });

    // Scroll progress indicator
    const progressBar = document.createElement("div");
    progressBar.className = "fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50";
    progressBar.style.transformOrigin = "left";
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Jeton.com-style animations
    // Sticky headers that stay visible during scroll
    const stickyHeaders = gsap.utils.toArray(".sticky-header");
    stickyHeaders.forEach((header) => {
      ScrollTrigger.create({
        trigger: header,
        start: "top 20%",
        end: "bottom 20%",
        pin: true,
        pinSpacing: false,
        onEnter: () => gsap.to(header, { scale: 1.05, duration: 0.3 }),
        onLeave: () => gsap.to(header, { scale: 1, duration: 0.3 }),
        onEnterBack: () => gsap.to(header, { scale: 1.05, duration: 0.3 }),
        onLeaveBack: () => gsap.to(header, { scale: 1, duration: 0.3 }),
      });
    });

    // Parallax sections with background text moving slower
    const parallaxSections = gsap.utils.toArray(".parallax-section");
    parallaxSections.forEach((section) => {
      const bgText = section.querySelector(".bg-text");
      if (bgText) {
        gsap.to(bgText, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // Foreground elements move faster
      const fgElements = gsap.utils.toArray(section.querySelectorAll(".fg-element"));
      fgElements.forEach((element, index) => {
        gsap.to(element, {
          y: -100 * (index + 1),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
    });

    // Enhanced directional entrance animations (jeton.com style)
    const directionalElements = gsap.utils.toArray(".directional-enter");
    directionalElements.forEach((element, index) => {
      const direction = index % 4; // 0: left, 1: right, 2: top, 3: bottom
      let fromProps = { opacity: 0 };

      switch (direction) {
        case 0: // left
          fromProps.x = -100;
          break;
        case 1: // right
          fromProps.x = 100;
          break;
        case 2: // top
          fromProps.y = -100;
          break;
        case 3: // bottom
          fromProps.y = 100;
          break;
      }

      gsap.fromTo(element, fromProps, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // 3D stacking effects for cards
    const stackCards = gsap.utils.toArray(".stack-card");
    stackCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          rotationY: -15 * (index % 2 === 0 ? 1 : -1),
          z: -50 * index,
          opacity: 0
        },
        {
          rotationY: 0,
          z: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });

    // Enhanced hover effects
    const hoverElements = gsap.utils.toArray(".enhanced-hover");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

  }, []);

  return (
    <div className="bg-black text-white relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <ImageSequence />
        </Canvas>
      </div>
      {/* <ParallaxLayers /> */}
      {/* <ScrollVideoBackground /> */}
      {/* <DynamicBackground /> */}
      <Navigation />
      <Hero />

      {/* About SamShoDhana */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 slide-panel">
            <h2 className="text-4xl font-bold mb-6 text-center">About SamShoDhana</h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">
              We transform ideas into extraordinary digital experiences through cutting-edge technology and creative excellence
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              SamShoDhana is a transformative initiative dedicated to strengthening Karnataka’s rural
              MSME ecosystem by developing 3,000+ tech-driven solutions and 1,550+ scalable technology
              products that address real, on-ground industry challenges. The program also focuses on
              building a future-ready talent pipeline of 6,700 professionals, equipped with advanced
              technology skills to drive innovation, sustainability, and growth across the MSME sector.
            </p>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
      <motion.section
        id="objectives"
        className="py-20 px-6 relative z-10 fade-on-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={counter1.ref}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Program Statistics
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "3000+", label: "Tech-Driven Solutions", color: "blue", delay: 0.3 },
                { number: "1550+", label: "Scalable Technology Products", color: "green", delay: 0.4 },
                { number: "6700", label: "Future-Ready Professionals", color: "purple", delay: 0.5 },
                { number: "100+", label: "Engineering Colleges", color: "yellow", delay: 0.6 }
              ].map((stat, index) => {
                const colorClass = {
                  blue: { text: "text-blue-400 group-hover:text-blue-300", underline: "from-blue-500 to-blue-300" },
                  green: { text: "text-green-400 group-hover:text-green-300", underline: "from-green-500 to-green-300" },
                  purple: { text: "text-purple-400 group-hover:text-purple-300", underline: "from-purple-500 to-purple-300" },
                  yellow: { text: "text-yellow-400 group-hover:text-yellow-300", underline: "from-yellow-500 to-yellow-300" },
                }[stat.color];

                return (
                  <motion.div
                    key={index}
                    ref={counters[index].ref}
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: stat.delay,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    <motion.div
                      className={`text-5xl font-bold mb-2 transition-colors duration-300 ${colorClass.text}`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {counters[index].count}{stat.suffix}
                    </motion.div>
                    <motion.p
                      className="text-gray-300 group-hover:text-white transition-colors duration-300"
                      whileHover={{ y: -2 }}
                    >
                      {stat.label}
                    </motion.p>
                    <motion.div
                      className={`w-0 h-1 bg-gradient-to-r mx-auto mt-2 group-hover:w-full transition-all duration-500 ${colorClass.underline}`}
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 px-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent stagger-header sticky-header"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OBJECTIVES
          </motion.h2>
          <div className={`${theme.layout === 'circle'
            ? 'flex flex-wrap justify-center items-center gap-6'
            : theme.layout === 'wave'
              ? 'space-y-6'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }`}>
            {[
              { title: "Develop 3,000+ Tech-Driven Solutions", color: "blue", desc: "Create innovative, technology-enabled solutions that directly address real-time challenges faced by rural MSMEs across Karnataka.", delay: 0.3 },
              { title: "Build 1,550+ Scalable Technology Products", color: "green", desc: "Design and deploy market-ready, accessible, and scalable tech products that support MSMEs in improving productivity and efficiency.", delay: 0.4 },
              { title: "Strengthen Rural MSME Innovation Capacity", color: "purple", desc: "Enable rural enterprises to adopt digital tools, automation, and emerging technologies to enhance operational capabilities.", delay: 0.5 },
              { title: "Create a Future-Ready Talent Pool", color: "yellow", desc: "Train and certify 5,000 professionals and grassroots innovators with advanced technology skills.", delay: 0.6 },
              { title: "Accelerate Economic Growth", color: "red", desc: "Drive inclusive and sustainable economic development by bridging technology gaps and fostering entrepreneurship.", delay: 0.7 },
              { title: "Promote Collaborative Innovation", color: "indigo", desc: "Build a statewide ecosystem that brings together academia, industry, startups, and government bodies.", delay: 0.8 },
              { title: "Enhance Adoption of Affordable Technology", color: "cyan", desc: "Ensure that solutions remain cost-effective and accessible, especially for micro and nano enterprises.", delay: 0.9 }
            ].map((objective, index) => {
              const colorClass = {
                blue: { text: "text-blue-400 group-hover:text-blue-300", underline: "from-blue-500 to-blue-300", border: "hover:border-blue-400/50" },
                green: { text: "text-green-400 group-hover:text-green-300", underline: "from-green-500 to-green-300", border: "hover:border-green-400/50" },
                purple: { text: "text-purple-400 group-hover:text-purple-300", underline: "from-purple-500 to-purple-300", border: "hover:border-purple-400/50" },
                yellow: { text: "text-yellow-400 group-hover:text-yellow-300", underline: "from-yellow-500 to-yellow-300", border: "hover:border-yellow-400/50" },
                red: { text: "text-red-400 group-hover:text-red-300", underline: "from-red-500 to-red-300", border: "hover:border-red-400/50" },
                indigo: { text: "text-indigo-400 group-hover:text-indigo-300", underline: "from-indigo-500 to-indigo-300", border: "hover:border-indigo-400/50" },
                cyan: { text: "text-cyan-400 group-hover:text-cyan-300", underline: "from-cyan-500 to-cyan-300", border: "hover:border-cyan-400/50" },
              }[objective.color];

              return (
                <motion.div
                  key={index}
                  className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-all duration-500 group cursor-pointer ${colorClass.border} ${theme.layout === 'circle'
                    ? 'w-64 h-64 rounded-full flex flex-col justify-center items-center text-center transform hover:scale-105'
                    : ''
                    }`}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: objective.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: theme.layout === 'circle' ? 1.1 : 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <motion.h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${colorClass.text}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {objective.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 group-hover:text-white transition-colors duration-300"
                    whileHover={{ y: -2 }}
                  >
                    {objective.desc}
                  </motion.p>
                  <motion.div
                    className={`w-0 h-1 bg-gradient-to-r mx-auto mt-4 group-hover:w-full transition-all duration-500 ${colorClass.underline}`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Program Execution */}
      <section id="execution" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Program Execution</h2>

            <div className="space-y-8">
              <div className="program-execution-step directional-enter">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Collaboration & Scale</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Collaboration with 100+ engineering colleges across the state</li>
                  <li>Selection of 200 students (50 Teams) from each district - total 6,200 students</li>
                  <li>Psychometric and personality tests to measure progress</li>
                </ul>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="progress-bar bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="program-execution-step">
                <h3 className="text-2xl font-bold mb-4 text-green-400">2-Day District Bootcamp</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Email Writing, Documentation, Content Writing & Personality development</li>
                  <li>Insights about each core engineering domain and opportunities</li>
                  <li>Research about local industries, clusters and micro entrepreneurs</li>
                  <li>Research about tech products across the globe which are related to district ecosystem</li>
                  <li>Stakeholder mapping and field visit</li>
                </ul>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="progress-bar bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="program-execution-step directional-enter">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">10-Day Residential Bootcamp at CoEs</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Advanced training on core technical and entrepreneurial skills</li>
                  <li>Mentor assignment (one mentor per team) for continuous guidance</li>
                  <li>Deep-dive research into stakeholder operations and challenges</li>
                  <li>Identification of one high-impact district-level problem with scalable potential</li>
                  <li>Multiple iteration cycles based on user feedback to arrive at a validated business and technical model</li>
                </ul>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="progress-bar bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="program-execution-step">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">District Demo Day</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Developed Solutions will be showcased at each district headquarters</li>
                  <li>Visibility for products built by Future Founders to program stakeholders</li>
                  <li>Inviting District MP, District Minister and other key authorities</li>
                  <li>Inviting leading investors of the district to look at the products for their next bet</li>
                </ul>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="progress-bar bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="program-execution-step directional-enter">
                <h3 className="text-2xl font-bold mb-4 text-red-400">State Demo Day</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Shortlisted Solutions from the district solution will be showcased at state level</li>
                  <li>Inviting leading GCC’s to support founders through hiring or EIR Program</li>
                  <li>Inviting leading investors, family offices and international investors to bet on grass root level innovations</li>
                </ul>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="progress-bar bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Program Timeline</h2>
            <p className="text-xl text-center mb-8 text-yellow-400"><strong>Duration:</strong> 1st December 2025 to 31st November 2026</p>

            <h3 className="text-2xl font-bold mb-6 text-center">Mandatory Stages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Initial Connection & Problem Identification", desc: "Student teams will formally connect with their assigned MSME and meet with the founder to identify and document the core business problem.", color: "blue" },
                { title: "Iterative Solution Development", desc: "Teams must follow a structured, three-version development and validation cycle: Cycle: Identify -> Validate -> Solve -> Validate -> Build -> Validate.", color: "green" },
                { title: "Verified Progress Reporting", desc: "For each major stage of the project, teams are required to upload a detailed progress document to the online portal. Crucially, each document must be verified with the official seal of the MSME to confirm active collaboration and authenticate the reported progress.", color: "purple" }
              ].map((step, index) => {
                const colorClass = {
                  blue: { text: "text-blue-400 group-hover:text-blue-300", underline: "from-blue-500 to-blue-300" },
                  green: { text: "text-green-400 group-hover:text-green-300", underline: "from-green-500 to-green-300" },
                  purple: { text: "text-purple-400 group-hover:text-purple-300", underline: "from-purple-500 to-purple-300" },
                }[step.color];

                return (
                  <div key={index} className="program-timeline-step bg-white/5 rounded-xl p-6 border border-white/10 stack-card group cursor-pointer hover:bg-white/10 transition-all duration-300">
                    <h4 className={`text-lg font-bold mb-3 transition-colors duration-300 ${colorClass.text}`}>{step.title}</h4>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{step.desc}</p>
                    <motion.div
                      className={`w-0 h-1 bg-gradient-to-r mx-auto mt-4 group-hover:w-full transition-all duration-500 ${colorClass.underline}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Students */}
      <section id="benefits" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">BENEFITS FOR STUDENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Fundamentals Certificate", desc: "Earn a prestigious certification endorsed by a top global MNC.", color: "blue" },
              { title: "Masterclass Series", desc: "Learn cutting-edge AI tools and real-world applications across core engineering domains.", color: "yellow" },
              { title: "Hands-on Workshop", desc: "Solve live MSME challenges and gain practical problem-solving experience.", color: "red" },
              { title: "Exciting Rewards", desc: "Win up to ₹2,00,000 in cash prizes and gain incubation support for your innovative ideas.", color: "green" },
              { title: "Industry Internship & Job Opportunities", desc: "Get placed with leading MSMEs for internships, with the potential for direct job offers based on performance.", color: "purple" },
              { title: "Exclusive Goodies", desc: "Grab official event merchandise, T-shirts, and more!", color: "indigo" }
            ].map((benefit, index) => {
              const colorClass = {
                blue: { text: "text-blue-400 group-hover:text-blue-300", underline: "from-blue-500 to-blue-300" },
                green: { text: "text-green-400 group-hover:text-green-300", underline: "from-green-500 to-green-300" },
                purple: { text: "text-purple-400 group-hover:text-purple-300", underline: "from-purple-500 to-purple-300" },
                yellow: { text: "text-yellow-400 group-hover:text-yellow-300", underline: "from-yellow-500 to-yellow-300" },
                red: { text: "text-red-400 group-hover:text-red-300", underline: "from-red-500 to-red-300" },
                indigo: { text: "text-indigo-400 group-hover:text-indigo-300", underline: "from-indigo-500 to-indigo-300" },
              }[benefit.color];

              return (
                <div key={index} className="benefits-step bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 stack-card enhanced-hover group cursor-pointer">
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${colorClass.text}`}>{benefit.title}</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{benefit.desc}</p>
                  <motion.div
                    className={`w-0 h-1 bg-gradient-to-r mx-auto mt-4 group-hover:w-full transition-all duration-500 ${colorClass.underline}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why MSME? */}
      <section id="why-msme" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why MSME?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400">Backbone of Economy</h3>
                <p className="text-gray-300">MSMEs contribute significantly to employment generation and GDP. Yet, most MSMEs in Karnataka and India still operate with traditional, manual processes.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-400">Digital Gap</h3>
                <p className="text-gray-300">While large enterprises adopt AI, MSMEs lack access to affordable AI-driven solutions. This creates a digital divide, making them less competitive in national and global markets.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-400">Operational Challenges</h3>
                <p className="text-gray-300">Inefficiencies in supply chain, finance, customer engagement, and workforce management. Limited data-driven decision-making hampers growth and scalability.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-yellow-400">Global Competitiveness</h3>
                <p className="text-gray-300">To survive and thrive in the era of Industry 4.0, MSMEs must embrace AI-powered tools for productivity, innovation, and quality enhancement.</p>
              </div>

              <div className="space-y-4 md:col-span-2 text-center">
                <h3 className="text-xl font-bold text-red-400">Sustainable Growth</h3>
                <p className="text-gray-300">Technology can help MSMEs reduce costs, optimize resources, and explore new market opportunities, leading to long-term, inclusive, and sustainable business growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="registration" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Registration Process</h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
              <li>College will selects and nominates 3rd Semester top 100 students combining all the branches.</li>
              <li>Once the college selects the students, students have to form 5 teams(4 members/team) per department</li>
              <li>Selected students will pay Rs. 1000 and register for the entire 2 years program.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Way Forward and Entrepreneurship Focus */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Way Forward for Participants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <h3 className="text-xl font-bold mb-3 text-green-400">If product wins investment</h3>
                <p className="text-gray-300">Students become first-generation founders and scale their solutions.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                <h3 className="text-xl font-bold mb-3 text-blue-400">If skill gets recognized</h3>
                <p className="text-gray-300">Students become highly employable talent for leading startups, corporates, and GCCs.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 text-center">
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-gray-200">
              We want to focus on the ENTREPRENEURSHIP and pitch these products to MULTIPLE INVESTORS AND GRANTS. If they win, they will SCALE THE PRODUCT, if not they have strong foundational capacities, great problem solving mindset and technology grip which by default they can tell as the experience to the FUTURE EMPLOYERS.
            </p>
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section className="py-10 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 bg-white/5 p-6 rounded-xl border border-white/10">
            To ensure accountability, tangible outcomes, and clear progress monitoring, all student teams will follow a structured action plan. Progress will be tracked via a dedicated online portal.
          </p>
        </div>
      </section>

      {/* <About setCursorVariant={setCursorVariant} /> */}
      {/* <Services setCursorVariant={setCursorVariant} /> */}
      {/* <Projects setCursorVariant={setCursorVariant} /> */}
      <Contact setCursorVariant={setCursorVariant} />
      <Cursor mousePos={mousePos} variant={cursorVariant} />
    </div>
  );
}
