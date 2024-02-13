"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
    id: string
    eventStatus: string
}

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "eventStatus",
        header: "Status",
    },
    {
        header: "Title",
        accessorKey: "eventName.name"
    },
    {
        header: "Date",
        accessorKey: "eventStartDate"
    },

]
