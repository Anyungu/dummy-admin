import { get } from '@/lib/axios.util'
import React from 'react'


export const revalidate = 0

type Props = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {

    const users = await get('admin/users/admin-get-all-users');

    return users.map((user: any) => ({
        slug: `${user?.id}`,
    }))
}


function page() {
    return (
        <div>page</div>
    )
}

export default page