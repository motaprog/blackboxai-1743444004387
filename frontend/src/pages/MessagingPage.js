import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationContext } from '../App';

const MessagingPage = () => {
  const { addNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  // Mock contacts data
  const [contacts] = useState([
    {
      id: 1,
      name: 'د. أحمد محمد',
      role: 'معلم الرياضيات',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      status: 'online',
      lastSeen: 'متصل الآن',
    },
    {
      id: 2,
      name: 'أ. سارة أحمد',
      role: 'معلمة اللغة العربية',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      status: 'offline',
      lastSeen: 'قبل ساعة',
    },
    // Add more contacts as needed
  ]);

  // Mock messages data
  const [chats, setChats] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: 'السلام عليكم، كيف حال المراجعة للامتحان؟',
        timestamp: '10:30 AM',
      },
      {
        id: 2,
        senderId: 'me',
        text: 'وعليكم السلام، الحمد لله. أراجع الفصل الثالث حالياً',
        timestamp: '10:32 AM',
      },
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: 'هل أنهيت الواجب المطلوب؟',
        timestamp: '11:00 AM',
      },
      {
        id: 2,
        senderId: 'me',
        text: 'نعم، سأسلمه اليوم إن شاء الله',
        timestamp: '11:05 AM',
      },
    ],
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      // Select first chat by default
      if (!selectedChat && contacts.length > 0) {
        setSelectedChat(contacts[0].id);
      }
    }, 1000);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat, chats]);

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));

    setMessage('');

    // Simulate reply after 1-2 seconds
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        senderId: selectedChat,
        text: 'شكراً على رسالتك، سأرد عليك قريباً',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChats(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), replyMessage],
      }));

      addNotification('وصلتك رسالة جديدة', 'info');
    }, Math.random() * 1000 + 1000);
  };

  // Handle typing indicator
  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex h-[calc(100vh-12rem)]">
          {/* Contacts Sidebar */}
          <div className="w-1/3 border-l bg-gray-50">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث عن محادثة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {contacts
                .filter(contact =>
                  contact.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(contact => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedChat === contact.id
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === 'online'
                              ? 'bg-green-500'
                              : 'bg-gray-400'
                          }`}
                        ></span>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>

                      <div className="text-xs text-gray-400">
                        {contact.lastSeen}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center gap-4">
                  <img
                    src={contacts.find(c => c.id === selectedChat)?.avatar}
                    alt="Contact"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">
                      {contacts.find(c => c.id === selectedChat)?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {contacts.find(c => c.id === selectedChat)?.status === 'online'
                        ? 'متصل الآن'
                        : 'غير متصل'}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4">
                  <AnimatePresence>
                    {chats[selectedChat]?.map(message => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex mb-4 ${
                          message.senderId === 'me' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === 'me'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100'
                          }`}
                        >
                          <p className="mb-1">{message.text}</p>
                          <p className={`text-xs ${
                            message.senderId === 'me'
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping();
                      }}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                  {isTyping && (
                    <p className="text-xs text-gray-500 mt-1">
                      جاري الكتابة...
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500">
                اختر محادثة للبدء
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;