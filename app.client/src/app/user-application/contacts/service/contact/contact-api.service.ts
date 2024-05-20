import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { FetchingError } from '../../../utils/list-state.type';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Contact } from '../../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'api/Contact';

  private $idle = signal(true);
  private $loading = signal(false);
  private $error = signal<FetchingError | null>(null);

  $loadingState = computed(() => {
    return {
      idle: this.$idle(),
      loading: this.$loading(),
      error: this.$error(),
    };
  });

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(true);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        this.$error.set({ message: e.message, status: e.status });
        this.$loading.set(false);

        return EMPTY;
      }),
      tap(() => {
        this.$loading.set(false);
      })
    );
  }

  getById(id: string) {
    return this.withLoadingState(
      this._http.get<Contact>(`${this.apiEndpoint}/${id}`, {
        observe: 'response',
      })
    );
  }
  getAll() {
    return this.withLoadingState(
      this._http.get<any>(`${this.apiEndpoint}`, {
        observe: 'response',
      })
    );
  }

  create(payload: any) {
    return this.withLoadingState(
      this._http.post<Contact>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: any) {
    return this.withLoadingState(
      this._http.patch<Contact>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }

}
