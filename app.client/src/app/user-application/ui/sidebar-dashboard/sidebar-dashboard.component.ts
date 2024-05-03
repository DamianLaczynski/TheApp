import { Component, OnInit, inject } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css',
})
export class SidebarDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  isExpanded: boolean = false;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e) => {
        if (this.isExpanded) {
          this.toggle();
        }
      });
  }

  logOut() {
    console.log('asd');
    this.authService.logOut();
    this.router.navigateByUrl('/app/auth/login');
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
