import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { DataTable } from '../events/components/data-table';
import { get } from '@/lib/axios.util';
import { cookies } from 'next/headers'
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

    const data = await get('admin/users/admin-get-all-users');

    return (
        <div className='my-6 mx-4'>
            <DataTable columns={columns} data={data} />

        </div>
    )
}

export default page