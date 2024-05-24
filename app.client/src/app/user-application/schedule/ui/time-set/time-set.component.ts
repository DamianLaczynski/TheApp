import { Time } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlannerEventForm } from '../schedule-event-call/schedule-event-call.component';

export interface State {
  start: Time;
  end: Time;
  duration: Number;
  durationType: 'MINUTES' | 'HOURS';
}

@Component({
  selector: 'app-time-set',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './time-set.component.html',
  styleUrl: './time-set.component.css',
})
export class TimeSetComponent implements OnInit {
  @Input({required: true}) plannerForm!: PlannerEventForm;
  @Output() switchMode = new EventEmitter();
  @Output() newTimeForm = new EventEmitter<{
    duration: number | undefined;
    start: string | undefined;
    end: string | undefined;
  }>();
  private eRef = inject(ElementRef);

  model: {
    duration: number | undefined;
    start: string | undefined;
    end: string | undefined;
  } = {
    duration: undefined,
    start: undefined,
    end: undefined,
  };

  isShowed: boolean = false;
  ngOnInit(): void {



    //this.updateForm();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      if (this.isShowed) {
        this.switchMode.emit();
      }
      this.isShowed = true;
    }
  }

  updateForm() {
    this.newTimeForm.emit(this.model);
  }
  changeDuration() {
    this.model.start = undefined;
    this.model.end = undefined;
    this.updateForm();
  }
  changeDurationType() {
    this.updateForm();
  }

  changeStart() {
    this.model.duration = undefined;
    this.updateForm();
  }

  changeEnd() {
    this.model.duration = undefined;
    this.updateForm();
  }

  clearForm() {
    this.model.duration = undefined;
    this.model.start = undefined;
    this.model.end = undefined;
    this.updateForm();
  }
}
