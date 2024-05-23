import { Component, Input, OnInit, inject } from '@angular/core';
import { ContactDetailsSideCardComponent, ContactFormValue } from './ui/contact-details-side-card/contact-details-side-card.component';
import { ContactsListComponent } from './ui/contacts-list/contacts-list.component';
import { HeaderComponent } from './ui/header/header.component';
import { ContactService } from './service/contact/contact.service';
import { AsyncPipe } from '@angular/common';
import { FindContactPipe } from './utils/filter-by-status.pipe';
import { CategoryService } from './service/category/category.service';
import { EventType, Router, RouterEvent, RouterLink } from '@angular/router';
import { CreateContactPayload, UpdateContactPayload } from './model/contact';
import { AuthService } from '../auth/service/auth.service';
import { CategoryFormValue } from './model/category';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactsListComponent, ContactDetailsSideCardComponent, HeaderComponent, AsyncPipe, FindContactPipe, RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  @Input() contactId?: string;
  private contactService = inject(ContactService);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private routerLink = inject(Router);

  state$ = this.contactService.listState$;
  authState$ = this.authService.state$;

  isEmptyContactFormShowed: boolean = false;

  ngOnInit(): void {
      this.contactService.getAll();
      this.categoryService.getAll();
  }

  toggleEmptyContactForm()
  {
    if(this.contactId != "")
      {
        this.routerLink.navigateByUrl("/app/contacts");
    this.isEmptyContactFormShowed = true;
      }
      else{
        this.routerLink.navigateByUrl("/app/contacts");
        this.isEmptyContactFormShowed = !this.isEmptyContactFormShowed;
      }

  }

  createContact(contactFormValue:{contactFormValue: ContactFormValue;
    categoryFormValue: CategoryFormValue;})
  {
    const newContact: CreateContactPayload = {
      email: contactFormValue.contactFormValue.email,
      firstname: contactFormValue.contactFormValue.firstname,
      lastname: contactFormValue.contactFormValue.lastname,
      birthday: String(contactFormValue.contactFormValue.birthday) == "" ? null : contactFormValue.contactFormValue.birthday,
      phoneNumber: contactFormValue.contactFormValue.phoneNumber,
      categoryId: contactFormValue.categoryFormValue.category == "" ? contactFormValue.categoryFormValue.supercategory : contactFormValue.categoryFormValue.category
    }
    console.log(newContact);
    this.contactService.create(newContact);
    this.routerLink.navigateByUrl("/app/contacts");
  }

  updateContact(contactFormValue: {
    id: string;
    contactFormValue: ContactFormValue;
    categoryFormValue: CategoryFormValue;
  })
  {
    const updatedContact: UpdateContactPayload = {
      email: contactFormValue.contactFormValue.email,
      firstname: contactFormValue.contactFormValue.firstname,
      lastname: contactFormValue.contactFormValue.lastname,
      birthday: String(contactFormValue.contactFormValue.birthday) == "" ? null : contactFormValue.contactFormValue.birthday,
      phoneNumber: contactFormValue.contactFormValue.phoneNumber,
      categoryId: contactFormValue.categoryFormValue.category == "" ? contactFormValue.categoryFormValue.supercategory : contactFormValue.categoryFormValue.category

    }
    this.contactService.update(contactFormValue.id, updatedContact);
    this.routerLink.navigateByUrl("/app/contacts");
  }

  delateContact(id: string)
  {
    if(window.confirm("Are you sure?"))
      {
        this.contactService.delete(id);
      }
  }

  closeForm()
  {
    this.isEmptyContactFormShowed = false;
    this.routerLink.navigateByUrl("/app/contacts");
  }
}
