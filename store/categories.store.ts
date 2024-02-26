import { create } from 'zustand'
type ApprovedNotApproved = "approved" | "not_approved"

type CategoryData = {
    id: number,
    name: string,
    categoryIcon: string,
}

type ArtistNameData = {
    id: number,
    name: string,
    artistImageUrl: string,
    artistApprovalStatus: ApprovedNotApproved

}

type EventNameData = {
    id: number,
    name: string,
    eventNameApprovalStatus: ApprovedNotApproved
}

type GameNameData = {
    id: number,
    name: string,
    gameNameApprovalStatus: ApprovedNotApproved
}

type TeamNameData = {
    id: number,
    name: string,
    teamImageUrl: string,
    teamApprovalStatus: ApprovedNotApproved
}

type LocationsData = {
    id: number,
    name: string,
    locationImageUrl: string,
    locationApprovalStatus: ApprovedNotApproved
}


type CategoryStore = {
    categories: CategoryData[],
    artists: ArtistNameData[],
    eventNames: EventNameData[],
    gameNames: GameNameData[],
    teamNames: TeamNameData[],
    locations: LocationsData[],
    addSingleValueToDropDown: (key: keyof Omit<CategoryStore, 'addSingleValueToDropDown'>, data: Partial<ArtistNameData | EventNameData | GameNameData | TeamNameData | LocationsData>) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    artists: [],
    eventNames: [],
    gameNames: [],
    teamNames: [],
    locations: [],
    addSingleValueToDropDown: (key: keyof Omit<CategoryStore, 'addSingleValueToDropDown'>, data: Partial<ArtistNameData | EventNameData | GameNameData | TeamNameData>) => set((state) => {

        const updatedArray = [...state[key], data]

        return { ...state, [key]: updatedArray };
    }),
}));