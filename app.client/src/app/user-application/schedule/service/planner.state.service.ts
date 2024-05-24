import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlannerEvent } from '../model/planner-event';

export type PlannerState = {
  plannerEvents: (PlannerEvent | undefined)[] ,
  minEventsCount: number
}

const initialState = {
  plannerEvents: [],
  minEventsCount: 10
}

@Injectable({
  providedIn: 'root'
})
export class PlannerStateService {

  constructor() { }

  private state$ = new BehaviorSubject<PlannerState>(initialState);

  value$ = this.state$.asObservable();

  addPlannerEvent(task: PlannerEvent)
  {
    this.state$.next({
      ...this.state$.value,
      plannerEvents: [...this.state$.value.plannerEvents, task]
    });
  }

  setPlannerEvents(plannerEvents: PlannerEvent[])
  {
    const dayPlanner = this.generateDayPlanner(plannerEvents);
    this.state$.next({
      ...this.state$.value,
      plannerEvents: dayPlanner
    });
  }

  removePlannerEvent(taskId: string)
  {
    const updatedTasks = this.state$.value.plannerEvents.filter((task) => {
      return task?.id !== taskId;
    });

    this.state$.next({
      ...this.state$.value,
      plannerEvents: updatedTasks
    });
  }

  updatePlannerEvent(updatedTask: PlannerEvent)
  {
    const updatedTasks = this.state$.value.plannerEvents.map((task) => {
      return task?.id === updatedTask.id ? updatedTask : task;
    });

    this.state$.next({
      ...this.state$.value,
      plannerEvents: updatedTasks
    });
  }

  generateDayPlanner(events: PlannerEvent[]): (PlannerEvent | undefined)[] 
  {
    let dayPlanner: (PlannerEvent| undefined)[]  = events;
    let emptyElement: PlannerEvent = {
      id: "",
      date: new Date(),
      isDone: false,
      name: "",
      placeNumber: -1
    }
    for (let i = 0; i < initialState.minEventsCount - events.length; i++) {
      dayPlanner.push(undefined);
    }
    return dayPlanner;
  }
}
