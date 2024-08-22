import { create } from 'zustand';
import NotificationsJson from "../JSON/Notifications.json";

// Define the Zustand store
const useNotifications = create((set) => ({
  notifications: NotificationsJson,

  // Add a new notification
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification],
  })),

  // Remove a notification by id
  removeNotification: (notificationId) => set((state) => ({
    notifications: state.notifications.filter(notification => notification.id !== notificationId),
  })),

  // Clear all notifications
  clearNotifications: () => set(() => ({
    notifications: [],
  })),
}));

export default useNotifications;
