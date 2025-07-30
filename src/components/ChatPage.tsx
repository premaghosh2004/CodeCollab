import React, { useState, useRef, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Code2, Hash, Users, Settings, Search, Menu, X, Moon, Sun, UserPlus, XCircle, Smile } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { User, Page } from '../App';
import axios from 'axios';
import io, { Socket } from 'socket.io-client';
import EmojiPicker, { EmojiClickData, Theme as EmojiTheme } from 'emoji-picker-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ENDPOINT = 'http://localhost:5000';
let socket: Socket;

interface ChatPageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

interface IMessage {
  _id: string;
  sender: { _id: string; name: string; avatar: string };
  content: string;
  chat: { _id: string; users: User[] };
  createdAt: string;
  type?: string;
}

interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdmin?: User;
}

const CodeBlock: FC<any> = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
        <SyntaxHighlighter
            style={atomDark as any}
            language={match[1]}
            PreTag="div"
            {...props}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export const ChatPage: React.FC<ChatPageProps> = ({ user, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  
  const [groupChatName, setGroupChatName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user._id);
    socket.on('onlineUsers', (users) => setOnlineUsers(users));
    
    fetchChats();

    return () => { socket.disconnect(); };
  }, [user]);

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived: IMessage) => {
      if (selectedChat?._id === newMessageReceived.chat._id) {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    };
    
    const handleTyping = () => setIsTyping(true);
    const handleStopTyping = () => setIsTyping(false);

    socket.on('message received', handleMessageReceived);
    socket.on('typing', handleTyping);
    socket.on('stop typing', handleStopTyping);

    return () => {
      socket.off('message received', handleMessageReceived);
      socket.off('typing', handleTyping);
      socket.off('stop typing', handleStopTyping);
    };
  }, [selectedChat]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectChat = (chat: IChat) => {
    setSelectedChat(chat);
    fetchMessages(chat);
  };
  
  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!socket || !selectedChat) return;
    
    socket.emit('typing', selectedChat._id);
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength) {
        socket.emit('stop typing', selectedChat._id);
      }
    }, timerLength);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data: filePath } = await axios.post('/api/upload', formData, config);
        await sendMessage(filePath, 'image');
    } catch (error) {
        console.error('File upload failed', error);
    }
  };

  const sendMessage = async (content: string, type: string = 'text') => {
    if (content && selectedChat) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.post('/api/message', { content, chatId: selectedChat._id, type }, config);
        socket.emit('new message', data);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error('Failed to send message', error);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(newMessage);
    setNewMessage('');
  };

    const fetchChats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      console.error('Failed to fetch chats');
    }
  };

  const fetchMessages = async (chat: IChat) => {
    if (!chat) return;
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/message/${chat._id}`, config);
      setMessages(data);
      socket.emit('join chat', chat._id);
    } catch (error) {
      console.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to search users');
    }
  };

  const accessChat = async (userId: string) => {
    try {
      const config = { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/chat', { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      handleSelectChat(data);
      setShowUserSearch(false);
    } catch (error) {
      console.error('Failed to create chat');
    }
  };
  
  const handleCreateGroup = async () => {
    if (!groupChatName || selectedUsers.length < 2) {
      alert('Please provide a group name and select at least 2 users.');
      return;
    }
    try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.post('/api/chat/group', {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map(u => u._id))
        }, config);
        setChats([data, ...chats]);
        handleSelectChat(data);
        setShowGroupModal(false);
    } catch (error) {
        console.error('Failed to create group chat');
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-100 dark:bg-dark-900 flex">
        <div className="w-80 bg-white dark:bg-dark-800 border-r flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3"> <Code2 className="text-primary-500"/> <h1 className="font-bold">CodeCollab</h1> </div>
                <div className="flex gap-2">
                    <button onClick={() => {setShowUserSearch(true); setSearchResults([]); setSearchQuery('');}} className="p-2 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-full"><Search size={18}/></button>
                    <button onClick={() => {setShowGroupModal(true); setSearchResults([]); setSearchQuery(''); setSelectedUsers([]); setGroupChatName('');}} className="p-2 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-full"><Users size={18}/></button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {chats.map(chat => (
                    <div key={chat._id} onClick={() => handleSelectChat(chat)} className={`p-3 flex items-center gap-3 rounded-lg cursor-pointer ${selectedChat?._id === chat._id ? 'bg-primary-100 dark:bg-primary-900/50' : 'hover:bg-gray-100 dark:hover:bg-dark-700'}`}>
                        <div className="relative">
                            <img src={chat.users.find(u => u._id !== user._id)?.avatar || user.avatar} className="w-10 h-10 rounded-full"/>
                            {onlineUsers.includes(chat.users.find(u => u._id !== user._id)?._id || '') && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-800"/>}
                        </div>
                        <p>{chat.isGroupChat ? chat.chatName : chat.users.find(u => u._id !== user._id)?.name}</p>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-3"> <img src={user.avatar} className="w-10 h-10 rounded-full"/> <p>{user.name}</p> </div>
                <button onClick={() => {localStorage.removeItem('userInfo'); onNavigate('landing')}}><Settings/></button>
            </div>
        </div>
        
        <div className="flex-1 flex flex-col">
            {selectedChat ? (
            <>
            <div className="p-4 border-b flex items-center gap-3">
                <img src={selectedChat.users.find(u => u._id !== user._id)?.avatar || user.avatar} className="w-10 h-10 rounded-full"/>
                <p className="font-semibold">{selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users.find(u => u._id !== user._id)?.name}</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg._id} className={`flex items-start gap-3 my-2 ${msg.sender._id === user._id ? 'flex-row-reverse' : ''}`}>
                        <img src={msg.sender.avatar} className="w-8 h-8 rounded-full"/>
                        <div className={`p-3 rounded-lg max-w-lg ${msg.sender._id === user._id ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-700'}`}>
                            {msg.type === 'image' ? <img src={ENDPOINT + msg.content} className="max-w-xs rounded-lg"/> : 
                            <ReactMarkdown
                                components={{ code: CodeBlock }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                            }
                        </div>
                    </div>
                ))}
                {isTyping && <p className="text-sm text-gray-500">typing...</p>}
                <div ref={messagesEndRef}/>
            </div>
            <div className="p-4 relative">
                {showEmojiPicker && <div className="absolute bottom-20"><EmojiPicker onEmojiClick={onEmojiClick} theme={isDark ? EmojiTheme.DARK : EmojiTheme.LIGHT}/></div>}
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute left-3 top-1/2 -translate-y-1/2"><Smile/></button>
                        <input value={newMessage} onChange={handleTypingChange} placeholder="Type a message...." className="w-full bg-gray-100 dark:bg-dark-700 rounded-full px-12 py-3 focus:outline-none"/>
                        <label htmlFor="file-upload" className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"><Paperclip/></label>
                        <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload}/>
                    </div>
                    <button type="submit" disabled={!newMessage.trim()} className="p-3 bg-primary-500 text-white rounded-full disabled:opacity-50"><Send/></button>
                </form>
            </div>
            </>
            ) : ( <div className="h-full flex items-center justify-center text-gray-500">Select a chat or start a new one</div> )}
        </div>
      </div>

      <AnimatePresence>
        {(showUserSearch || showGroupModal) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                {showUserSearch && (
                    <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Start a New Chat</h2>
                        <input value={searchQuery} onChange={e => handleSearch(e.target.value)} placeholder="Search by name or email" className="w-full p-2 border rounded mb-4"/>
                        <div className="max-h-60 overflow-y-auto">
                            {searchResults.map(u => <div key={u._id} onClick={() => accessChat(u._id)} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark-700 cursor-pointer rounded"><img src={u.avatar} className="w-8 h-8 rounded-full mr-3"/><p>{u.name}</p></div>)}
                        </div>
                        <button onClick={() => setShowUserSearch(false)} className="mt-4 w-full p-2 bg-red-500 text-white rounded">Cancel</button>
                    </div>
                )}
                {showGroupModal && (
                    <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create Group Chat</h2>
                        <input value={groupChatName} onChange={e => setGroupChatName(e.target.value)} placeholder="Group Name" className="w-full p-2 border rounded mb-4"/>
                        <input value={searchQuery} onChange={e => handleSearch(e.target.value)} placeholder="Search users to add" className="w-full p-2 border rounded mb-4"/>
                        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">{selectedUsers.map(u => <div key={u._id} className="bg-primary-500 text-white px-2 py-1 rounded-full flex items-center">{u.name}<XCircle onClick={() => setSelectedUsers(selectedUsers.filter(su => su._id !== u._id))} className="ml-2 cursor-pointer"/></div>)}</div>
                        <div className="max-h-40 overflow-y-auto">{searchResults.map(u => <div key={u._id} onClick={() => !selectedUsers.find(su => su._id === u._id) && setSelectedUsers([...selectedUsers, u])} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark-700 cursor-pointer rounded"><img src={u.avatar} className="w-8 h-8 rounded-full mr-3"/><p>{u.name}</p></div>)}</div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowGroupModal(false)} className="p-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleCreateGroup} className="p-2 bg-primary-500 text-white rounded">Create</button>
                        </div>
                    </div>
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};