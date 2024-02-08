'use client'

import { useHomePageStore } from '@/store/homepage.store'
import React, { useEffect, useRef } from 'react'
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

export type Props = {
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
function ClientStoreInitializer(data: Props) {
    useEffect(() => {
        useHomePageStore.setState({ ...data });
    }, [data]);

    return null;
}

export default ClientStoreInitializer