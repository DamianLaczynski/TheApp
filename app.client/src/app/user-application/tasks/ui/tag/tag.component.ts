import { Component, Input } from '@angular/core';
import { TaskPriority } from '../../model/task';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
@Input({required: true}) priority!: TaskPriority;

TaskPriority = TaskPriority;
}
