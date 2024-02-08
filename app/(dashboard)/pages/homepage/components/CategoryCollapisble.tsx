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
import { useHomePageStore } from "@/store/homepage.store"
import { NestedCatgoryCollapsibe } from "./NestedCategoryCollapsible"
import { DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons"
import { PlusIcon } from "lucide-react"



export function CategoryCollapsible() {
  const [isOpen, setIsOpen] = useState(false)
  const { categoryTabs, addNewCategoryTab } = useHomePageStore()


  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col ml-6 space-y-2 bg-gray-200 py-2 px-2"
    >
      <div className="flex items-center cursor-pointer">

        <div className="flex w-full justify-between pr-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center">
              <DragHandleDots2Icon />
              {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
              <div className="font-bold text-l">
                Categories
              </div>
            </div>
          </CollapsibleTrigger>
          <PlusIcon width={24} height={24} color='green' onClick={() => { addNewCategoryTab() }} />
        </div>

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
