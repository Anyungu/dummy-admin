import { create } from 'zustand'
type CheckedState = boolean | 'indeterminate' | undefined;

enum HomePageEventOrderOptions {
    CREATED_AT = 'createdAt',
    START_DATE = 'startDate',
}

enum SectionEventLayout {
    CAROUSEL = 'carousel',
    HERO_BANNER = 'heroBanner',
    SWIM_LINE = 'swimLine',
}

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
    orderBy: HomePageEventOrderOptions,
    limit: number,
    layout: SectionEventLayout
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
    updating: boolean,
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
    updateBanner: (eventUpdates: Partial<BannerContent>) => void,
    setUpdating: (value: boolean) => void
    deleteSectionEvent: (index: number) => void,
    deleteCategoryTab: (index: number) => void,
}

export const useHomePageStore = create<HomePageStore>((set) => ({
    updating: false,
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

    updateBanner: (bannerUpdates: Partial<BannerContent>) => set((state) => {

        return { ...state, banner: { ...state.banner, ...bannerUpdates } };
    }),

    addNewSectionEvent: () => set((state) => {
        const extraSectionEvent: SectionEvent = {
            active: true,
            orderBy: HomePageEventOrderOptions.CREATED_AT,
            title: 'New',
            image: 'url/to/new/image',
            limit: 10,
            categoryId: 10000,
            layout: SectionEventLayout.CAROUSEL
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

    setUpdating: (updating: boolean) => set((state) => {
        return { ...state, updating };
    }),

    deleteCategoryTab: (index: number) => set((state) => {
        if (index < 0 || index >= state.categoryTabs.length) {
            console.warn('Index out of bounds for deleting category tab');
            return state;
        }
        const filteredCategoryTabs = state.categoryTabs.filter((_, i) => i !== index);
        return { ...state, categoryTabs: filteredCategoryTabs };
    }),

    deleteSectionEvent: (index: number) => set((state) => {
        if (index < 0 || index >= state.sectionEvents.length) {
            console.warn('Index out of bounds for deleting section event');
            return state;
        }
        const filteredSectionEvents = state.sectionEvents.filter((_, i) => i !== index);
        return { ...state, sectionEvents: filteredSectionEvents };
    })
}));