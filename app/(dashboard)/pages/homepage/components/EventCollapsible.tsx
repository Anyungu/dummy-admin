'use client'

import { useHomePageStore } from '@/store/homepage.store'
import React from 'react'
import { NestedEventCollapsible } from './NestedEventCollapsible'

function EventCollapsible() {
    const { sectionEvents } = useHomePageStore()
    return (

        sectionEvents.map((event: any, idx: number) => {
            return <NestedEventCollapsible key={idx} position={idx} />
        })

    )
}

export default EventCollapsible