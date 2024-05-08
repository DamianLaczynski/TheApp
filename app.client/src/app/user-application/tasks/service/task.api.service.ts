import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { FetchingError } from '../../utils/list-state.type';
import { Task, TaskCreatePayload, TaskUpdatePayload } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'api/Task';

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
      this._http.get<Task>(`${this.apiEndpoint}/${id}`, {
        observe: 'response',
      })
    );
  }
  getAll() {
    return this.withLoadingState(
      this._http.get<Task[]>(this.apiEndpoint, {
        observe: 'response',
      })
    );
  }

  create(payload: TaskCreatePayload) {
    return this.withLoadingState(
      this._http.post<Task>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: TaskUpdatePayload) {
    console.log("tu");
    return this.withLoadingState(
      this._http.patch<Task>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }
}
