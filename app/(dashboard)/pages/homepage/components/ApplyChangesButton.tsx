'use client'

import { Button } from '@/components/ui/button'
import { patch } from '@/lib/axios.util'
import { useHomePageStore } from '@/store/homepage.store'
import React from 'react'


function ApplyChangesButton() {

    const { banner, categoryTabs, sectionEvents, strip, footer } = useHomePageStore()
    return (
        <Button className='px-4 py-2 bg-green-600' onClick={() => {
            patch('admin/home-page', {
                banner, categoryTabs, sectionEvents, strip, footer
            })
        }}>
            Appy configuration
        </Button>

    )
}

export default ApplyChangesButton