import { Component } from '@angular/core';
import { KanbanBoardComponent } from './ui/kanban-board/kanban-board.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [KanbanBoardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

}
