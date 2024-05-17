import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { PathComponent } from './ui/path/path.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MessagesFeedComponent } from '../../messages/ui/message-feed/message-feed.component';
import { NotificationsFeedComponent } from '../../notifications/ui/notifications-feed/notifications-feed.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    PathComponent,
    RouterLink,
    RouterLinkActive,
    NotificationsFeedComponent,
    MessagesFeedComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isNotificationsFeedShowed: boolean = false;
  isMessagesFeedShowed: boolean = false;
  private elementRef = inject(ElementRef<HTMLElement>);
  notifications!: HTMLElement | null;
  messages!: HTMLElement | null;
  markAllAsRead!: HTMLElement | null;

  ngOnInit(): void {
    this.messages = document.getElementById('messages');
    this.notifications = document.getElementById('notifications');
    this.markAllAsRead = document.getElementById('markAllAsRead');
  }
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    // Check if the click event occurred on the buttons or their child elements
    let parentElement = targetElement;
    while (parentElement) {
      if (parentElement === this.notifications) {
        this.isMessagesFeedShowed = false;
        break;
      } else if (parentElement === this.messages) {
        this.isNotificationsFeedShowed = false;
        break;
      }

      // Check if any feed is active and if the click is outside the feed area
      if (this.isNotificationsFeedShowed || this.isMessagesFeedShowed) {
        const isClickNotificationsButton =
          this.notifications?.contains(targetElement);
        const isClickMessagesButton = this.messages?.contains(targetElement);
        const isClickMarkAllAsReadButton =
          this.markAllAsRead?.contains(targetElement);

        if (
          !isClickNotificationsButton &&
          !isClickMessagesButton &&
          this.markAllAsRead != targetElement
        ) {
          this.isNotificationsFeedShowed = false;
          this.isMessagesFeedShowed = false;
        }
      }

      parentElement = parentElement.parentElement as HTMLElement;
    }
  }

  toggleNotificationFeed() {
    this.isNotificationsFeedShowed = !this.isNotificationsFeedShowed;
  }

  toggleMessagesFeed() {
    this.isMessagesFeedShowed = !this.isMessagesFeedShowed;
  }
}
