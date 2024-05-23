import { Category } from "./category"

export interface Contact {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber?: string,
    birthday?: Date,
    createdAt?: Date,
    updatedAt?: Date
    category?: Category
}

export interface CreateContactPayload {
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber?: string,
    birthday: Date | null,
    categoryId?: string
}

export interface UpdateContactPayload {
    firstname?: string,
    lastname?: string,
    email?: string,
    phoneNumber?: string,
    birthday: Date | null,
    categoryId?: string
}
