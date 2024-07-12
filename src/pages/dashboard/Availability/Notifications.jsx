import { useState, useCallback, useEffect,forwardRef } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import PropTypes from 'prop-types';

// Component to render the appropriate icon based on notification type
const NotificationIcon = ({ type }) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-400" />;
    default:
      return <Info className="w-5 h-5 text-blue-400" />;
  }
};

// Main Notifications component
const Notifications = forwardRef((props, ref) => {
  // State to store all active notifications
  const [notifications, setNotifications] = useState([]);

  // Function to remove a notification by its ID
  const dismissNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Function to add a new notification
  const addNotification = useCallback((message, type = "warning") => {
    // Generate a unique ID for the notification
    const id = Date.now();
    // Add the new notification to the state
    setNotifications((prev) => [...prev, { id, message, type }]);
    // Set a timeout to automatically dismiss the notification after 5 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  }, [dismissNotification]);

  // Effect to expose addNotification and dismissNotification methods via ref
  useEffect(() => {
    if (ref) {
      ref.current = {
        addNotification,
        dismissNotification
      };
    }
  }, [ref, addNotification, dismissNotification]);

  // If there are no notifications, don't render anything
  if (notifications.length === 0) return null;

  // Render the notifications
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 rounded-lg shadow-lg text-white ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {/* Render the appropriate icon based on notification type */}
          <NotificationIcon type={notification.type} />
          {/* Display the notification message */}
          <p className="ml-3 mr-8 flex-1">{notification.message}</p>
          {/* Button to manually dismiss the notification */}
          <button
            onClick={() => dismissNotification(notification.id)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
});

Notifications.displayName = 'Notifications';

NotificationIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
};

export default Notifications;