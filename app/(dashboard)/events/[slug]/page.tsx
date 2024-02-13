import { get } from '@/lib/axios.util';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image';

export const revalidate = 0

type Props = {
    params: {
        slug: string
    }
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

    const eventNow = await get(`events/${params?.slug}`, { id: params?.slug })


    return (
        <div className='mx-4 my-6'>
            <div className='flex flex-row w-full'>
                <Image
                    className='rounded-xl'
                    src={eventNow?.eventImageUrl}
                    width={200}
                    height={200}
                    alt="Picture of the author"
                />
                <div className='flex flex-col items-center justify-center w-full font-bold text-xl'>
                    {eventNow?.eventName?.name}
                </div>
            </div>

        </div>
    );

}

export default page