import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from './ui/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/service/auth.service';
import { AUTH_STATE_VALUE, AuthState } from './utils/auth-state.type';
import { SidebarDashboardComponent } from './ui/sidebar-dashboard/sidebar-dashboard.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [SidebarDashboardComponent, FooterComponent, RouterOutlet, NavbarComponent, ToastComponent],
  templateUrl: './user-app.component.html',
  styles: ``,
})
export class UserAppComponent implements OnInit{
  private authService = inject(AuthService);

  authStateValue = AUTH_STATE_VALUE;
  authState!:AuthState;

  ngOnInit(): void {
    this.authService.state$.subscribe({next: (state) => {
      this.authState = state;
    }})
  }
}
