import { Injectable } from '@angular/core';
import { Category, CategorySetItem } from '../../model/category';
import { BehaviorSubject } from 'rxjs';

export type CategoryState = {
  categories: CategorySetItem[] 
}

const initialState = {
  categories: [],
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService {

  private state$ = new BehaviorSubject<CategoryState>(initialState);

  value$ = this.state$.asObservable();

  addCategory(category: Category)
  {
    if(category.superCategory)
      {
        this.state$.value.categories.find(item => item.id == category.superCategory?.id)?.subCategories.push(category);
      }
      else {
        this.state$.value.categories.push({id: category.id, name: category.name, subCategories: []})
      }
    
    this.state$.next({
      ...this.state$.value,
      categories: this.state$.value.categories
    });
  }

  setCategorys(categories: CategorySetItem[])
  {
    this.state$.next({
      ...this.state$.value,
      categories: categories
    });
  }

  removeCategory(id: string)
  {
    const updatedCategories = this.state$.value.categories.filter((category) => {
      return category?.id !== id;
    });

    this.state$.next({
      ...this.state$.value,
      categories: updatedCategories
    });
  }

  updateCategory(updatedCategory: CategorySetItem)
  {
    const updatedCategories = this.state$.value.categories.map((category) => {
      return category.id === updatedCategory.id ? updatedCategory : category;
    });

    this.state$.next({
      ...this.state$.value,
      categories: updatedCategories
    });
  }
}
