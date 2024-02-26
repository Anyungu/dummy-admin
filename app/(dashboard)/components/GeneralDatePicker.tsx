"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn, formatDateToYYYYMMDD } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSpecificEventStore } from "@/store/specific-event.store"

type Props = {
    onDateSelect: Function
    date: Date
}

function GeneralDatePicker({ onDateSelect, date }: Props) {
    const {
        isNotEditMode,
    } = useSpecificEventStore();

    console.log(date)

    return (
        <Popover>
            <PopoverTrigger disabled={isNotEditMode()} asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        `w-full justify-start text-left font-normal ${isNotEditMode() ? 'border-0' : ''}`,
                        !date && "text-muted-foreground"
                    )}
                    disabled={isNotEditMode()}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date ?? Date.now()}
                    onSelect={(e) => onDateSelect(e)}
                    initialFocus
                    disabled={isNotEditMode()}
                />
            </PopoverContent>
        </Popover>
    )
}

export default GeneralDatePicker