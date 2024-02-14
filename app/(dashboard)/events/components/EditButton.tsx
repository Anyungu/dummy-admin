'use client'

import { useSpecificEventStore } from '@/store/specific-event.store'
import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons'
import React from 'react'

function EditButton() {

    const {
        updateDirectSpecificEvent,
        mode
    } = useSpecificEventStore()

    const isEditMode = () => mode === 'edit';

    return isEditMode() ?
        <div className='px-2 py-2 cursor-pointer' onClick={() => { updateDirectSpecificEvent({ mode: 'view' }) }}>
            <EyeOpenIcon width={25} height={25} />
        </div>
        : <div className='px-2 py-2 cursor-pointer' onClick={() => { updateDirectSpecificEvent({ mode: 'edit' }) }}>
            <Pencil2Icon width={25} height={25} />
        </div>

}

export default EditButton