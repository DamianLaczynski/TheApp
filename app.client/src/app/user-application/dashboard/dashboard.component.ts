import { Component } from '@angular/core';
import { FavouritsCardComponent } from '../favourites/ui/favourits-card/favourits-card.component';
import { Resource, ResourceType } from '../favourites/model/resource';
import { RoomsContainerComponent } from '../messages/ui/rooms-container/rooms-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FavouritsCardComponent, RoomsContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // resources: Resource[] = [
  //   {
  //     id: '1',
  //     name: 'Do your best',
  //     type: ResourceType.TASK,
  //     isFavourite: true,
  //   },
  //   {
  //     id: '2',
  //     name: 'Raport 2024',
  //     type: ResourceType.MATERIAL,
  //     isFavourite: true,
  //   },
  //   {
  //     id: '2',
  //     name: 'Schedule',
  //     type: ResourceType.PATH,
  //     isFavourite: true,
  //   },
  //   {
  //     id: '2',
  //     name: 'Meet Up Gdańsk',
  //     type: ResourceType.EVENT,
  //     isFavourite: true,
  //   },
  // ];
}
