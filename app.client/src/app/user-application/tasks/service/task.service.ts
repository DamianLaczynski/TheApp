import { Injectable, inject } from '@angular/core';
import { TaskApiService } from './task.api.service';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { TaskStateService } from './task.state.service';
import { createListState } from '../../utils/create-list-state';
import { TaskCreatePayload, TaskUpdatePayload } from '../model/task';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../toast/service/toast.service';


type FetchingError = { message: string; status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private httpService = inject(TaskApiService);
  private state = inject(TaskStateService);
  private toast = inject(ToastService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.tasks
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setTasks(response.body);
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
            this.state.addTask(response.body);
          }
        })
      )
      .subscribe();
  }

  create(payload: TaskCreatePayload) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addTask(response);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: TaskUpdatePayload) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updateTask(response);
        this.toast.setSuccess("Updated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeTask(id);
        this.toast.setAlert("Delated successfully");
        this.toast.show(3000);
      })
    ).subscribe();
  }
}
