import { Injectable, inject } from '@angular/core';
import { PlannerApiService } from './planner.api.service';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { PlannerStateService } from './planner.state.service';
import { createListState } from '../../utils/create-list-state';
import { ToastService } from '../../toast/service/toast.service';
import { CreatePlannerEventPayload, UpdatePlannerEventPayload } from '../model/planner-event';
import { DatePipe } from '@angular/common';


type FetchingError = { message: string; status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private httpService = inject(PlannerApiService);
  private state = inject(PlannerStateService);
  private toast = inject(ToastService);


  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.plannerEvents
  );

  getAllByDate(date: Date) {
    this.httpService
      .getAll(date)
      .pipe(
        tap((response) => {
          console.log(response)
          if (response.body) {
            this.state.setPlannerEvents(response.body);
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
            this.state.addPlannerEvent(response.body);
          }
        })
      )
      .subscribe();
  }

  create(payload: CreatePlannerEventPayload) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addPlannerEvent(response);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: UpdatePlannerEventPayload) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updatePlannerEvent(response);
        this.toast.setSuccess("Updated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removePlannerEvent(id);
        this.toast.setAlert("Delated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }
}
