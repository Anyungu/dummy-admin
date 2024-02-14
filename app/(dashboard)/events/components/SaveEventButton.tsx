'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

function SaveEventButton() {

    const [updating, setUpdating] = useState<boolean>(false)

    return (
        <Button className='px-4 py-2 bg-green-500 space-x-2'
            onClick={() => {
                setUpdating(true)
                // patch('admin/home-page', {
                //     banner, categoryTabs, sectionEvents, strip, footer
                // })
                //     .then(() => {
                //         setUpdating(false)
                //         toast({
                //             className: cn(
                //                 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-300'
                //             ),
                //             variant: 'default',
                //             title: 'Success',
                //             description: 'Homepage configured successfully',
                //         })
                //     })
                //     .catch(() => {
                //         setUpdating(false)
                //         toast({
                //             className: cn(
                //                 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-300'
                //             ),
                //             variant: 'default',
                //             title: 'Uh oh! Something went wrong.',
                //             description: 'There was a problem with your request.',
                //         })
                //     })
            }}
            disabled={updating}
        >
            <div>
                Save changes
            </div>
            {updating && <Loader2Icon className="animate-spin" />}
        </Button>

    )
}
export default SaveEventButton