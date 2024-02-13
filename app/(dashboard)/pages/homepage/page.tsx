import React from 'react'
import { get } from '@/lib/axios.util'
import { useHomePageStore } from '@/store/homepage.store'
import Title from './Title'
import ClientStoreInitializer from '@/components/ClientStoreInitializer'
import { CategoryCollapsible } from './components/CategoryCollapisble'
import ApplyChangesButton from './components/ApplyChangesButton'
import EventCollapsible from './components/EventCollapsible'
import { useCategoryStore } from '@/store/categories.store'
import BannerCollapsible from './components/BannerCollapsible'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const revalidate = 0


async function page() {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const data = await Promise.all([
    get('admin/home-page-config'),
    get('events/categories/all/categories')
  ])

  //fatch and set state

  useHomePageStore.setState(data[0])
  useCategoryStore.setState(data[1])
  // console.log(data)

  return (
    <div className='my-6 mx-2 space-y-6'>
      <ClientStoreInitializer homePage={data[0]} category={data[1]} />
      <Title title='Homepage' />
      <BannerCollapsible />
      <CategoryCollapsible />
      <EventCollapsible />
      <div className='flex w-full justify-end'>
        <ApplyChangesButton />
      </div>

    </div>
  )
}

export default page