"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export type Ticket = {
    id: string
    eventStatus: string
}

export const columns: ColumnDef<Ticket>[] = [
    {
        header: "Event",
        accessorKey: "event.eventName.name"
    },
    {
        header: "Date & Time",
        cell: ({ row }) => {
            const current = row?.original as any
            return <div className="font-medium">{`${current?.event?.eventStartDate}, ${current?.event.eventTime}`}</div>
        },

    },
    {
        header: "Category",
        cell: ({ row }) => {
            const current = row?.original as any
            console.log(current)
            return <div className="font-medium">{`${current?.event?.categories?.length ? current?.event?.categories[0]?.name : 'N/A'}`}</div>
        },

    },
    {
        header: "Quantity",
        accessorKey: "quantity"
    },
    {
        header: "Total Price",
        cell: ({ row }) => {
            const current = row?.original as any
            return <div className="font-medium">{`${current?.price * current?.quantity}`}</div>
        },
    },
    {
        header: "Status",
        accessorKey: "ticketStatus"
    },


]
