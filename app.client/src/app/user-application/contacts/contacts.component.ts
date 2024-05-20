import { Component, Input, OnInit, inject } from '@angular/core';
import { ContactDetailsSideCardComponent } from './ui/contact-details-side-card/contact-details-side-card.component';
import { ContactsListComponent } from './ui/contacts-list/contacts-list.component';
import { HeaderComponent } from './ui/header/header.component';
import { ContactService } from './service/contact/contact.service';
import { AsyncPipe } from '@angular/common';
import { FindContactPipe } from './utils/filter-by-status.pipe';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsListComponent, ContactDetailsSideCardComponent, HeaderComponent, AsyncPipe, FindContactPipe],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  @Input() contactId?: string;
  private contactService = inject(ContactService);

  state$ = this.contactService.listState$;

  ngOnInit(): void {
      this.contactService.getAll();
  }
}
