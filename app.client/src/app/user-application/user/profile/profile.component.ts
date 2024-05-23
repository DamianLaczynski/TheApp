import { Component } from '@angular/core';
import { ProfileCardComponent } from '../ui/profile-card/profile-card.component';
import { User } from '../model/user';
import { MenuComponent } from '../ui/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileCardComponent, MenuComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 user: User = {
  id: '1',
  firstname: "John",
  lastname: "Doe",
  email: "johnDoe@gmail.com",
  phoneNumber: "+ 48 465089765",
  discordId: "Łączek#0000",
  description: "Fullstack Developer"
 }
}
