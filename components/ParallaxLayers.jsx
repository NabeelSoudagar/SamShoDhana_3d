import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxLayers() {
  const containerRef = useRef();

  useEffect(() => {
    const layers = gsap.utils.toArray('.parallax-layer');

    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.5; // Different speeds for each layer

      gsap.to(layer, {
        y: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Add rotation effect for some layers
    const rotatingLayers = gsap.utils.toArray('.parallax-rotate');
    rotatingLayers.forEach((layer) => {
      gsap.to(layer, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Background layer - very slow */}
      <div className="parallax-layer absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>

      {/* Middle layer - medium speed */}
      <div className="parallax-layer absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="parallax-layer absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Foreground layer - faster */}
      <div className="parallax-layer parallax-rotate absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full"></div>
      <div className="parallax-layer absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
      <div className="parallax-layer absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-xl"></div>

      {/* Floating geometric shapes */}
      <div className="parallax-layer absolute top-20 left-20 w-16 h-16 border-2 border-purple-400/30 rotate-45"></div>
      <div className="parallax-layer absolute top-40 right-32 w-12 h-12 bg-cyan-400/20 rounded-full"></div>
      <div className="parallax-layer absolute bottom-32 left-16 w-20 h-20 border border-pink-400/30 rounded-lg rotate-12"></div>
      <div className="parallax-layer absolute bottom-20 right-20 w-14 h-14 bg-yellow-400/20 rounded-full"></div>
    </div>
  );
}
