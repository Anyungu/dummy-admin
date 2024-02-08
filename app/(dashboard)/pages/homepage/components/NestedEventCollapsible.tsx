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

type Props = {
  position: number
}

export function NestedEventCollapsible({ position }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { sectionEvents, updateSectionEventField } = useHomePageStore()
  const currentEvent = sectionEvents?.[position]

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col ml-6 space-y-2 bg-gray-200 py-2 px-2"
    >
      <div className="flex items-center cursor-pointer w-full justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex items-center">
            <DragHandleDots2Icon />
            {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
            <div className="font-bold text-l">
              {currentEvent?.title}
            </div>
          </div>

        </CollapsibleTrigger>
        <Cross2Icon color="red" />
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
        <div className="flex flex-col bg-gray-100 py-5 pl-5 pr-16 space-y-4">
          <div className="flex items-center">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Active
            </label>
            <Checkbox id="terms" checked={currentEvent?.active} onCheckedChange={(val) => updateSectionEventField(position, { active: val })} />

          </div>
          <div className="flex items-center">
            <label
              htmlFor="title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Title
            </label>
            <Input id="title" type="text" placeholder="Title" value={currentEvent?.title} onChange={(e) => updateSectionEventField(position, { title: e.target.value })} />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Link
            </label>
            <Select value={`${currentEvent?.categoryId}`} onValueChange={(value) => updateSectionEventField(position, { categoryId: parseInt(value) })}>

              <SelectTrigger>
                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="order"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Order By
            </label>
            <Select value={currentEvent?.orderBy} onValueChange={(value) => updateSectionEventField(position, { orderBy: value })}>

              <SelectTrigger>
                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select " />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="limit"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Limit
            </label>
            <Input id="limit" type="number" placeholder="20" value={currentEvent?.limit} onChange={(e) => updateSectionEventField(position, { limit: parseInt(e.target.value) })} />
          </div>

        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
