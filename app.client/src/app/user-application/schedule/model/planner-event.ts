import { Time } from "@angular/common";

export interface PlannerEvent {
    id: string,
    name: string,
    date: Date,
    isDone: boolean,
    placeNumber: number,
    start?: string,
    end?: string
    duration?: number
}

export interface UpdatePlannerEventPayload {

}

export interface CreatePlannerEventPayload {
    name: String,
    date: string,
    isDone?: boolean,
    duration?: number,
    start?: string,
    end?: string
}