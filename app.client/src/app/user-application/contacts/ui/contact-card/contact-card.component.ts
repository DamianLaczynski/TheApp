import { Component, Input } from '@angular/core';
import { Contact } from '../../model/contact';
import { DatePipe } from '@angular/common';
import { ContactTagComponent } from '../contact-tag/contact-tag.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [DatePipe, ContactTagComponent, RouterLink],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  @Input({required: true}) contact!: Contact;
}
