"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


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
            return <div className="font-medium">{current?.tickets?.length}</div>
        },
    }

]
