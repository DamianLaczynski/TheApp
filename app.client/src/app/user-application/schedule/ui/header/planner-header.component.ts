import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-planner-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './planner-header.component.html',
  styleUrl: './planner-header.component.css'
})
export class PlannerHeaderComponent implements OnInit, OnChanges {
  @Input({required: true}) currentDate!: Date;
  @Output() newDateSelected = new EventEmitter<Date>();

  todayDate = new Date(Date.now());

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  previousDay()
  {
    var newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.newDateSelected.emit(newDate);
  }

  nextDay()
  {
    var newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.newDateSelected.emit(newDate);
  }

  today()
  {
    this.newDateSelected.emit(new Date(Date.now()));
  }
}