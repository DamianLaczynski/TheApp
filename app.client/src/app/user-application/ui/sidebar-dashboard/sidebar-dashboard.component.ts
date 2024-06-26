import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
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
  private elementRef = inject(ElementRef);
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
  
  private wasInside = false;
  
  @HostListener('click')
  clickInside() {
    this.wasInside = true;

  }
  
  @HostListener('document:click')
  clickout() {
    if (this.isExpanded && !this.wasInside)
      {
        this.isExpanded = false;
      }
      this.wasInside = false;
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
