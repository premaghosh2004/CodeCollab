import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Code2, 
  Hash, 
  Users, 
  Settings, 
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Circle,
  MoreVertical,
  Smile
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'code' | 'file';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const mockMessages: Message[] = [
    {
      id: '1',
      user: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
      content: 'Hey everyone! Just pushed the new authentication flow. Can someone review the PR?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      user: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
      content: 'Looking good! I\'ll test it on my local environment.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
      content: 'const authenticateUser = async (credentials) => {\n  try {\n    const response = await api.post(\'/auth/login\', credentials);\n    return response.data;\n  } catch (error) {\n    throw new Error(\'Authentication failed\');\n  }\n};',
      timestamp: '10:35 AM',
      type: 'code'
    },
    {
      id: '4',
      user: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150',
      content: 'Nice work on the error handling! 🚀',
      timestamp: '10:37 AM',
      type: 'text'
    }
  ];

  const mockUsers: User[] = [
    { id: '1', name: 'Alex Chen', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150', status: 'online' },
    { id: '2', name: 'Sarah Kim', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150', status: 'online' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150', status: 'away' },
    { id: '4', name: 'Emma Davis', avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150', status: 'online' },
    { id: '5', name: 'David Wilson', avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=150', status: 'busy' },
  ];

  const channels = [
    { id: 'general', name: 'general', type: 'text' },
    { id: 'random', name: 'random', type: 'text' },
    { id: 'dev-frontend', name: 'dev-frontend', type: 'text' },
    { id: 'dev-backend', name: 'dev-backend', type: 'text' },
    { id: 'design', name: 'design', type: 'text' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle send message logic
      setMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-dark-900 flex transition-colors duration-500">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500 rounded-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-gray-900 dark:text-white">CodeCollab</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Team Workspace</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200"
                >
                  {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-dark-600" />}
                </button>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Channels
                  </h3>
                </div>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <motion.button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeChannel === channel.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Hash className="w-4 h-4" />
                      <span className="font-medium">{channel.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Online Users */}
              <div className="p-4 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    Online — {mockUsers.filter(u => u.status === 'online').length}
                  </h3>
                </div>
                <div className="space-y-2">
                  {mockUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      className="flex items-center space-x-3 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
                      whileHover={{ x: 2 }}
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-dark-800 ${getStatusColor(user.status)}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200 dark:border-dark-700">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=150"
                    alt="Your Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-dark-800" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">You</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Online</p>
                </div>
                <button
                  onClick={() => onNavigate('landing')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200"
                >
                  <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200 lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Hash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {channels.find(c => c.id === activeChannel)?.name}
              </h2>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Circle className="w-1.5 h-1.5 fill-current" />
                <span>{mockUsers.filter(u => u.status === 'online').length} members</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200">
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex space-x-3 hover:bg-gray-50 dark:hover:bg-dark-800/50 -mx-4 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {msg.timestamp}
                  </span>
                </div>
                {msg.type === 'code' ? (
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-code">
                    <code>{msg.content}</code>
                  </pre>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 break-words">
                    {msg.content}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 p-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}`}
                  className="w-full px-4 py-3 pr-20 bg-gray-100 dark:bg-dark-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
                  >
                    <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
                  >
                    <Smile className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={!message.trim()}
              className="p-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: message.trim() ? 1.05 : 1 }}
              whileTap={{ scale: message.trim() ? 0.95 : 1 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};