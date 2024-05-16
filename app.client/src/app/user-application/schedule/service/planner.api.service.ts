import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { FetchingError } from '../../utils/list-state.type';
import { CreatePlannerEventPayload, PlannerEvent, UpdatePlannerEventPayload } from '../model/planner-event';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlannerApiService {
  private _http = inject(HttpClient);
  private datePipe = inject(DatePipe);
  readonly apiEndpoint: string = 'api/PlannerEvent';

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
      this._http.get<PlannerEvent>(`${this.apiEndpoint}/${id}`, {
        observe: 'response',
      })
    );
  }
  getAll(date: Date) {
    const dateAsString = this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.withLoadingState(
      this._http.get<any>(`${this.apiEndpoint}/${dateAsString}`, {
        observe: 'response',
      })
    );
  }

  create(payload: CreatePlannerEventPayload) {
    return this.withLoadingState(
      this._http.post<PlannerEvent>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: UpdatePlannerEventPayload) {
    return this.withLoadingState(
      this._http.patch<PlannerEvent>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }
}
