"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export type User = {
    id: string
    eventStatus: string
}

export const columns: ColumnDef<User>[] = [
    {
        header: "First Name",
        accessorKey: "firstName"
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Phone",
        accessorKey: "phoneNumber"
    },
    {
        header: "ID",
        accessorKey: "idNumber"
    },
    {
        header: "Role",
        accessorKey: "role"
    },


]
