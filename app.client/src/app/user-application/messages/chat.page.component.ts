import { Component, Input } from '@angular/core';
import { ChatComponent } from './ui/chat/chat.component';
import { RoomsListComponent } from './ui/rooms-list/rooms-list.component';
import { ChatNotification, NotificationType } from '../notifications/model/notification';

@Component({
  selector: 'app-chatpage',
  standalone: true,
  imports: [ChatComponent, RoomsListComponent],
  templateUrl: './chat.page.component.html',
  styleUrl: './chat.page.component.css'
})
export class ChatPageComponent {
  @Input() chatId?: string;
  chatNotifications: ChatNotification[] = [
    {
      id: "1",
      type: NotificationType.Chat,
      timestamp: new Date(new Date().getTime() - 13000*130000),
      isRead: true,
      sender: "user123",
      message: "Hello, how are you?",
      chatId: "chat123",
      chatName: "Chat Room 1", // Added chatName property
    },
    {
      id: "2",
      type: NotificationType.Chat,
      timestamp: new Date(new Date().getTime() - 13000), // Adding 1 second to make timestamps unique
      isRead: false,
      sender: "user456",
      message: "Good morning!",
      chatId: "chat456",
      chatName: "Chat Room 2", // Added chatName property
    },
    {
      id: "3",
      type: NotificationType.Chat,
      timestamp: new Date(new Date().getTime() - 22504500), // Adding 2 seconds to make timestamps unique
      isRead: false,
      sender: "user789",
      message: "Hi there!",
      chatId: "chat789",
      chatName: "Chat Room 3", // Added chatName property
    },
  ];
}
