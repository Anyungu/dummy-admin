import { create } from 'zustand'

type CategoryTab = {
    active: boolean,
    title: string,
    image: string,
    categoryId: number
}

type SectionEvent = {
    active: boolean,
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
    }
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
    updateSectionEvent: (index: number, newEvent: SectionEvent) => set((state) => {
        if (index < 0 || index >= state.sectionEvents.length) {
            console.warn('Index out of bounds');
            return state;
        }
        //must I really map?
        const updatedSectionEvents = state.sectionEvents.map((item, i) => i === index ? newEvent : item);
        
        return { ...state, sectionEvents: updatedSectionEvents };
    }),
}));