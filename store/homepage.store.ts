import { create } from 'zustand'
type CheckedState = boolean | 'indeterminate' | undefined;

type CategoryTab = {
    active: CheckedState,
    title: string,
    image: string,
    categoryId: number
}

type SectionEvent = {
    active: CheckedState,
    title: string,
    image: string,
    categoryId: number,
    orderBy: string,
    limit: number
}

type StripContent = {
    question: string,
    answer: string
}

type BannerContent = {
    show: boolean,
    categoryTabsShow: boolean,
}

export type HomePageStore = {
    versionManagement: boolean,
    texts: {},
    banner: BannerContent,
    categoryTabs: CategoryTab[],
    sectionEvents: SectionEvent[],
    strip: StripContent[],
    footer: {
        text: '',
    },
    updateSectionEventField: (index: number, eventUpdates: Partial<SectionEvent>) => void,
    addNewSectionEvent: () => void,
    updateStripContent: (index: number, eventUpdates: Partial<StripContent>) => void,
    addNewCategoryTab: () => void,
    updateCategoryTabs: (index: number, eventUpdates: Partial<CategoryTab>) => void,
    updateBanner: (index: number, eventUpdates: Partial<BannerContent>) => void,
}

export const useHomePageStore = create<HomePageStore>((set) => ({
    versionManagement: true,
    texts: {},
    banner: { show: true, categoryTabsShow: true },
    categoryTabs: [],
    sectionEvents: [],
    strip: [],
    footer: {
        text: '',
    },
    updateSectionEventField: (index: number, eventUpdates: Partial<SectionEvent>) => set((state) => {
        if (index < 0 || index >= state.sectionEvents.length) {
            console.warn('Index out of bounds');
            return state; // Return the current state if out of bounds
        }
        const updatedSectionEvents = state.sectionEvents.map((item, i) =>
            i === index ? { ...item, ...eventUpdates } : item
        );

        return { ...state, sectionEvents: updatedSectionEvents };
    }),

    updateStripContent: (index: number, stripUpdates: Partial<StripContent>) => set((state) => {
        if (index < 0 || index >= state.strip.length) {
            console.warn('Index out of bounds');
            return state; // Return the current state if out of bounds
        }
        const updatedStrip = state.strip.map((item, i) =>
            i === index ? { ...item, ...stripUpdates } : item
        );

        return { ...state, strip: updatedStrip };
    }),

    updateCategoryTabs: (index: number, categoryUpdates: Partial<CategoryTab>) => set((state) => {
        if (index < 0 || index >= state.categoryTabs.length) {
            console.warn('Index out of bounds');
            return state; // Return the current state if out of bounds
        }
        const updatedCategory = state.categoryTabs.map((item, i) =>
            i === index ? { ...item, ...categoryUpdates } : item
        );

        return { ...state, categoryTabs: updatedCategory };
    }),

    updateBanner: (index: number, bannerUpdates: Partial<BannerContent>) => set((state) => {

        return { ...state, banner: { ...state.banner, ...bannerUpdates } };
    }),

    addNewSectionEvent: () => set((state) => {
        const extraSectionEvent: SectionEvent = {
            active: true,
            orderBy: 'createdAt',
            title: 'New',
            image: 'url/to/new/image',
            limit: 10,
            categoryId: 10000
        }

        const newSectionEvents = [...state.sectionEvents, extraSectionEvent]
        return { ...state, sectionEvents: newSectionEvents };
    }),

    addNewCategoryTab: () => set((state) => {
        const extraCategoryTab: CategoryTab = {
            active: false,
            title: 'New',
            image: 'url/to/new/image',
            categoryId: 10000
        }

        const newCategoryTabs = [...state.categoryTabs, extraCategoryTab]
        return { ...state, categoryTabs: newCategoryTabs };
    }),
}));