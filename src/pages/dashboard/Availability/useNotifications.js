// 
import { useRef, useCallback } from 'react';
import Notifications from './Notifications';

export const useNotifications = () => {
  const notificationsRef = useRef(null);

  const addNotification = useCallback((message, type) => {
    if (notificationsRef.current) {
      notificationsRef.current.addNotification(message, type);
    }
  }, []);

  return { Notifications, notificationsRef, addNotification };
};