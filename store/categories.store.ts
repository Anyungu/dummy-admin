import { create } from 'zustand'

type CategoryData = {
    id: number,
    name: string,
    categoryIcon: string,
}

export type CategoryStore = {
    categories: CategoryData[],
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
}));