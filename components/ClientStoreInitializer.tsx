'use client'

import { useCategoryStore } from '@/store/categories.store'
import { useHomePageStore } from '@/store/homepage.store'
import { useSpecificEventStore } from '@/store/specific-event.store'
import React, { useEffect } from 'react'

type ApprovedNotApproved = "approved" | "not_approved"

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
    eventNameApprovalStatus: ApprovedNotApproved,
    id: number,
    name: string,
}

type Location = {
    locationApprovalStatus: ApprovedNotApproved;
    id: number;
    name: string;
    locationImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

type Artist = {
    artistApprovalStatus: ApprovedNotApproved;
    id: number;
    name: string;
    artistImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

type GameName = {
    gameNameApprovalStatus: ApprovedNotApproved;
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
    teamApprovalStatus: ApprovedNotApproved;
    id: number;
    name: string;
    teamImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

type SecondTeam = {
    secondTeamApprovalStatus: ApprovedNotApproved;
    id: number;
    name: string;
    secondTeamImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}



export type SpecificEventProps = {
    mode: 'view' | 'edit',
    eventStatus: EventStatusEnum,
    hotEvent: boolean,
    popularEvent: boolean,
    id: number,
    eventType: EventTypeEnum | null,
    gameType: GameTypeEnum | null,
    eventStartDate: string | null,
    eventEndDate: string | null,
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

type ArtistNameProps = {
    id: number,
    name: string,
    artistImageUrl: string,
    artistApprovalStatus: ApprovedNotApproved

}

type EventNameProps = {
    id: number,
    name: string,
    eventNameApprovalStatus: ApprovedNotApproved
}

type GameNameProps = {
    id: number,
    name: string,
    gameNameApprovalStatus: ApprovedNotApproved
}

type TeamNameProps = {
    id: number,
    name: string,
    teamImageUrl: string,
    teamApprovalStatus: ApprovedNotApproved
}

type LocationsProps = {
    id: number,
    name: string,
    locationImageUrl: string,
    locationApprovalStatus: ApprovedNotApproved
}



type Props = {
    homePage?: HomePageProps,
    categories?: CategoryProps[],
    specificEvent?: SpecificEventProps,
    artists?: ArtistNameProps[],
    eventNames?: EventNameProps[],
    gameNames?: GameNameProps[],
    teamNames?: TeamNameProps[],
    locations?: LocationsProps[]
}

function ClientStoreInitializer({ categories, homePage, specificEvent, artists, eventNames, gameNames, teamNames, locations }: Props) {

    useEffect(() => {
        if (homePage) {
            useHomePageStore.setState(homePage);
        }
        if (categories) {
            useCategoryStore.setState({ categories, artists, eventNames, gameNames, teamNames, locations });
        }
        if (specificEvent) {
            useSpecificEventStore.setState(specificEvent);
        }
    }, [categories, homePage, specificEvent]);

    return null;
}

export default ClientStoreInitializer