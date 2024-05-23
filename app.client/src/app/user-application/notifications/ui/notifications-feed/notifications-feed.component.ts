import { Component } from '@angular/core';
import { FeedHeaderComponent } from '../feed-header/feed-header.component';
import { NotificationCellComponent } from '../notification-cell/notification-cell.component';
import { ChatNotification, NotificationData, NotificationType, SystemNotification, TaskActionType, TaskNotification } from '../../model/notification';

@Component({
  selector: 'app-notifications-feed',
  standalone: true,
  imports: [FeedHeaderComponent, NotificationCellComponent],
  templateUrl: './notifications-feed.component.html',
  styleUrl: './notifications-feed.component.css'
})
export class NotificationsFeedComponent {
  notifications: NotificationData[] = [
    {
      id: "1",
      type: NotificationType.Chat,
      timestamp: new Date(),
      isRead: false,
      sender: "user123",
      message: "Hello, how are you?",
      chatId: "chat123",
      chatName: "HELLO THERE"
    },
    {
      id: "2",
      type: NotificationType.System,
      timestamp: new Date(),
      isRead: false,
      title: "New update available",
      description: "Please update your app to access new features.",
    },
    {
      id: "3",
      type: NotificationType.Task,
      timestamp: new Date(),
      isRead: false,
      taskId: "task123",
      taskName: "Complete report",
      dueDate: new Date("2024-05-10"),
      action: TaskActionType.Add, // Example action type
    },
    {
      id: "4",
      type: NotificationType.Schedule,
      timestamp: new Date(),
      isRead: false,
      eventId: "event123",
      eventName: "Team Meeting",
      eventTime: new Date("2024-05-05T10:00:00"),
    },
    {
      id: "5",
      type: NotificationType.Chat,
      timestamp: new Date(),
      isRead: false,
      sender: "user456",
      message: "Good morning!",
      chatId: "chat456",
      chatName: "MEGA ZOO"
    },
    {
      id: "6",
      type: NotificationType.Task,
      timestamp: new Date(),
      isRead: false,
      taskId: "task456",
    taskName: "Review project proposal",
    dueDate: new Date("2024-05-15"),
      action: TaskActionType.Complete, // Example action type
    },
    {
      id: "7",
      type: NotificationType.System,
      timestamp: new Date(),
      isRead: true,
      title: "Account verification",
      description: "Please verify your email to complete the registration process.",
    },
    {
      id: "7",
      type: NotificationType.System,
      timestamp: new Date(),
      isRead: true,
      title: "Account verification",
      description: "Please verify your email to complete the registration process.",
    },
    {
      id: "7",
      type: NotificationType.System,
      timestamp: new Date(),
      isRead: true,
      title: "Account verification",
      description: "Please verify your email to complete the registration process.",
    },
  ];
}
