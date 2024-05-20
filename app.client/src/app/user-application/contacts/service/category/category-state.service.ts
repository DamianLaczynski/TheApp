import { Injectable } from '@angular/core';
import { Category, CategorySetItem } from '../../model/category';
import { BehaviorSubject } from 'rxjs';

export type ContactState = {
  contacts: CategorySetItem[] 
}

const initialState = {
  contacts: [],
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService {

  private state$ = new BehaviorSubject<ContactState>(initialState);

  value$ = this.state$.asObservable();

  addContact(contact: CategorySetItem)
  {
    this.state$.next({
      ...this.state$.value,
      contacts: [...this.state$.value.contacts, contact]
    });
  }

  setContacts(contacts: CategorySetItem[])
  {
    this.state$.next({
      ...this.state$.value,
      contacts: contacts
    });
  }

  removeContact(id: string)
  {
    const updatedContact = this.state$.value.contacts.filter((contact) => {
      return contact?.id !== id;
    });

    this.state$.next({
      ...this.state$.value,
      contacts: updatedContact
    });
  }

  updateContact(updatedContact: CategorySetItem)
  {
    const updatedContacts = this.state$.value.contacts.map((contact) => {
      return contact.id === updatedContact.id ? updatedContact : contact;
    });

    this.state$.next({
      ...this.state$.value,
      contacts: updatedContacts
    });
  }
}
