import { Pipe, PipeTransform } from "@angular/core";
import { Task, TaskStatus } from "../model/task";

@Pipe({
    name: 'filter',
    standalone: true
  })
  export class FilterByTaskStatusPipe implements PipeTransform {
    transform(items: Task[], taskStatus: TaskStatus): Task[] {
      if (!items) return [];
      if (!taskStatus) return items;
  
      return items.filter(item => {
        return item.status == taskStatus;
      });
    }
  }