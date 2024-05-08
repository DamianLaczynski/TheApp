import { Component, Input } from '@angular/core';
import { Task, TaskPriority } from '../../model/task';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({required: true}) task!: Task;
  
  TaskPriority = TaskPriority;
}
