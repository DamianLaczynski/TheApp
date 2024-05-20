import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CategoryService } from '../../service/category/category.service';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../model/category';
import { FindCategoryPipe } from '../../utils/filter-by-status.pipe';

@Component({
  selector: 'app-category-select',
  standalone: true,
  imports: [AsyncPipe, FindCategoryPipe],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css'
})
export class CategorySelectComponent implements OnInit, OnChanges{
  @Input() category?: Category;
private categoryService = inject(CategoryService);

state$ = this.categoryService.listState$;

selectedCategory?: Category;

ngOnInit(): void {
  this.categoryService.getAll();
  this.state$.subscribe({next:(res) => console.log(res)})
  console.log(this.category)
}
ngOnChanges(changes: SimpleChanges): void {
  
}
}
