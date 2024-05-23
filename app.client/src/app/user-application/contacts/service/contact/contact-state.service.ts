import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../../model/contact';

export type ContactState = {
  contacts: Contact[] 
}

const initialState = {
  contacts: [],
}


@Injectable({
  providedIn: 'root'
})
export class ContactStateService {
  private state$ = new BehaviorSubject<ContactState>(initialState);

  value$ = this.state$.asObservable();

  addContact(contact: Contact)
  {
    this.state$.next({
      ...this.state$.value,
      contacts: [...this.state$.value.contacts, contact]
    });
  }

  setContacts(contacts: Contact[])
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

  updateContact(updatedContact: Contact)
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
