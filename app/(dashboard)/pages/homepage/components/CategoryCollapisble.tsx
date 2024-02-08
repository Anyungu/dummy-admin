"use client"

import React, { useState } from "react"

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
import { EventCollapsible } from "./EventCollapsible"
import { NestedCatgoryCollapsibe } from "./NestedCategoryCollapsible"
import { DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"



export function CategoryCollapsible() {
  const [isOpen, setIsOpen] = useState(false)
  const { categoryTabs } = useHomePageStore()


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
            <div className="font-bold text-l">
              Categories
            </div>
          </div>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-6">
        <RadioGroup defaultValue="events">
          <div className="flex space-x-6">
            <div>
              Type
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="categories" id="r1" />
              <Label htmlFor="r1">Categories</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="events" id="r2" />
              <Label htmlFor="r2">Events</Label>
            </div>
          </div>

        </RadioGroup>
        {
          categoryTabs?.map((cat, idx) => {
            return <NestedCatgoryCollapsibe key={idx} position={idx} />
          })
        }


      </CollapsibleContent>
    </Collapsible>
  )
}
