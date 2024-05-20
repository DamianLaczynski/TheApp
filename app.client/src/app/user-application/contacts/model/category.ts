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

