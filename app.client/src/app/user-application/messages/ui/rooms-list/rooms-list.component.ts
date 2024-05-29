import { Component, Input } from '@angular/core';
import { MessageCellComponent } from '../message-cell/message-cell.component';
import { ChatNotification } from '../../../notifications/model/notification';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [MessageCellComponent],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent {
  @Input() rooms: ChatNotification[] = [];
}
