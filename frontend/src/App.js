import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MessagingPage from './pages/MessagingPage';
import EventsPage from './pages/EventsPage';
import StatisticsPage from './pages/StatisticsPage';

// Context for notifications
export const NotificationContext = React.createContext();

function App() {
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle notifications
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />

        {/* Notifications */}
        <div className="fixed top-4 left-4 z-50">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export default App;