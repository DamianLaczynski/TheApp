import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AUTH_STATE_VALUE } from '../../../utils/auth-state.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  
  registerForm!: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  register()
  {
    if(this.registerForm.valid)
      {
        this.authService.register(this.registerForm.value);
        this.authService.state$.subscribe({next: (state) => {
          if(state.state == AUTH_STATE_VALUE.LOGIN)
            {
              this.router.navigateByUrl("/app/auth/login");
            }
        }});
      }
  }
}
