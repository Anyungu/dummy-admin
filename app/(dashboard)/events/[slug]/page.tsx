import { get } from '@/lib/axios.util';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatDayAndDateTime } from '@/lib/utils';
import ClientStoreInitializer from '@/components/ClientStoreInitializer';
import SpecificEventForm from '../components/SpecificEventForm';
import EditButton from '../components/EditButton';

export const revalidate = 0

type Props = {
    params: {
        slug: string
    }
}

enum EventStatusEnum {
    ACTIVE = 'פָּעִיל',
    PENDING = 'ממתין ל',
    HIDDEN = 'מוּסתָר',
    ENDED = 'הסתיים',
}

export async function generateStaticParams() {

    const events = await get('admin/events/admin-get-all-events');

    return events.map((event: any) => ({
        slug: `${event.id}`,
    }))
}


async function page({ params }: Props) {

    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    const [eventNow, categories] = await Promise.all([
        get(`events/${params?.slug}`, { id: params?.slug }),
        get('events/categories/all/categories')
    ])


    return (
        <div className='mx-4 my-6 h-[70%]'>
            <ClientStoreInitializer specificEvent={eventNow} category={categories} />
            <div className='flex flex-row w-full justify-between'>
                <div className='flex flex-row'>
                    <Image
                        className='rounded-xl'
                        src={eventNow?.eventImageUrl}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                    />
                    <div className='flex flex-col w-full space-y-2 mt-4 ml-8'>
                        <div className='text-4xl font-extrabold text-gray-600'>
                            {eventNow?.eventName?.name}
                        </div>
                        <div className='text-lg text-gray-700'>
                            {formatDayAndDateTime(eventNow?.eventStartDate, eventNow?.eventTime)}
                        </div>
                        <div>
                            {eventNow?.eventStatus === EventStatusEnum?.ACTIVE && <Badge variant='default' className=' bg-green-400'>{eventNow?.eventStatus}</Badge>}
                            {eventNow?.eventStatus === EventStatusEnum?.PENDING && <Badge variant='default' className=' bg-blue-400'>{eventNow?.eventStatus}</Badge>}
                            {eventNow?.eventStatus === EventStatusEnum?.HIDDEN && <Badge variant='default' className=' bg-gray-400'>{eventNow?.eventStatus}</Badge>}
                            {eventNow?.eventStatus === EventStatusEnum?.ENDED && <Badge variant='default' className=' bg-red-400'>{eventNow?.eventStatus}</Badge>}

                        </div>

                    </div>
                </div>
                <div>
                    <EditButton />
                </div>

            </div>

            <SpecificEventForm />

        </div >
    );

}

export default page