'use client'

import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SaveEventButton from '../components/SaveEventButton';
import { useSpecificEventStore } from '@/store/specific-event.store';

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
        mode,
        updateArraySpecificEvent,
        updateDirectSpecificEvent,
        updateNestedSpecificEvent
    } = useSpecificEventStore();

    const isEditMode = () => {
        return mode === 'edit' ? true : false;
    }

    return (
        <>
            <div className='flex flex-row w-full h-full bg-white border rounded-xl my-4 mx-2'>
                <div className='w-[80%] h-full py-10 px-4 space-y-10'>
                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Name
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={eventName?.name} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Location
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={location?.name} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Category
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={categories[0]?.name} disabled={isEditMode()} className=' border-0' />
                        </div>

                    </div>

                    <div className='grid grid-cols-3 gap-6'>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Date
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={`${eventStartDate}`} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                End Date
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={`${eventEndDate}`} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Time
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={eventTime} disabled={isEditMode()} className=' border-0' />
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
                            <Input id="title" type="text" placeholder="Title" value={tickets?.length} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Artists
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={artists?.length} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Event Type
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={`${eventType}`} disabled={isEditMode()} className=' border-0' />
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
                            <Input id="title" type="text" placeholder="Title" value={`${gameType}`} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Game Name
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={gameName?.name} disabled={isEditMode()} className=' border-0' />
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
                            <Input id="title" type="text" placeholder="Title" value={team?.name} disabled={isEditMode()} className=' border-0' />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                2nd Team
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={secondTeam?.name} disabled={isEditMode()} className=' border-0' />
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
                        <Checkbox disabled={isEditMode()} id="terms" color='#84ECA0' checked={true} />

                    </div>
                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is hot?
                        </label>
                        <Checkbox disabled={isEditMode()} id="terms" color='#84ECA0' checked={true} />

                    </div>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is approved?
                        </label>
                        <Checkbox disabled={isEditMode()} id="terms" color='#84ECA0' checked={true} />

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