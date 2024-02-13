'use client';

import { ReactNode, createContext, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type Props = {
    accessToken: string | undefined,
    children: ReactNode
}

function AuthProvider({ accessToken, children }: Props) {
    const supabase = createClientComponentClient();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== accessToken) {
                router.refresh();
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase, router]);

    return children;
}

export default AuthProvider