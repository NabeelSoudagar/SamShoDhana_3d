import { motion, AnimatePresence } from 'framer-motion';

export default function GetStartedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
              Start Your Innovation Journey
            </h2>
            <p className="text-gray-300 text-lg">
              Choose your path to transform ideas into reality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 cursor-pointer"
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Join Bootcamp</h3>
              <p className="text-gray-300 text-sm">
                Intensive 12-week program with industry experts
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 cursor-pointer"
            >
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2">Apply to CoE</h3>
              <p className="text-gray-300 text-sm">
                Advanced mentorship and skill development
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 cursor-pointer"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Demo Day</h3>
              <p className="text-gray-300 text-sm">
                Showcase your project to investors
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 cursor-pointer"
            >
              <div className="text-3xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-white mb-2">Get Funding</h3>
              <p className="text-gray-300 text-sm">
                Connect with investors and VCs
              </p>
            </motion.div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-500 rounded-full text-gray-300 hover:bg-gray-500 hover:text-white transition-all"
            >
              Close
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:scale-105 transition-transform">
              Contact Us
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}