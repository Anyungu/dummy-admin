"use client"

import React, { useState } from "react"
import { CaretSortIcon, DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useHomePageStore } from "@/store/homepage.store"

type Props = {
    position: number
}

export function NestedCatgoryCollapsibe({ position }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const { categoryTabs } = useHomePageStore()
    const currentCategory = categoryTabs?.[position]

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col ml-6 space-y-2 bg-gray-200 py-2 px-2"
        >
            <div className="flex items-center cursor-pointer">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center">
                        <DragHandleDots2Icon />
                        {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                        <div className="text-sm">
                            {currentCategory?.title}
                        </div>
                    </div>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-6">

                <div className="flex flex-col bg-gray-100 py-5 pl-5 pr-16 space-y-4">
                    <div className="flex items-center">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Active
                        </label>
                        <Checkbox id="terms" checked={currentCategory?.active} />

                    </div>
                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Title
                        </label>
                        <Input id="title" type="text" placeholder="Title" value={currentCategory?.title} />
                    </div>

                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Link
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Input className="bg-white w-full cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuItem className="w-full">GitHub</DropdownMenuItem>
                                <DropdownMenuItem className="w-full">Support</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center">
                        <label
                            htmlFor="limit"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Limit
                        </label>
                        <Input id="limit" type="number" placeholder="20" />
                    </div>

                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
