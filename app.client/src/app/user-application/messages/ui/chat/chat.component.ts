import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../service/chat.service';

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
  private chatService = inject(ChatService);
  private wsSubscription!: Subscription;

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  messageForm: MessageForm = this.formBuilder.group({
    message: this.formBuilder.control<string>('', Validators.required)
  })

  send()
  {
    if(this.messageForm.valid)
      {
        console.log(this.messageForm.value);
        this.chatService.send(this.messageForm.value.message || '')
        this.messageForm.reset();
      }
    
  }
  nickname!: string;
  password!: string;
  isAuthenticated!: boolean;



  login() {
    

    //this.peersService.listPeers();
  }
}
