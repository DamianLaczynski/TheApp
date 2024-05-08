import { Component, Input } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input({required: true}) user!: User;
}
