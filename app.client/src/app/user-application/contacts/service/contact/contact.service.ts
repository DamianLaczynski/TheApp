import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { createListState } from '../../../utils/create-list-state';
import { toObservable } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../toast/service/toast.service';
import { ContactApiService } from './contact-api.service';
import { ContactStateService } from './contact-state.service';
import { CreateContactPayload, UpdateContactPayload } from '../../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private httpService = inject(ContactApiService);
  private state = inject(ContactStateService);
  private toast = inject(ToastService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.contacts
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setContacts(response.body);
            console.log(response)
          }
        })
      )
      .subscribe();
  }

  getById(id: string) {
    this.httpService
      .getById(id)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.addContact(response.body);
          }
        })
      )
      .subscribe();
  }

  create(payload: CreateContactPayload) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addContact(response);
            this.toast.setSuccess("Created successfully");
            this.toast.show(3000);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: UpdateContactPayload) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updateContact(response);
        this.toast.setSuccess("Updated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeContact(id);
        this.toast.setAlert("Delated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }
}
