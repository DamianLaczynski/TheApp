import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { createListState } from '../../../utils/create-list-state';
import { toObservable } from '@angular/core/rxjs-interop';
import { CategoryApiService } from './category-api.service';
import { CategoryStateService } from './category-state.service';
import { CreateOtherSubcategory } from '../../model/category';

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
    (state) => state.categories
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setCategorys(response.body);
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
            this.state.addCategory(response.body);
          }
        })
      )
      .subscribe();
  }

  createOtherSubcategory(payload: CreateOtherSubcategory) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addCategory(response);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: any) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updateCategory(response);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeCategory(id);
      })
    ).subscribe();
  }
}
