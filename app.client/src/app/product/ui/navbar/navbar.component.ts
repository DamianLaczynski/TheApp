import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../user-application/auth/service/auth.service';
import { AUTH_STATE_VALUE, AuthState } from '../../../user-application/utils/auth-state.type';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{
private authService = inject(AuthService);

authState!: AuthState;
authStateValue = AUTH_STATE_VALUE;

ngOnInit(): void {
  this.authService.state$.subscribe({next: (state) => {
    this.authState = state;
  }})
}
}
