import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskStatus } from '../tasks/model/task';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterTaskByTaskStatusPipe implements PipeTransform {
  transform(items: Task[], taskStatus: TaskStatus): Task[] {
    if (!items) return [];
    if (!taskStatus) return items;

    return items.filter(item => {
      return item.status == taskStatus;
    });
  }
}

@Pipe({
    name: 'find',
    standalone: true
  })
  export class FindPipe implements PipeTransform {
    transform(items: Task[], taskId: string): Task | undefined {
      if (!items) return undefined;
      if (!taskId) return undefined;
  
      return items.find(item => {
        return item.id == taskId;
      });
    }
  }
