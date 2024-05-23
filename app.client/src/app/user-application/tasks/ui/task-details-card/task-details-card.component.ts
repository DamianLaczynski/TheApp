import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../model/task';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

type TaskForm = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
  deadline: FormControl<string>;
}>;

export type TaskFormValue = ReturnType<TaskForm['getRawValue']>;

@Component({
  selector: 'app-task-details-card',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './task-details-card.component.html',
  styleUrl: './task-details-card.component.css',
})
export class TaskDetailsCardComponent implements OnInit, OnChanges {
  @Input({ required: true }) task?: Task;
  @Output() delate = new EventEmitter<string>();
  @Output() archive = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string; payload: TaskFormValue }>();

  private formBuilder = inject(NonNullableFormBuilder);

  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  form!: TaskForm;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control<string>(
        this.task?.title ? this.task.title : ''
      ),
      description: this.formBuilder.control<string>(
        this.task?.description ? this.task.description : ''
      ),
      status: this.formBuilder.control<TaskStatus>(
        this.task?.status ? this.task.status : TaskStatus.NEW
      ),
      priority: this.formBuilder.control<TaskPriority>(
        this.task?.priority ? this.task.priority : TaskPriority.NONE
      ),
      deadline: this.formBuilder.control<string>(
        this.task?.deadline
          ? new Date(this.task.deadline).toISOString().slice(0, -8)
          : ''
      ),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control<string>(
        this.task?.title ? this.task.title : ''
      ),
      description: this.formBuilder.control<string>(
        this.task?.description ? this.task.description : ''
      ),
      status: this.formBuilder.control<TaskStatus>(
        this.task?.status ? this.task.status : TaskStatus.NEW
      ),
      priority: this.formBuilder.control<TaskPriority>(
        this.task?.priority ? this.task.priority : TaskPriority.NONE
      ),
      deadline: this.formBuilder.control<string>(
        this.task?.deadline
          ? new Date(this.task.deadline).toISOString().slice(0, -8)
          : ''
      ),
    });
  }

  updateTask() {
    if (this.form.valid && this.task) {
      this.update.emit({
        id: this.task.id,
        payload: this.form.value as TaskFormValue,
      });
    }
  }

  resetForm() {
    this.form.reset();
  }

  delateTask(id: string)
  {
    if(window.confirm("Are you sure?"))
      {
        this.delate.emit(id);
      }
  }
}
