'use client'

import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SaveEventButton from '../components/SaveEventButton';
import { useSpecificEventStore } from '@/store/specific-event.store';
import { useCategoryStore } from '@/store/categories.store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GeneralDatePicker from '../../components/GeneralDatePicker';

function SpecificEventForm() {

    const { eventName,
        location,
        categories,
        eventStartDate,
        eventEndDate,
        eventTime,
        tickets,
        artists,
        eventType,
        gameType,
        gameName,
        team,
        secondTeam,
        isNotEditMode,
        updateArraySpecificEvent,
        updateDirectSpecificEvent,
        updateNestedSpecificEvent
    } = useSpecificEventStore();

    const { categories: allCategories } = useCategoryStore()



    return (
        <>
            <div className='flex flex-row w-full h-full bg-white border rounded-xl my-4 mx-2'>
                <div className='w-[80%] h-full py-10 px-4 space-y-10'>
                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="event"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Event
                            </label>
                            <Input id="name" type="text" placeholder="Event"
                                value={eventName?.name}
                                disabled={isNotEditMode()}
                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('eventName', { name: e.target.value }) }} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="loc"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Location
                            </label>
                            <Input id="loc" type="text" placeholder="Locationtle" value={location?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('location', { name: e.target.value }) }} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Category
                            </label>
                            <Select value={`${categories[0]?.id}`}
                                disabled={isNotEditMode()}
                                onValueChange={(value) => updateArraySpecificEvent(0, 'categories', { id: parseInt(value) })}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
                                </SelectTrigger>

                                <SelectContent >
                                    {allCategories.map((category, idx) => {
                                        return <SelectItem key={idx} value={`${category?.id}`}>{category?.name}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="startDate"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Date
                            </label>
                            <GeneralDatePicker />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                End Date
                            </label>
                            <GeneralDatePicker />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Time
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={eventTime} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Tickets
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={tickets?.length} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Artists
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={artists?.length} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Event Type
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={`${eventType}`} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Game Type
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={`${gameType}`} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Game Name
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={gameName?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Team
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={team?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                2nd Team
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={secondTeam?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`} />
                        </div>
                    </div>

                </div>

                <div className='flex flex-col w-[20%] h-full border-l-2 border-gray-200 py-4 px-2 space-y-8'>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is popular?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={true} />

                    </div>
                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is hot?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={true} />

                    </div>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is approved?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={true} />

                    </div>

                </div>

            </div>
            <div className='flex w-full justify-end'>
                <SaveEventButton />
            </div>
        </>
    )
}

export default SpecificEventForm