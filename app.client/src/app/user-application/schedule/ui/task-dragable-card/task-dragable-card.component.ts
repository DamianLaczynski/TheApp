import { Component, Input } from '@angular/core';
import { Task } from '../../../tasks/model/task';
import { TagComponent } from '../../../tasks/ui/tag/tag.component';

@Component({
  selector: 'app-task-dragable-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './task-dragable-card.component.html',
  styleUrl: './task-dragable-card.component.css'
})
export class TaskDragableCardComponent {
  @Input({required: true}) task!: Task;
}
