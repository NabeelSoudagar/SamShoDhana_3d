import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    title: "Bootcamp",
    description: "Intensive learning experience with industry experts",
    icon: "🚀",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "CoE (Center of Excellence)",
    description: "Advanced skill development and mentorship",
    icon: "⭐",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Demo Day",
    description: "Showcase your innovations to the world",
    icon: "🎯",
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Investors",
    description: "Connect with funding opportunities",
    icon: "💎",
    color: "from-orange-500 to-red-500"
  }
];

export default function Timeline() {
  const section = useRef();

  useEffect(() => {
    const steps = gsap.utils.toArray(".timeline-step");
    
    steps.forEach((step, index) => {
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
  }, []);

  return (
    <section ref={section} className="py-32 px-4 max-w-6xl mx-auto">
      <motion.h2 
        className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your Journey
      </motion.h2>
      
      <div className="space-y-16">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.title}
            className="timeline-step flex flex-col md:flex-row items-center gap-8"
            whileHover={{ scale: 1.02 }}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                {item.icon}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform">
          Start Your Journey
        </button>
      </motion.div>
    </section>
  );
}
