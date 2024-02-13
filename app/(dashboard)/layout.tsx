import { Toaster } from "@/components/ui/toaster"
import Sidenav from "./sidenav"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthProvider from "./components/AuthProvider";


export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex h-screen">
      <Sidenav />
      <div className="flex-1 bg-gray-100 h-screen overflow-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">

        <AuthProvider accessToken={session?.access_token}>{children}</AuthProvider>
      </div>
      <Toaster />
    </div>
  )
}