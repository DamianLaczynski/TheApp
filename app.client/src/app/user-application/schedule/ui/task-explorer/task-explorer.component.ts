import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { TaskService } from '../../../tasks/service/task.service';
import { AsyncPipe } from '@angular/common';
import { TaskStatus } from '../../../tasks/model/task';
import { TagComponent } from '../../../tasks/ui/tag/tag.component';
import { TaskDragableCardComponent } from '../task-dragable-card/task-dragable-card.component';
import { SideCardHeaderComponent } from '../side-card-header/side-card-header.component';
import { FilterTaskByTaskStatusPipe } from '../../../utils/filter-by-task-status.pipe';

@Component({
  selector: 'app-task-explorer',
  standalone: true,
  imports: [AsyncPipe, TagComponent, FilterTaskByTaskStatusPipe, TaskDragableCardComponent, SideCardHeaderComponent],
  templateUrl: './task-explorer.component.html',
  styleUrl: './task-explorer.component.css'
})
export class TaskExplorerComponent implements OnInit{
  @Output() close = new EventEmitter();
  private taskService = inject(TaskService);

  taskState$ = this.taskService.listState$;

  TaskStatus = TaskStatus;
  
  ngOnInit(): void {
    this.taskService.getAll();
  }
}
