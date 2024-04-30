import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  template: `<app-navbar></app-navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>`,
})
export class UserAppComponent {}
