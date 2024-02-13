"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
    id: string
    eventStatus: string
}

export const columns: ColumnDef<Event>[] = [
    {
        header: "Event Name",
        accessorKey: "eventName.name"
    },
    {
        accessorKey: "eventStatus",
        header: "Status",
    },
    {
        header: "Date",
        accessorKey: "eventStartDate"
    },
    {
        header: "Location",
        accessorKey: "location.name"
    },
    {
        header: "Tickets",
        accessorKey: "tickets",
        cell: ({ row }) => {
            const current = row?.original as any
            return <div className="text-right font-medium">{current?.tickets?.length}</div>
        },
    }

]
