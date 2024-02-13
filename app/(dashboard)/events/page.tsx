import { get } from '@/lib/axios.util';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers'
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

export const revalidate = 0

async function page() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login');
    }

    const data = await get('admin/events/admin-get-all-events');

    return (
        <div>
            <DataTable columns={columns} data={data} />

        </div>
    )
}

export default page