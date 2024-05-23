import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task, TaskStatus } from '../../model/task';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [TaskCardComponent, NewTaskComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {
  @Input({required: true}) taskStatus!: TaskStatus;
  @Input({required: true}) tasks: Task[] = [];
  @Output() createTask = new EventEmitter<{status: TaskStatus, title: string}>();
}
