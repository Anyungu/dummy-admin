'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { patch } from '@/lib/axios.util'
import { cn } from '@/lib/utils'
import { useSpecificEventStore } from '@/store/specific-event.store'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

function SaveEventButton() {

    const [updating, setUpdating] = useState<boolean>(false)
    const specificEventStore = useSpecificEventStore()

    let artistsNames: string[] = []
    let artistsIds: number[] = []

    specificEventStore.artists.forEach((val, idx) => {
        if (val.id < 1) {
            artistsNames.push(val.name)
        } else {
            artistsIds.push(val.id)
        }
    })


    const data = {
        eventType: specificEventStore?.eventType,
        gameType: specificEventStore?.gameType,
        eventStartDate: specificEventStore?.eventStartDate,
        eventEndDate: specificEventStore?.eventEndDate,
        ...(specificEventStore?.location?.id !== undefined && specificEventStore?.location?.id > 0 ? { locationId: specificEventStore?.location?.id } : {}),
        ...(specificEventStore?.location?.id === undefined || specificEventStore?.location?.id < 0 ? { locationName: specificEventStore?.location?.name } : {}),
        eventTime: specificEventStore?.eventTime,
        categoriesId: specificEventStore?.categories[0]?.id,
        subcategoriesId: specificEventStore?.subcategories[0]?.id,
        ...(specificEventStore?.team?.id !== undefined && specificEventStore?.team?.id > 0 ? { teamId: specificEventStore?.team?.id } : {}),
        ...(specificEventStore?.team?.id === undefined || specificEventStore?.team?.id < 0 ? { teamName: specificEventStore?.team?.name } : {}),
        ...(specificEventStore?.secondTeam?.id !== undefined && specificEventStore?.secondTeam?.id > 0 ? { secondTeamId: specificEventStore?.secondTeam?.id } : {}),
        ...(specificEventStore?.secondTeam?.id === undefined || specificEventStore?.secondTeam?.id < 0 ? { secondTeamName: specificEventStore?.secondTeam?.name } : {}),
        artistsIds,
        artistsNames,
        eventImageUrl: specificEventStore?.eventImageUrl,
        ...(specificEventStore?.gameName?.id !== undefined && specificEventStore?.gameName?.id > 0 ? { gameNameId: specificEventStore?.gameName?.id } : {}),
        ...(specificEventStore?.gameName?.id === undefined || specificEventStore?.gameName?.id < 0 ? { gameNameName: specificEventStore?.gameName?.name } : {}),
        ...(specificEventStore?.eventName?.id !== undefined && specificEventStore?.eventName?.id > 0 ? { eventNameId: specificEventStore?.eventName?.id } : {}),
        ...(specificEventStore?.eventName?.id === undefined || specificEventStore?.eventName?.id < 0 ? { eventNameName: specificEventStore?.eventName?.name } : {}),
    }

    //TOD: check data

    return (
        <Button className='px-4 py-2 bg-green-500 space-x-2'
            onClick={() => {
                setUpdating(true)
                patch(`events/${specificEventStore?.id}`, {
                    ...data
                }, { id: specificEventStore?.id })
                    .then(() => {
                        setUpdating(false)
                        toast({
                            className: cn(
                                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-300'
                            ),
                            variant: 'default',
                            title: 'Success',
                            description: 'Homepage configured successfully',
                        })
                    })
                    .catch(() => {
                        setUpdating(false)
                        toast({
                            className: cn(
                                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-300'
                            ),
                            variant: 'default',
                            title: 'Uh oh! Something went wrong.',
                            description: 'There was a problem with your request.',
                        })
                    })
            }}
            disabled={updating || specificEventStore?.isNotEditMode()}
        >
            <div>
                Save changes
            </div>
            {updating && <Loader2Icon className="animate-spin" />}
        </Button>

    )
}
export default SaveEventButton