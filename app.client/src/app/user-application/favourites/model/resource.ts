export interface Resource {
    id: string,
    isFavourite: boolean,
    name: string
    type: ResourceTypeValue
}

export enum ResourceType {
    PATH = "PATH",
    TASK = "TASK",
    MATERIAL = "MATERIAL",
    EVENT = "EVENT"
}

export const RESOURCE_TYPE = {
    PATH: "PATH",
    TASK: "TASK",
    MATERIAL: "MATERIAL",
    EVENT: "EVENT"
  } as const;
  
  export type ResourceTypeValue = keyof typeof ResourceType;