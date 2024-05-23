import { User } from "../../user/model/user"

export interface Task {
    id: string,
    title: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    status: TaskStatus,
    priority?: TaskPriority,
    deadline?: Date,
    createdBy?: User;
}

export enum TaskPriority {
    NONE = 'None',
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export enum TaskStatus {
    NEW = 'New',
    IN_PROGRESS = "InProgress",
    DONE = 'Done'
}

export interface TaskCreatePayload {
    title: string,
    description?: string,
    status?: TaskStatus,
    priority?: TaskPriority,
    deadline?: Date,
    createdBy?: User;
}

export interface TaskUpdatePayload {
    title?: string,
    description?: string,
    status?: TaskStatus,
    priority?: TaskPriority,
    deadline?: Date
}