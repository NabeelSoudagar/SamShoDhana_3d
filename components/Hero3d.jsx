import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import GetStartedModal from "./GetStartedModal";

function FloatingObject() {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.2;
      ref.current.position.x = mouse.x * 0.3;
      ref.current.position.y = mouse.y * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={ref} 
        scale={hovered ? 2.2 : 1.8}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={hovered ? "#ff6b6b" : "#7c3aed"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#ff6b6b" : "#7c3aed"}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 3, 3]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} color="#ff6b6b" intensity={0.8} />
            <pointLight position={[10, 10, 10]} color="#4ecdc4" intensity={0.6} />
            <pointLight position={[0, -10, 5]} color="#7c3aed" intensity={0.4} />

            {/* Add stars background */}
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />

            <FloatingObject />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div 
            className="text-center max-w-4xl mx-auto px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              SAMSHODHANA
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Innovation Hub for the Next Generation
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:scale-105 transition-transform"
              >
                Get Started
              </button>
              <button className="px-8 py-4 border border-purple-500 rounded-full text-purple-300 hover:bg-purple-500 hover:text-white transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <GetStartedModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
