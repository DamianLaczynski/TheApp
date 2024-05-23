import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CategoryService } from '../../service/category/category.service';
import { AsyncPipe } from '@angular/common';
import { FindCategoryPipe } from '../../utils/filter-by-status.pipe';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryForm } from '../../model/category';


@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [AsyncPipe, FindCategoryPipe, ReactiveFormsModule],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css',
})
export class CategorySelectComponent implements OnInit, OnChanges {
  @Input({required: true}) categoryForm!: CategoryForm;

  private categoryService = inject(CategoryService);

  state$ = this.categoryService.listState$;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  updateForm(typeOfCategory: string) {
    if (typeOfCategory == 'category') {
      this.categoryForm.controls.category.setValue('');
    }
  }

  addSubcategoryToOtherCategory(name: string)
  {
    this.categoryService.createOtherSubcategory({name: name, superCategoryId: "inny"});
  }
}
