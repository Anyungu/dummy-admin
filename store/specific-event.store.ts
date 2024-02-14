import { create } from 'zustand'
type CheckedState = boolean | 'indeterminate' | undefined;

enum EventStatusEnum {
    ACTIVE = 'פָּעִיל',
    PENDING = 'ממתין ל',
    HIDDEN = 'מוּסתָר',
    ENDED = 'הסתיים',
}

enum EventTypeEnum {
    ONE_ARTIST = 'אמן אחד',
    SEVERAL_ARTISTS = 'כמה אמנים',
}

enum GameTypeEnum {
    REGULAR = 'רגיל',
    TOURNAMENT = 'טורניר',
}

type Ticket = {
    id: number,
    ticketreference: string,
    price: number,
    quantity: number,
    ticketImageUrls: string[],
    ticketType: any,
}

type EventName = {
    eventNameApprovalStatus: "approved",
    id: number,
    name: string,
}

type Location = {
    locationApprovalStatus: string;
    id: number;
    name: string;
    locationImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

type Artist = {
    artistApprovalStatus: string;
    id: number;
    name: string;
    artistImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

type GameName = {
    gameNameApprovalStatus: string;
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

type EventCategory = {
    id: number;
    name: string;
    categoryIcon: string;
    createdAt: string;
    updatedAt: string;
}

type EventSubcategory = {
    id: number;
    name: string;
    subcategoryImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

type Team = {
    teamApprovalStatus: string;
    id: number;
    name: string;
    teamImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

type SecondTeam = {
    secondTeamApprovalStatus: string;
    id: number;
    name: string;
    secondTeamImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

type DirectSpecificEvent = {
    mode: 'view' | 'edit',
    eventStatus: EventStatusEnum,
    hotEvent: CheckedState,
    popularEvent: CheckedState,
    eventType: EventTypeEnum | null,
    gameType: GameTypeEnum | null,
    eventStartDate: Date | null,
    eventEndDate: Date | null,
    eventTime: string,
    eventImageUrl: string,
}

type NestedSpecificEvent = EventName | Location | GameName | Team | SecondTeam

type NestedSpecificEventKey = {
    eventName: EventName | null,
    location: Location | null,
    gameName: GameName | null,
    team: Team | null,
    secondTeam: SecondTeam | null
}

type ArraySpecificEvent = EventCategory | EventSubcategory | Artist | Ticket

type ArraySpecificEventKey = {
    categories: EventCategory[],
    subcategories: EventSubcategory[],
    artists: Artist[],
    tickets: Ticket[],

}

export type SpecificEventStore = {
    mode: 'view' | 'edit',
    eventStatus: EventStatusEnum,
    hotEvent: CheckedState,
    popularEvent: CheckedState,
    id: number,
    eventType: EventTypeEnum | null,
    gameType: GameTypeEnum | null,
    eventStartDate: Date | null,
    eventEndDate: Date | null,
    eventTime: string,
    eventImageUrl: string,
    tickets: Ticket[],
    eventName: EventName | null,
    location: Location | null
    artists: Artist[],
    gameName: GameName | null,
    categories: EventCategory[],
    subcategories: EventSubcategory[],
    team: Team | null,
    secondTeam: SecondTeam | null

    updateDirectSpecificEvent: (eventUpdates: Partial<DirectSpecificEvent>) => void,
    updateNestedSpecificEvent: (primaryKey: keyof NestedSpecificEventKey, eventUpdates: Partial<NestedSpecificEvent>) => void,
    updateArraySpecificEvent: (index: number, primaryKey: keyof ArraySpecificEventKey, eventUpdates: Partial<ArraySpecificEvent>) => void,
    isNotEditMode: () => boolean

}

export const useSpecificEventStore = create<SpecificEventStore>((set, get) => ({
    mode: 'view',
    eventStatus: EventStatusEnum.ACTIVE,
    hotEvent: false,
    popularEvent: false,
    id: 0,
    eventType: null,
    gameType: null,
    eventStartDate: null,
    eventEndDate: null,
    eventTime: '',
    eventImageUrl: '',
    tickets: [],
    eventName: null,
    location: null,
    artists: [],
    gameName: null,
    categories: [],
    subcategories: [],
    team: null,
    secondTeam: null,
    updateDirectSpecificEvent: (eventUpdates: Partial<DirectSpecificEvent>) => set((state) => {
        console.log(eventUpdates)
        return { ...state, ...eventUpdates };
    }),

    updateNestedSpecificEvent: (primaryKey: keyof NestedSpecificEventKey, eventUpdates: Partial<NestedSpecificEvent>) => set((state) => {
        return { ...state, [primaryKey]: { ...eventUpdates } };
    }),

    updateArraySpecificEvent: (index: number, primaryKey: keyof ArraySpecificEventKey, eventUpdates: Partial<ArraySpecificEvent>) => set((state) => {

        if (index < 0 || index >= state[primaryKey]?.length) {
            console.warn('Index out of bounds');
            return state; // Return the current state if out of bounds
        }
        const updatedEvent = state[primaryKey].map((item, i) =>
            i === index ? { ...item, ...eventUpdates } : item
        );

        return { ...state, [primaryKey]: updatedEvent };
    }),

    isNotEditMode: () => {
        const { mode } = get()
        return mode !== 'edit'
    }

}));

