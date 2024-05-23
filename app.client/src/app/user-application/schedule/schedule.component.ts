import { Component, OnInit, inject } from '@angular/core';
import { DayPlannerComponent } from './ui/day-planner/day-planner.component';
import { PlannerService } from './service/planner.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [DayPlannerComponent, AsyncPipe],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  
}
