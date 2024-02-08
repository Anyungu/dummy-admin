'use client'

import { useCategoryStore } from '@/store/categories.store'
import { useHomePageStore } from '@/store/homepage.store'
import React, { useEffect } from 'react'

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
    orderBy: HomePageEventOrderOptions,
    limit: number,
    layout: SectionEventLayout,
}

type StripContent = {
    question: string,
    answer: string
}

type BannerContent = {
    show: boolean,
    categoryTabsShow: boolean,
}

type HomePageProps = {
    versionManagement: boolean,
    texts?: {},
    banner?: BannerContent,
    categoryTabs?: CategoryTab[],
    sectionEvents?: SectionEvent[],
    strip?: StripContent[],
    footer?: {
        text: '',
    }
}

type CategoryProps = {
    id: number,
    name: string,
    categoryIcon: string,
}

type Props = {
    homePage: HomePageProps,
    category: CategoryProps[]
}
function ClientStoreInitializer({ category, homePage }: Props) {
    console.log(category)
    console.log(homePage)

    useEffect(() => {
        useHomePageStore.setState({ ...useHomePageStore.getState(), ...homePage });
        useCategoryStore.setState({ categories: [...useCategoryStore.getState().categories, ...category] })
    }, [category, homePage]);

    return null;
}

export default ClientStoreInitializer