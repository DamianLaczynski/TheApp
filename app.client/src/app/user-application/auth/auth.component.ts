import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AUTH_STATE_VALUE, AuthState } from '../utils/auth-state.type';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);

  authStateValue = AUTH_STATE_VALUE;
  authState!: AuthState;

  ngOnInit(): void {
    this.authService.state$.subscribe({next:(state) => {
      this.authState = state;
      if(state.state == AUTH_STATE_VALUE.LOGGED_IN)
        {
          this.router.navigate(['/app/dashboard']);
        }
    }})
  }

}
