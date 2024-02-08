import React from 'react'
import { EventCollapsible } from './components/EventCollapsible'
import { get } from '@/lib/axios.util'
import { useHomePageStore } from '@/store/homepage.store'
import Title from './Title'
import ClientStoreInitializer from '@/components/ClientStoreInitializer'
import { CategoryCollapsible } from './components/CategoryCollapisble'
import ApplyChangesButton from './components/ApplyChangesButton'



async function page() {

  //fatch and set state
  const data = await get('admin/home-page-config')
  useHomePageStore.setState(data)
  // console.log(data)

  return (
    <div className='my-6 mx-2 space-y-6'>
      <ClientStoreInitializer {...data} />
      <Title title='Homepage' />
      <CategoryCollapsible />
      {
        data?.sectionEvents.map((event: any, idx: number) => {
          return <EventCollapsible key={idx} position={idx} />
        })
      }
      <div className='flex flex-col w-full items-end'>
      <ApplyChangesButton />
      </div>
      

    </div>
  )
}

export default page