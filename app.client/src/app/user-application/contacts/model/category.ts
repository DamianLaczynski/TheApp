import { FormControl, FormGroup } from "@angular/forms";

export interface Category {
    id: string,
    name: string,
    superCategory?: Category
}

export interface CategorySetItem {
    id: string,
    name: string,
    subCategories: Category[]
}

export type CategoryForm = FormGroup<{
    supercategory: FormControl<string>;
    category: FormControl<string>;
  }>;
  
  export type CategoryFormValue = ReturnType<CategoryForm['getRawValue']>;

export interface CreateOtherSubcategory {
    name: string;
    superCategoryId: string;
}