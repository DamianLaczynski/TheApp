import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PlannerHeaderComponent } from '../header/planner-header.component';
import { PlannerBodyComponent } from '../body/planner-body.component';
import { PlannerEvent } from '../../model/planner-event';
import { PlannerService } from '../../service/planner.service';
import { AsyncPipe } from '@angular/common';
import { TaskExplorerComponent } from '../task-explorer/task-explorer.component';

@Component({
  selector: 'app-day-planner',
  standalone: true,
  imports: [PlannerBodyComponent, PlannerHeaderComponent, TaskExplorerComponent, AsyncPipe],
  templateUrl: './day-planner.component.html',
  styleUrl: './day-planner.component.css'
})
export class DayPlannerComponent {
  private plannerService = inject(PlannerService);
  isTaskExplorerShowed: boolean = false;

  currentSelectedDay: Date = new Date(Date.now());

  state$ = this.plannerService.listState$;

  ngOnInit(): void {
    this.plannerService.getAllByDate(this.currentSelectedDay);

    this.state$.subscribe({next: (state) => {
      if(state.state == "SUCCESS")
        {
        }
    }})
  }


  getSchedule(newDate: Date)
  {
    this.currentSelectedDay = new Date(newDate);
    this.plannerService.getAllByDate(this.currentSelectedDay);
  }

  toggleTaskExpoler()
  {
    this.isTaskExplorerShowed = !this.isTaskExplorerShowed;
  }
}
