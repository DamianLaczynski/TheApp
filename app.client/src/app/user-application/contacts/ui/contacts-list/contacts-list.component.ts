import { Component, Input } from '@angular/core';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [ContactCardComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent {
  @Input({required: true}) contacts!: Contact[];
}
