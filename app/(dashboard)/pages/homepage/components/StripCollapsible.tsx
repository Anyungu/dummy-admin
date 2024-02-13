'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useHomePageStore } from '@/store/homepage.store'
import { DragHandleDots2Icon, PlusIcon, TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { NestedCatgoryCollapsibe } from './NestedCategoryCollapsible'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import StripContentNestedCollapsible from './StripContentNestedCollapsible'

function StripCollapsible() {
    const [isOpen, setIsOpen] = useState(false)
    const { strip, addNewStripContent } = useHomePageStore()


    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col ml-6 space-y-2 bg-gray-200 py-4 px-2 pr-4 rounded-md"
        >
            <div className="flex items-center cursor-pointer">

                <div className="flex w-full justify-between pr-4">
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center">
                            <DragHandleDots2Icon />
                            {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                            <div className="font-bold text-l">
                                Strip
                            </div>
                        </div>
                    </CollapsibleTrigger>
                    <PlusIcon width={24} height={24} color='green' onClick={() => { addNewStripContent() }} />
                </div>

            </div>

            <CollapsibleContent className="space-y-6">
                <RadioGroup defaultValue="strip">
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
                            <RadioGroupItem value="strip" id="r2" />
                            <Label htmlFor="r2">Strip</Label>
                        </div>
                    </div>

                </RadioGroup>
                {
                    strip?.map((cat, idx) => {
                        return <StripContentNestedCollapsible key={idx} position={idx} />
                    })
                }


            </CollapsibleContent>
        </Collapsible>
    )
}

export default StripCollapsible