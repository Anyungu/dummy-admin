'use client'

import React, { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SaveEventButton from '../components/SaveEventButton';
import { useSpecificEventStore } from '@/store/specific-event.store';
import { useCategoryStore } from '@/store/categories.store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GeneralDatePicker from '../../components/GeneralDatePicker';
import { CheckCircledIcon, CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { formatDateToYYYYMMDD } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

    const { categories: allCategories,
        eventNames: allEventNames,
        artists: allArtists,
        gameNames: allGameNames,
        teamNames: allTeamNames,
        locations: allLocations,
        addSingleValueToDropDown
    } = useCategoryStore()
    const eventTypeDropDownData = getEventTypeEnum()
    const gameTypeDropDownData = getGameTypeEnum()

    const [localEventName, setLocalEventName] = useState('');
    const [localLocationName, setLocalLocationName] = useState('');
    const [localGameName, setLocalGameName] = useState('');
    const [localTeam, setLocalTeam] = useState('');
    const [secondLocalTeam, setSecondLocalTeam] = useState('');
    const [localArtisName, setLocalArtisName] = useState('');



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
                            <Select value={`${eventName?.id}`}

                                disabled={isNotEditMode()}
                                onValueChange={(value) => {
                                    const name = allEventNames.find(type => `${type.id}` === value)?.name;
                                    updateNestedSpecificEvent('eventName', { id: parseInt(value), eventNameApprovalStatus: 'approved', name })
                                }
                                }>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                </SelectTrigger>

                                <SelectContent>
                                    {allEventNames?.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                    })}
                                    {
                                        <div className="flex flex-row items-center relative space-x-2">

                                            <Input id="name" type="text" placeholder="Event"
                                                value={localEventName}
                                                disabled={isNotEditMode()}
                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                onChange={(e) => { setLocalEventName(e.target.value) }} />

                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('eventNames', { id: -allEventNames.length, name: localEventName })} />
                                        </div>
                                    }

                                </SelectContent>
                            </Select>

                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="loc"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Location
                            </label>
                            <Select value={`${location?.id}`}

                                disabled={isNotEditMode()}

                                onValueChange={(value) => {
                                    const name = allLocations?.find(type => `${type.id}` === value)?.name;
                                    updateNestedSpecificEvent('location', { id: parseInt(value), locationApprovalStatus: 'approved', name })
                                }}>


                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                </SelectTrigger>

                                <SelectContent>
                                    {allLocations?.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                    })}
                                    {
                                        <div className="flex flex-row items-center relative space-x-2">

                                            <Input id="name" type="text" placeholder="Event"
                                                value={localLocationName}
                                                disabled={isNotEditMode()}
                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                onChange={(e) => { setLocalLocationName(e.target.value) }} />

                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('locations', { id: -allLocations.length, name: localLocationName })} />
                                        </div>
                                    }

                                </SelectContent>
                            </Select>
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
                                    {allCategories?.map((category, idx) => {
                                        return <SelectItem key={idx} value={`${category?.id}`}>{category?.name}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="startDate"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Date
                            </label>
                            <GeneralDatePicker
                                date={eventStartDate ? new Date(eventStartDate) : new Date(Date.now())}
                                onDateSelect={(selectedDate: Date) => updateDirectSpecificEvent({ eventStartDate: formatDateToYYYYMMDD(selectedDate.toString()) })}
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                End Date
                            </label>
                            <GeneralDatePicker
                                date={eventEndDate ? new Date(eventEndDate) : new Date(Date.now())}
                                onDateSelect={(selectedDate: Date) => updateDirectSpecificEvent({ eventEndDate: formatDateToYYYYMMDD(selectedDate.toString()) })}
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Time
                            </label>
                            <Input id="title" type="text" placeholder="Title"
                                value={eventTime} disabled={isNotEditMode()}
                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                onChange={(e) => { updateDirectSpecificEvent({ eventTime: e.target.value }) }}
                            />
                        </div>




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
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Artists
                            </label>
                            <Popover>
                                <PopoverTrigger onClick={() => console.log(1)}>

                                    <div className={`px-3 w-full text-sm py-2 items-center flex flex-row justify-between ${isNotEditMode() ? 'border-0 text-gray-400' : 'border border-1 rounded-md'}`}>
                                        <div>{artists?.length}</div>

                                        <div className={`${isNotEditMode() ? 'hidden' : 'block'}`}>

                                            <Pencil1Icon />

                                        </div>
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent className='flex flex-col space-y-1'>
                                    {artists?.map((el, idx) => {
                                        return (<div key={idx} className="flex flex-col space-y-1">
                                            <Select value={`${el?.id}`}

                                                disabled={isNotEditMode()}

                                                onValueChange={(value) => {
                                                    const name = allArtists?.find(type => `${type.id}` === value)?.name;
                                                    updateArraySpecificEvent(idx, 'artists', { id: parseInt(value), artistApprovalStatus: 'approved', name })
                                                }}>


                                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {allArtists?.map((type, idx) => {
                                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                                    })}
                                                    {
                                                        <div className="flex flex-row items-center relative space-x-2">

                                                            <Input id="name" type="text" placeholder="Event"
                                                                value={localLocationName}
                                                                disabled={isNotEditMode()}
                                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                                onChange={(e) => { setLocalLocationName(e.target.value) }} />

                                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('artists', { id: -allArtists.length, name: localArtisName })} />
                                                        </div>
                                                    }

                                                </SelectContent>
                                            </Select>
                                        </div>)
                                    })}
                                    {artists.length === 0 &&
                                        // <div className="flex flex-col space-y-1">

                                        <Select value={`${artists[0]?.id}`}

                                            disabled={isNotEditMode()}

                                            onValueChange={(value) => {
                                                const name = allArtists?.find(type => `${type.id}` === value)?.name;
                                                updateArraySpecificEvent(0, 'artists', { id: parseInt(value), artistApprovalStatus: 'approved', name })
                                            }}>


                                            <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {allArtists?.map((type, idx) => {
                                                    return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                                })}
                                                {
                                                    <div className="flex flex-row items-center relative space-x-2">

                                                        <Input id="name" type="text" placeholder="Event"
                                                            value={localLocationName}
                                                            disabled={isNotEditMode()}
                                                            className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                            onChange={(e) => { setLocalLocationName(e.target.value) }} />

                                                        <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('artists', { id: -allArtists.length, name: localArtisName })} />
                                                    </div>
                                                }

                                            </SelectContent>
                                        </Select>
                                        // </div>
                                    }

                                </PopoverContent>
                            </Popover>

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

                                <SelectContent>
                                    {eventTypeDropDownData?.map((type, idx) => {
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
                                Game Type
                            </label>
                            <Select value={`${gameType}`}
                                disabled={isNotEditMode()}
                                onValueChange={(value) => updateDirectSpecificEvent({ gameType: value as GameTypeEnum })}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
                                </SelectTrigger>

                                <SelectContent >
                                    {gameTypeDropDownData?.map((type, idx) => {
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

                            <Select value={`${gameName?.id}`}

                                disabled={isNotEditMode()}


                                onValueChange={(value) => {
                                    const name = allGameNames.find(type => `${type.id}` === value)?.name;
                                    updateNestedSpecificEvent('gameName', { id: parseInt(value), gameNameApprovalStatus: 'approved', name })
                                }}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                </SelectTrigger>

                                <SelectContent>
                                    {allGameNames?.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                    })}
                                    {
                                        <div className="flex flex-row items-center relative space-x-2">

                                            <Input id="name" type="text" placeholder="Game"
                                                value={localGameName}
                                                disabled={isNotEditMode()}
                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                onChange={(e) => { setLocalGameName(e.target.value) }} />

                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('gameNames', { id: -allGameNames.length, name: localGameName })} />
                                        </div>
                                    }

                                </SelectContent>
                            </Select>

                        </div>




                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs text-gray-600 pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Team
                            </label>

                            <Select value={`${team?.id}`}

                                disabled={isNotEditMode()}

                                onValueChange={(value) => {
                                    const name = allTeamNames.find(type => `${type.id}` === value)?.name;
                                    updateNestedSpecificEvent('team', { id: parseInt(value), teamApprovalStatus: 'approved', name })
                                }}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                </SelectTrigger>

                                <SelectContent>
                                    {allTeamNames?.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                    })}
                                    {
                                        <div className="flex flex-row items-center relative space-x-2">

                                            <Input id="name" type="text" placeholder="Event"
                                                value={localTeam}
                                                disabled={isNotEditMode()}
                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                onChange={(e) => { setLocalTeam(e.target.value) }} />

                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('teamNames', { id: -allTeamNames.length, name: localTeam })} />
                                        </div>
                                    }

                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="title"
                                className="text-xs pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                2nd Team
                            </label>
                            <Select value={`${secondTeam?.id}`}

                                disabled={isNotEditMode()}
                                // onValueChange={(value) => updateNestedSpecificEvent('secondTeam', { id: parseInt(value), secondTeamApprovalStatus: 'approved' })}>

                                onValueChange={(value) => {
                                    const name = allTeamNames.find(type => `${type.id}` === value)?.name;
                                    updateNestedSpecificEvent('secondTeam', { id: parseInt(value), secondTeamApprovalStatus: 'approved', name })
                                }}>

                                <SelectTrigger className={`${isNotEditMode() ? 'border-0' : ''}`}>
                                    <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select name" />
                                </SelectTrigger>

                                <SelectContent>
                                    {allTeamNames?.map((type, idx) => {
                                        return <SelectItem key={idx} value={`${type?.id}`}>{type?.name}</SelectItem>
                                    })}
                                    {
                                        <div className="flex flex-row items-center relative space-x-2">

                                            <Input id="name" type="text" placeholder="Event"
                                                value={secondLocalTeam}
                                                disabled={isNotEditMode()}
                                                className={`${isNotEditMode() ? 'border-0' : ''}`}
                                                onChange={(e) => { setSecondLocalTeam(e.target.value) }} />

                                            <CheckCircledIcon color='green' className='cursor-pointer' onClick={() => addSingleValueToDropDown('teamNames', { id: -allTeamNames.length, name: secondLocalTeam })} />
                                        </div>
                                    }

                                </SelectContent>
                            </Select>

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