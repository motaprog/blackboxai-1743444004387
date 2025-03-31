import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ id, message, type = 'info', onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  // Define notification styles based on type
  const notificationStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  // Define notification icons based on type
  const notificationIcons = {
    info: 'fas fa-info-circle',
    success: 'fas fa-check-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle'
  };

  useEffect(() => {
    // Start progress bar animation
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;

      if (newProgress <= 0) {
        setIsVisible(false);
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    // Auto-close notification after duration
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [duration]);

  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
  };

  // Handle animation complete
  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          onAnimationComplete={handleAnimationComplete}
          className={`
            flex items-start gap-3 p-4 rounded-lg shadow-lg mr-4 mb-4
            ${notificationStyles[type]} text-white
            transform transition-all duration-300
            hover:scale-105 hover:shadow-xl
          `}
          style={{ maxWidth: '24rem', minWidth: '20rem' }}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <i className={`${notificationIcons[type]} text-xl`}></i>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <p className="text-sm font-medium">{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white hover:text-gray-200 transition-colors duration-200"
            aria-label="Close notification"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20 rounded-b-lg overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="h-full bg-white bg-opacity-30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Notification Container Component
export const NotificationContainer = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => onClose(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;