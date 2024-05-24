import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { FetchingError } from '../../../utils/list-state.type';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Contact, CreateContactPayload, UpdateContactPayload } from '../../model/contact';
import { AuthService } from '../../../auth/service/auth.service';
import { ToastService } from '../../../toast/service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private _http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastServie = inject(ToastService);
  apiEndpoint: string = 'api/Contact';

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

  constructor() {
    this.authService.state$.subscribe({next: (state) => {
      console.log(state);
      if(state.state != "LOGGED_IN")
        {
          this.apiEndpoint = 'api/ContactPublic';
        }
        else {
          this.apiEndpoint = 'api/Contact';
        }
    }})
  }

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(true);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        if(e.status == HttpStatusCode.InternalServerError)
          {
            this.$error.set({ message: e.message, status: e.status });
            this.$loading.set(false);

            this.toastServie.setError(e.status + " " + e.statusText);
            this.toastServie.show(4000);
    
            return EMPTY;
          }
          else {
            this.$loading.set(false);

            this.toastServie.setError(e.error);
            this.toastServie.show(3000);
            return EMPTY;
          }
        
      }),
      tap(() => {
        this.$loading.set(false);
      })
    );
  }

  withoutLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(false);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {

        this.toastServie.setError(e.status + " " + e.statusText);
          this.toastServie.show(3000);
          return EMPTY;
        
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

  create(payload: CreateContactPayload) {
    return this.withoutLoadingState(
      this._http.post<Contact>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: UpdateContactPayload) {
    return this.withoutLoadingState(
      this._http.patch<Contact>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withoutLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }

}
