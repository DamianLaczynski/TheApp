import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { createListState } from '../../../utils/create-list-state';
import { toObservable } from '@angular/core/rxjs-interop';
import { CategoryApiService } from './category-api.service';
import { CategoryStateService } from './category-state.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private httpService = inject(CategoryApiService);
  private state = inject(CategoryStateService);

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

  create(payload: any) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addContact(response);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: any) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updateContact(response);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeContact(id);
      })
    ).subscribe();
  }
}
