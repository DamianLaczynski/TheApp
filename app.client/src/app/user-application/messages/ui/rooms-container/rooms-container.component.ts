import { Component } from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';

@Component({
  selector: 'app-rooms-container',
  standalone: true,
  imports: [RoomCardComponent],
  templateUrl: './rooms-container.component.html',
  styleUrl: './rooms-container.component.css'
})
export class RoomsContainerComponent {

}
