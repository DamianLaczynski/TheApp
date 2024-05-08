// Define enum for notification types
export enum NotificationType {
  Chat = 'chat',
  Schedule = 'schedule',
  System = 'system',
  Task = 'task',
}

// Define interface for common notification properties
export interface BaseNotification {
  id: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
}

// Define interfaces for specific notification types
export interface ChatNotification extends BaseNotification {
  type: NotificationType.Chat;
  sender: string;
  message: string;
  chatId: string;
  chatName: string;
}

export interface ScheduleNotification extends BaseNotification {
  type: NotificationType.Schedule;
  eventId: string;
  eventName: string;
  eventTime: Date;
}

export interface SystemNotification extends BaseNotification {
  type: NotificationType.System;
  title: string;
  description: string;
}

export interface TaskNotification extends BaseNotification {
    type: NotificationType.Task;
    taskId: string;
    taskName: string;
    dueDate: Date;
    action: TaskActionType; // New property for action type
  }
  
  // Define enum for task action types
export enum TaskActionType {
    Add = "add",
    Complete = "complete",
    Update = "update",
    Delete = "delete",
    // Add more action types as needed
  }
  

// Define union type for all notification types
export type NotificationData =
  | ChatNotification
  | ScheduleNotification
  | SystemNotification
  | TaskNotification;
