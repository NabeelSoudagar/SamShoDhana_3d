import { motion } from 'framer-motion';

export default function Cursor({ mousePos, variant }) {
  const variants = {
    default: {
      x: mousePos.x - 16,
      y: mousePos.y - 16,
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      mixBlendMode: 'difference'
    },
    text: {
      x: mousePos.x - 32,
      y: mousePos.y - 32,
      scale: 2,
      backgroundColor: 'rgba(124, 58, 237, 0.3)',
      mixBlendMode: 'normal'
    },
    button: {
      x: mousePos.x - 24,
      y: mousePos.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(236, 72, 153, 0.5)',
      mixBlendMode: 'normal'
    }
  };

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none z-50 transition-all duration-150"
      animate={variants[variant]}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}