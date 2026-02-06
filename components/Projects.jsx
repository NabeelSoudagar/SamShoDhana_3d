import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'AI Innovation Lab',
    category: 'Artificial Intelligence',
    description: 'Revolutionary AI solutions transforming industries',
    image: '🤖',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Blockchain Ecosystem',
    category: 'Web3 Technology',
    description: 'Decentralized platforms for the future',
    image: '⛓️',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'IoT Smart Cities',
    category: 'Internet of Things',
    description: 'Connected infrastructure for urban development',
    image: '🏙️',
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'VR Experiences',
    category: 'Virtual Reality',
    description: 'Immersive digital worlds and experiences',
    image: '🥽',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Quantum Computing',
    category: 'Advanced Computing',
    description: 'Next-generation computational solutions',
    image: '⚛️',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Sustainable Tech',
    category: 'Green Technology',
    description: 'Eco-friendly innovations for a better planet',
    image: '🌱',
    color: 'from-emerald-500 to-green-500'
  }
];

function ProjectCard({ project, index, setCursorVariant }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => {
        setCursorVariant('button');
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setCursorVariant('default');
        setIsHovered(false);
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

      <div className="relative z-10 p-8 h-full flex flex-col">
        <motion.div
          className="text-6xl mb-6"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 10 : 0
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {project.image}
        </motion.div>

        <div className="flex-1">
          <span className={`text-sm font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
            {project.category}
          </span>

          <h3 className="text-2xl font-bold text-white mb-4 mt-2">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <motion.button
          className="self-start text-white font-semibold flex items-center group-hover:text-purple-300 transition-colors"
          whileHover={{ x: 10 }}
        >
          View Project
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Animated border */}
      <motion.div
        className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100`}
        style={{
          background: `linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, ${project.color})`,
          backgroundClip: 'padding-box, border-box'
        }}
        initial={false}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Projects({ setCursorVariant }) {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 max-w-7xl mx-auto">
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
          FEATURED PROJECTS
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Discover the innovative solutions we've created for tomorrow's challenges
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            setCursorVariant={setCursorVariant}
          />
        ))}
      </div>

      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.button
          className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </section>
  );
}