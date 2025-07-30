import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Code2, MessageSquare, Users, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

// Corrected Variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 transition-colors duration-500">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-primary-500 rounded-xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              CodeCollab
            </span>
          </motion.div>

          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-dark-600" />}
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.main
        className="max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Code Together,
            <br />
            <span className="text-gray-900 dark:text-white">Build Better</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            The ultimate real-time collaboration platform for developers. Share code, discuss ideas, and build amazing projects together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
            </motion.button>

            <motion.button
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-20"
          variants={containerVariants}
        >
          <motion.div
            className="p-8 rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl w-fit mb-4">
              <MessageSquare className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Real-time Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Instant messaging with code syntax highlighting, file sharing, and rich formatting for seamless developer communication.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl w-fit mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Team Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Create teams, manage projects, and collaborate with developers worldwide. Perfect for remote teams and open source projects.
            </p>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Built for performance with modern web technologies. Experience ultra-fast messaging and seamless real-time updates.
            </p>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
};