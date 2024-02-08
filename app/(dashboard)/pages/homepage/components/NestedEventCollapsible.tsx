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
enum HomePageEventOrderOptions {
  CREATED_AT = 'createdAt',
  START_DATE = 'startDate',
}

enum SectionEventLayout {
  CAROUSEL = 'carousel',
  HERO_BANNER = 'heroBanner',
  SWIM_LINE = 'swimLine',
}

const eventOrderDropDown = [
  {
    key: 0,
    text: 'Created Date',
    value: 'createdAt'
  },
  {
    key: 1,
    text: 'Start Date',
    value: 'startDate'
  }
]

const layoutDropDown = [
  {
    key: 0,
    text: 'Carousel',
    value: 'carousel'
  },
  {
    key: 1,
    text: 'Hero Banner',
    value: 'heroBanner'
  },
  {
    key: 1,
    text: 'Swim Line',
    value: 'swimLine'
  }

]

export function NestedEventCollapsible({ position }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { sectionEvents, updateSectionEventField } = useHomePageStore()
  const { categories } = useCategoryStore()
  const currentEvent = sectionEvents?.[position]

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col ml-6 space-y-2 bg-gray-200 py-4 pl-2 pr-4"
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
                {categories.map((category, idx) => {
                  return <SelectItem key={idx} value={`${category?.id}`}>{category?.name}</SelectItem>
                })}

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
            <Select value={currentEvent?.orderBy} onValueChange={(value: HomePageEventOrderOptions) => updateSectionEventField(position, { orderBy: value })}>

              <SelectTrigger>
                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select order method" />
              </SelectTrigger>

              <SelectContent>
                {eventOrderDropDown?.map((el, idx) => {
                  return <SelectItem key={idx} value={el?.value}>{el?.text}</SelectItem>
                })}

              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="layout"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
            >
              Layout
            </label>
            <Select value={currentEvent?.layout} onValueChange={(value: SectionEventLayout) => updateSectionEventField(position, { layout: value })}>

              <SelectTrigger>
                <SelectValue className="bg-white w-full cursor-pointer" placeholder="Select " />
              </SelectTrigger>

              <SelectContent>
                {layoutDropDown?.map((el, idx) => {
                  return <SelectItem key={idx} value={el?.value}>{el?.text}</SelectItem>
                })}
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
