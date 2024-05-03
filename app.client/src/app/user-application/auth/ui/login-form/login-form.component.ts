import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AUTH_STATE_VALUE } from '../../../utils/auth-state.type';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  
  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn()
  {
    if(this.loginForm.valid)
      {
        this.authService.login(this.loginForm.value);
        this.authService.state$.subscribe({next: (state) => {
          if(state.state == AUTH_STATE_VALUE.LOGGED_IN)
            {
              this.router.navigateByUrl("/app/dashboard");
            }
        }});
      }
  }
}
