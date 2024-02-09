'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useHomePageStore } from '@/store/homepage.store'
import { DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { RadioGroup } from '@radix-ui/react-radio-group'
import React, { useState } from 'react'

function BannerCollapsible() {
    const [isOpen, setIsOpen] = useState(false)
    const { banner, updateBanner } = useHomePageStore()


    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col ml-6 space-y-2 bg-gray-200 py-4 px-2 pr-4 rounded-md"
        >
            <div className="flex items-center cursor-pointer">
                <CollapsibleTrigger asChild>
                    <div className="flex items-center">
                        <DragHandleDots2Icon />
                        {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                        <div className="font-bold text-l">
                            Banner
                        </div>
                    </div>
                </CollapsibleTrigger>

            </div>

            <CollapsibleContent className="space-y-6">
                <RadioGroup defaultValue="banner">
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
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="banner" id="r2" />
                            <Label htmlFor="r3">Banner</Label>
                        </div>
                    </div>

                </RadioGroup>

                <div className="flex flex-col bg-gray-100 py-5 pl-5 pr-16 space-y-4 rounded-md">
                    <div className="flex items-center">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Active
                        </label>
                        <Checkbox id="terms" checked={banner?.show} onCheckedChange={(val) => updateBanner({ show: val })} />

                    </div>

                    <div className="flex items-center">
                        <label
                            htmlFor="catShow"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            categories
                        </label>
                        <Checkbox id="catShow" checked={banner?.categoryTabsShow} onCheckedChange={(val) => updateBanner({ categoryTabsShow: val })} />

                    </div>


                </div>



            </CollapsibleContent>
        </Collapsible>
    )
}

export default BannerCollapsible