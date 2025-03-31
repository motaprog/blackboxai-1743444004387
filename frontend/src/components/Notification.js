import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, isVisible]);

  if (!isVisible) return null;

  const getNotificationStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 rounded-lg shadow-lg p-4 max-w-md transition-all duration-300 transform translate-x-0';
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-100 text-green-800 border-l-4 border-green-500`;
      case 'error':
        return `${baseStyles} bg-red-100 text-red-800 border-l-4 border-red-500`;
      case 'warning':
        return `${baseStyles} bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500`;
      default:
        return `${baseStyles} bg-blue-100 text-blue-800 border-l-4 border-blue-500`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      default:
        return 'fa-info-circle';
    }
  };

  return (
    <div className={getNotificationStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className={`fas ${getIcon()} text-2xl`}></i>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div
          className="h-full bg-current transition-all duration-300 ease-linear"
          style={{
            width: '100%',
            animation: `shrink ${duration}ms linear forwards`,
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default Notification;