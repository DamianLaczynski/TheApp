import { Component, Input } from '@angular/core';
import { ScheduleEventCallComponent } from '../schedule-event-call/schedule-event-call.component';
import { PlannerEvent } from '../../model/planner-event';

@Component({
  selector: 'app-planner-body',
  standalone: true,
  imports: [ScheduleEventCallComponent],
  templateUrl: './planner-body.component.html',
  styleUrl: './planner-body.component.css'
})
export class PlannerBodyComponent {
  @Input() currentDate!: Date;
  @Input() dayPlanner: (PlannerEvent | undefined)[]  = [];
} 
