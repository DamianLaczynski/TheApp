import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type MessageForm = FormGroup<{
  message: FormControl<string>;
}>;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  messageForm: MessageForm = this.formBuilder.group({
    message: this.formBuilder.control<string>('', Validators.required)
  })

  send()
  {
    if(this.messageForm.valid)
      {
        console.log(this.messageForm.value);
        this.messageForm.reset();
      }
    
  }
}
