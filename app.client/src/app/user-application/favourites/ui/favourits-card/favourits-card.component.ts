import { Component, Input } from '@angular/core';
import { Resource, ResourceType } from '../../model/resource';

@Component({
  selector: 'app-favourits-card',
  standalone: true,
  imports: [],
  templateUrl: './favourits-card.component.html',
  styleUrl: './favourits-card.component.css'
})
export class FavouritsCardComponent {
  @Input({required: true}) resource!: Resource;
  
  res = ResourceType;

  unfavourite(id: string)
  {
    console.log(id);
  }
}
