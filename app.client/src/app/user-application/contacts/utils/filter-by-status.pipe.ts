import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from "../model/contact";
import { CategorySetItem } from "../model/category";

@Pipe({
    name: 'find',
    standalone: true
  })
  export class FindContactPipe implements PipeTransform {
    transform(items: Contact[], id: string): Contact | undefined {
      return items.find(item => item.id == id);
    }
  }

  @Pipe({
    name: 'find',
    standalone: true
  })
  export class FindCategoryPipe implements PipeTransform {
    transform(items: CategorySetItem[], id: string): CategorySetItem | undefined {
      return items.find(item => item.id == id);
    }
  }