import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() create = new EventEmitter<string>();
  isFormShowed: boolean = false;

  formToggle()
  {
    this.isFormShowed = !this.isFormShowed;
  }
}
