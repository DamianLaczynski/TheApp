import { Component, Input, OnInit, inject } from '@angular/core';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { Task, TaskStatus, TaskUpdatePayload } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { LIST_STATE_VALUE } from '../../../utils/list-state.type';
import { AsyncPipe } from '@angular/common';
import {
  FilterTaskByTaskStatusPipe,
  FindPipe,
} from '../../../utils/filter-by-task-status.pipe';
import {
  TaskDetailsCardComponent,
  TaskFormValue,
} from '../task-details-card/task-details-card.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    KanbanColumnComponent,
    AsyncPipe,
    FilterTaskByTaskStatusPipe,
    TaskDetailsCardComponent,
    FindPipe,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent implements OnInit {
  @Input() taskId?: string;
  private taskService = inject(TaskService);
  TaskStatus = TaskStatus;

  listStateValue = LIST_STATE_VALUE;
  listState$ = this.taskService.listState$;

  ngOnInit(): void {
    this.taskService.getAll();
  }

  updateTask(updatedTask: { id: string; payload: TaskFormValue }) {
    const payload: TaskUpdatePayload = {
      title: updatedTask.payload.title,
      description: updatedTask.payload.description,
      status: updatedTask.payload.status,
      priority: updatedTask.payload.priority,
      deadline: new Date(updatedTask.payload.deadline),
    };

    this.taskService.update(updatedTask.id, payload);
  }

  createTask(task: {status: TaskStatus, title: string} )
  {
    this.taskService.create(task);
  }
  
  delateTask(id: string)
  {
    this.taskService.delete(id);
  }
}
