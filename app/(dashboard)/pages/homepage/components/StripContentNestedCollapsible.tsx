'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { useHomePageStore } from '@/store/homepage.store'
import { Cross2Icon, DragHandleDots2Icon, TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

type Props = {
    position: number
}

function StripContentNestedCollapsible({ position }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const { strip, deleteStripContent, updateStripContentField } = useHomePageStore()
    const currentStrip = strip?.[position]

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
                            {`Strip item no. ${position + 1}`}
                        </div>
                    </div>
                </CollapsibleTrigger>
                <Cross2Icon color="red" onClick={() => { deleteStripContent(position) }} />
            </div>

            <CollapsibleContent className="space-y-6">

                <div className="flex flex-col bg-gray-100 py-5 pl-5 pr-16 space-y-4 rounded-md">

                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Question
                        </label>
                        <Input id="title" type="text" placeholder="Question" value={currentStrip?.question} onChange={(e) => updateStripContentField(position, { question: e.target.value })} />
                    </div>


                    <div className="flex items-center">
                        <label
                            htmlFor="ans"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-24"
                        >
                            Answer
                        </label>
                        <Input id="ans" type="text" placeholder="Answer" value={currentStrip?.answer} onChange={(e) => updateStripContentField(position, { answer: e.target.value })} />
                    </div>




                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default StripContentNestedCollapsible