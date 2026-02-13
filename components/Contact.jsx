import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact({ setCursorVariant }) {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2
          className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          LET'S CREATE TOGETHER
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Ready to transform your ideas into reality? Get in touch and let's start your innovation journey.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
                required
              />
            </div>

            <div>
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
                required
              />
            </div>

            <div>
              <motion.textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                whileFocus={{ scale: 1.02 }}
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h3>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">hello@samshodhana.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white">Innovation District, Tech City</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          {/* Social Links removed */}
        </motion.div>
      </div>
    </section>
  );
}