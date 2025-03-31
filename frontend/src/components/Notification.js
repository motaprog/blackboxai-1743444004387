import React, { useContext } from 'react';
import { NotificationContext } from '../App';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`px-4 py-3 rounded-lg border ${getNotificationStyles(
          notification.type
        )} shadow-lg`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {notification.type === 'success' && (
              <i className="fas fa-check-circle mr-2"></i>
            )}
            {notification.type === 'error' && (
              <i className="fas fa-exclamation-circle mr-2"></i>
            )}
            {notification.type === 'warning' && (
              <i className="fas fa-exclamation-triangle mr-2"></i>
            )}
            {notification.type === 'info' && (
              <i className="fas fa-info-circle mr-2"></i>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;