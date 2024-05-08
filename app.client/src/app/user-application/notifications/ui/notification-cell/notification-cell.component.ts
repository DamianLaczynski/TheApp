import { Component, Input } from '@angular/core';
import { NotificationData, NotificationType, TaskActionType} from '../../model/notification';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notification-cell',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './notification-cell.component.html',
  styleUrl: './notification-cell.component.css'
})
export class NotificationCellComponent {
 @Input({required: true}) notification!: NotificationData;

NotificationType = NotificationType;
TaskActiontype = TaskActionType;
}
