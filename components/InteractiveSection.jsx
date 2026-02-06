import { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI-Powered Innovation',
    description: 'Leverage cutting-edge AI to transform your ideas into reality',
    icon: '🤖',
    color: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Collaborative Ecosystem',
    description: 'Connect with like-minded innovators and industry experts',
    icon: '🌐',
    color: 'from-green-500 to-blue-500'
  },
  {
    title: 'Real-time Mentorship',
    description: 'Get guidance from industry leaders and successful entrepreneurs',
    icon: '🎯',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Global Network',
    description: 'Access to worldwide opportunities and partnerships',
    icon: '🌍',
    color: 'from-orange-500 to-red-500'
  }
];

function FeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div className={`
        relative p-8 rounded-2xl backdrop-blur-lg border border-white/10 
        bg-gradient-to-br ${feature.color} bg-opacity-10
        hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500
        transform-gpu
      `}>
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 10 : 0
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {feature.icon}
        </motion.div>
        
        <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
          {feature.title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed">
          {feature.description}
        </p>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />
      </div>
    </motion.div>
  );
}

export default function InteractiveSection() {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Experience the future of innovation with our cutting-edge platform designed for the next generation of creators
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.button
          className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          Join the Revolution
        </motion.button>
      </motion.div>
    </section>
  );
}