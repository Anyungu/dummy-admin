"use client"

import React, { useState } from "react"
import { CaretSortIcon, Cross2Icon, DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"

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
import { useHomePageStore } from "@/store/homepage.store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategoryStore } from "@/store/categories.store"

type Props = {
    position: number
}

export function NestedCatgoryCollapsibe({ position }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const { categoryTabs, updateCategoryTabs, deleteCategoryTab } = useHomePageStore()
    const { categories } = useCategoryStore()
    const currentCategory = categoryTabs?.[position]

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col ml-6 space-y-2 bg-gray-200 py-2 px-2 rounded-sm"
        >
            <div className="flex items-center cursor-pointer justify-between w-full pr-4">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center">
                        <DragHandleDots2Icon />
                        {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                        <div className="text-sm">
                            {currentCategory?.title}
                        </div>
                    </div>
                </CollapsibleTrigger>
                <Cross2Icon color="red" onClick={() => { deleteCategoryTab(position) }} />
            </div>

            <CollapsibleContent className="space-y-6">

                <div className="flex flex-col bg-gray-100 py-5 pl-5 pr-16 space-y-4 rounded-md">
                    <div className="flex items-center">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Active
                        </label>
                        <Checkbox id="terms" checked={currentCategory?.active} onCheckedChange={(val) => updateCategoryTabs(position, { active: val })} />

                    </div>
                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Title
                        </label>
                        <Input id="title" type="text" placeholder="Title" value={currentCategory?.title} onChange={(e) => updateCategoryTabs(position, { title: e.target.value })} />
                    </div>

                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Link
                        </label>
                        <Select value={`${currentCategory?.categoryId}`} onValueChange={(value) => updateCategoryTabs(position, { categoryId: parseInt(value) })}>

                            <SelectTrigger>
                                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category, idx) => {
                                    return <SelectItem key={idx} value={`${category?.id}`}>{category?.name}</SelectItem>
                                })}

                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
