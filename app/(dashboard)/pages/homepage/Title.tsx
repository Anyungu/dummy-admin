'use client'

import { useHomePageStore } from '@/store/homepage.store'
import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'

type TitleProps = {
    title: string
}

function Title({ title }: TitleProps) {

    const { addNewSectionEvent } = useHomePageStore()
    return (
        <div className='flex w-full justify-between items-center pr-6'>
            <div className='my-4 ml-6 text-2xl font-bold'>
                {title}
            </div>
            <div>
                <PlusIcon width={28} height={28} color='green' onClick={() => { console.log(1); addNewSectionEvent() }} />
            </div>
        </div>
    )
}

export default Title