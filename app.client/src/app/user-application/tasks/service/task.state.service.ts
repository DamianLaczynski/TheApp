import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';

export type TaskState = {
  tasks: Task[]
}

const initialState = {
  tasks: []
}

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {

  constructor() { }

  private state$ = new BehaviorSubject<TaskState>(initialState);

  value$ = this.state$.asObservable();

  addTask(task: Task)
  {
    this.state$.next({
      tasks: [...this.state$.value.tasks, task]
    });
  }

  setTasks(tasks: Task[])
  {
    this.state$.next({
      tasks
    });
  }

  removeTask(taskId: string)
  {
    const updatedTasks = this.state$.value.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.state$.next({
      tasks: updatedTasks
    });
  }

  updateTask(updatedTask: Task)
  {
    const updatedTasks = this.state$.value.tasks.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    this.state$.next({
      tasks: updatedTasks
    });
  }
}
