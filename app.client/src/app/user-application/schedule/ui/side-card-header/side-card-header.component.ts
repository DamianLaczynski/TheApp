import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-card-header',
  standalone: true,
  imports: [],
  templateUrl: './side-card-header.component.html',
  styleUrl: './side-card-header.component.css'
})
export class SideCardHeaderComponent {
  @Input({required: true}) title!: String;
  @Input() description?: String;
}
