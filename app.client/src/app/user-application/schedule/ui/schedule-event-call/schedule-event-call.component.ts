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
import {
  CreatePlannerEventPayload,
  PlannerEvent,
} from '../../model/planner-event';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TimeSetComponent } from '../time-set/time-set.component';
import { DatePipe, Time } from '@angular/common';
import { OutletContext } from '@angular/router';
import { PlannerService } from '../../service/planner.service';

export type PlannerEventForm = FormGroup<{
  name: FormControl<string>;
  isDone: FormControl<boolean>;
  duration: FormControl<number | undefined>;
  start: FormControl<string | undefined>;
  end: FormControl<string | undefined>;
}>;

export type TaskFormValue = ReturnType<PlannerEventForm['getRawValue']>;

@Component({
  selector: 'app-schedule-event-call',
  standalone: true,
  imports: [TimeSetComponent, ReactiveFormsModule],
  templateUrl: './schedule-event-call.component.html',
  styleUrl: './schedule-event-call.component.css',
})
export class ScheduleEventCallComponent implements OnInit {
  @Input() plannerEvent?: PlannerEvent | null;
  @Input() currentDate!: Date;
  @Output() createPlannerEvent = new EventEmitter<CreatePlannerEventPayload>();
  private eRef = inject(ElementRef);
  private formBuilder = inject(NonNullableFormBuilder);
  private plannerService = inject(PlannerService);
  private datePipe = inject(DatePipe);
  isEditMode: boolean = false;
  plannerForm!: PlannerEventForm;

  ngOnInit(): void {
    if (this.plannerEvent) {
      this.plannerEvent.start = this.plannerEvent.start?.slice(0, 5);
      this.plannerEvent.end = this.plannerEvent.end?.slice(0, 5);
      this.plannerForm = this.formBuilder.group({
        name: this.formBuilder.control<string>(
          this.plannerEvent.name,
          Validators.minLength(1)
        ),
        isDone: this.formBuilder.control<boolean>(this.plannerEvent.isDone),
        duration: this.formBuilder.control<number | undefined>(undefined),
        start: this.formBuilder.control<string | undefined>(
          this.plannerEvent.start
            ? String(this.plannerEvent.start).slice(0, 5)
            : undefined
        ),
        end: this.formBuilder.control<string | undefined>(
          this.plannerEvent.end ? String(this.plannerEvent.end) : undefined
        ),
      });
    } else {
      this.plannerForm = this.formBuilder.group({
        name: this.formBuilder.control<string>('', Validators.minLength(1)),
        isDone: this.formBuilder.control<boolean>(false),
        duration: this.formBuilder.control<number | undefined>(undefined),
        start: this.formBuilder.control<string | undefined>(undefined),
        end: this.formBuilder.control<string | undefined>(undefined),
      });
    }
  }

  updatePlannerForm(timeForm: {
    duration: number | undefined;
    start: string | undefined;
    end: string | undefined;
  }) {
    this.plannerForm.controls.duration.setValue(timeForm.duration);
    this.plannerForm.controls.start.setValue(timeForm.start);
    this.plannerForm.controls.end.setValue(timeForm.end);
  }

  toggleMode() {
    var sel = document.getSelection();
    sel?.removeAllRanges();
    this.isEditMode = !this.isEditMode;
  }

  create() {
    const payload: CreatePlannerEventPayload = {
      name: this.plannerForm.controls.name.value,
      date: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') as string,
      isDone: this.plannerForm.controls.isDone.value,
      start:
        typeof this.plannerForm.controls.start.value == 'string'
          ? this.plannerForm.controls.start.value + ':00'
          : undefined,
      end:
        typeof this.plannerForm.controls.end.value == 'string'
          ? this.plannerForm.controls.end.value + ':00'
          : undefined,
      duration: this.plannerForm.controls.duration.value,
    };
    console.log(payload);
    this.plannerService.create(payload);
    //this.createPlannerEvent.emit({...this.plannerForm.value, date: Date.now().toString()} as CreatePlannerEventPayload);
  }

  update()
  {
    const payload: CreatePlannerEventPayload = {
      name: this.plannerForm.controls.name.value,
      date: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') as string,
      isDone: this.plannerForm.controls.isDone.value,
      start:
        typeof this.plannerForm.controls.start.value == 'string'
          ? this.plannerForm.controls.start.value + ':00'
          : undefined,
      end:
        typeof this.plannerForm.controls.end.value == 'string'
          ? this.plannerForm.controls.end.value + ':00'
          : undefined,
      duration: this.plannerForm.controls.duration.value,
    };
    console.log(payload);
    this.plannerService.create(payload);
  }

  saveChanges() {
    if (this.plannerEvent) {
      this.update();
    } else {
      this.create();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      if (this.isEditMode) {
        this.isEditMode = false;
      }
    }
  }
}
