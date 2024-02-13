import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignIn from './components/SignIn';


async function page() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/pages/homepage');
    }

    return <SignIn />;
}

export default page