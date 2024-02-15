'use client'

import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SaveEventButton from '../components/SaveEventButton';
import { useSpecificEventStore } from '@/store/specific-event.store';
import { useCategoryStore } from '@/store/categories.store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GeneralDatePicker from '../../components/GeneralDatePicker';
import { Pencil1Icon } from '@radix-ui/react-icons';

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
        hotEvent,
        popularEvent,
        eventStatus,
        isNotEditMode,
        updateArraySpecificEvent,
        updateDirectSpecificEvent,
        updateNestedSpecificEvent,
        getEventTypeEnum,
        getGameTypeEnum
    } = useSpecificEventStore();

    const { categories: allCategories } = useCategoryStore()
    const eventTypeDropDownData = getEventTypeEnum()
    const gameTypeDropDownData = getGameTypeEnum()



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
                                onChange={(e) => { updateNestedSpecificEvent('eventName', { name: e.target.value, eventNameApprovalStatus: 'approved' }) }} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="loc"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Location
                            </label>
                            <Input id="loc" type="text" placeholder="Locationtle" value={location?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('location', { name: e.target.value, locationApprovalStatus: 'approved' }) }} />
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
                            <div className={`px-3 w-full text-sm py-2 items-center flex flex-row justify-between ${isNotEditMode() ? 'border-0 text-gray-400' : 'border border-1 rounded-md'}`}>
                                <div>{tickets?.length}</div>
                                <div className={`${isNotEditMode() ? 'hidden' : ' block'}`}><Pencil1Icon /></div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Artists
                            </label>
                            <div className={`px-3 w-full text-sm py-2 items-center flex flex-row justify-between ${isNotEditMode() ? 'border-0 text-gray-400' : 'border border-1 rounded-md'}`}>
                                <div>{artists?.length}</div>
                                <div className={`${isNotEditMode() ? 'hidden' : 'block'}`}><Pencil1Icon /></div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Event Type
                            </label>
                            <Select value={`${eventType}`}
                                disabled={isNotEditMode()}
                                onValueChange={(value) => updateDirectSpecificEvent({ eventType: value as EventTypeEnum })}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
                                </SelectTrigger>

                                <SelectContent >
                                    {eventTypeDropDownData.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.value}`}>{type?.text}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select>
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
                            <Select value={`${gameType}`}
                                disabled={isNotEditMode()}
                                onValueChange={(value) => updateDirectSpecificEvent({ gameType: value as GameTypeEnum })}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
                                </SelectTrigger>

                                <SelectContent >
                                    {gameTypeDropDownData.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.value}`}>{type?.text}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Game Name
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={gameName?.name} disabled={isNotEditMode()}
                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('gameName', { name: e.target.value, gameNameApprovalStatus: 'approved' }) }} />

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
                            <Input id="title" type="text" placeholder="Title" value={team?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('team', { name: e.target.value, teamApprovalStatus: 'approved' }) }} />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                2nd Team
                            </label>
                            <Input id="title" type="text" placeholder="Title" value={secondTeam?.name} disabled={isNotEditMode()} className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateNestedSpecificEvent('secondTeam', { name: e.target.value, secondTeamApprovalStatus: 'approved' }) }} />
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
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={popularEvent}
                            onCheckedChange={(val) => { updateDirectSpecificEvent({ popularEvent: val }) }} />

                    </div>
                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is hot?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={hotEvent}
                            onCheckedChange={(val) => { updateDirectSpecificEvent({ hotEvent: val }) }} />

                    </div>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is active?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={eventStatus === EventStatusEnum.ACTIVE}
                            onCheckedChange={(val) => {
                                updateDirectSpecificEvent({ eventStatus: val === true ? EventStatusEnum.ACTIVE : EventStatusEnum.PENDING })
                            }} />

                    </div>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is pending?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={eventStatus === EventStatusEnum.PENDING}
                            onCheckedChange={(val) => {
                                updateDirectSpecificEvent({ eventStatus: val === true ? EventStatusEnum.PENDING : EventStatusEnum.ACTIVE })
                            }} />

                    </div>

                    <div className='flex flex-col space-y-2'>

                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Is hidded?
                        </label>
                        <Checkbox disabled={isNotEditMode()} id="terms" color='#84ECA0' checked={eventStatus === EventStatusEnum.HIDDEN}
                            onCheckedChange={(val) => {
                                updateDirectSpecificEvent({ eventStatus: val === true ? EventStatusEnum.HIDDEN : EventStatusEnum.ACTIVE })
                            }} />

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