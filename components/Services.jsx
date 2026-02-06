import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'Bootcamp',
    description: 'Intensive learning programs designed to accelerate your innovation journey',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Center of Excellence',
    description: 'Advanced mentorship and skill development with industry experts',
    icon: '⭐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Demo Day',
    description: 'Showcase your innovations to investors and industry leaders',
    icon: '🎯',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Funding Support',
    description: 'Connect with VCs and angel investors to scale your startup',
    icon: '💎',
    color: 'from-orange-500 to-red-500'
  }
];

function ServiceCard({ service, index, setCursorVariant }) {
  return (
    <motion.div
      className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5
      }}
      onMouseEnter={() => setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant('default')}
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative z-10">
        <motion.div
          className="text-6xl mb-6"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.icon}
        </motion.div>

        <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
          {service.title}
        </h3>

        <p className="text-gray-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <motion.button
          className="text-white font-semibold flex items-center group-hover:text-purple-300 transition-colors"
          whileHover={{ x: 10 }}
        >
          Learn More
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${service.color} rounded-full opacity-0 group-hover:opacity-60`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Services({ setCursorVariant }) {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2
          className="text-4xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          OUR SERVICES
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Comprehensive programs designed to transform your innovative ideas into successful ventures
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            setCursorVariant={setCursorVariant}
          />
        ))}
      </div>
    </section>
  );
}