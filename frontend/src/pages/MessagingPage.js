import React, { useState, useContext } from 'react';
import { NotificationContext } from '../App';

const MessagingPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { showNotification } = useContext(NotificationContext);

  // Mock data - In a real app, this would come from an API
  const chats = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Mathematics Teacher',
      avatar: 'SJ',
      lastMessage: "Don't forget about tomorrow's test!",
      timestamp: '10:30 AM',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'Physics Study Group',
      role: 'Group Chat',
      avatar: 'PG',
      lastMessage: "Can someone explain Newton's third law?",
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Prof. Michael Chen',
      role: 'Physics Teacher',
      avatar: 'MC',
      lastMessage: 'Great work on your last assignment!',
      timestamp: 'Yesterday',
      unread: 0,
      online: true,
    },
  ];

  const messages = selectedChat?.id === 1 ? [
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      content: 'Hello! How are you doing with the homework?',
      timestamp: '10:00 AM',
      isSender: false,
    },
    {
      id: 2,
      sender: 'You',
      content: "Hi Dr. Johnson! I'm working on it now. I have a question about problem #3.",
      timestamp: '10:15 AM',
      isSender: true,
    },
    {
      id: 3,
      sender: 'Dr. Sarah Johnson',
      content: "Sure, what's your question?",
      timestamp: '10:20 AM',
      isSender: false,
    },
  ] : [];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    showNotification('Message sent successfully', 'success');
    setNewMessage('');
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (chat.unread > 0) {
      showNotification(`${chat.unread} new message${chat.unread > 1 ? 's' : ''} from ${chat.name}`, 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Chat List */}
          <div className="w-full md:w-96 border-r border-gray-200 bg-gray-50">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Chat List */}
            <div className="overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                    selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.role}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          {chat.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {selectedChat.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedChat.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isSender
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <i className="fas fa-comments text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;