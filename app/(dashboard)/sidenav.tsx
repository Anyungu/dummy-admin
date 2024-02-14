'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CalendarIcon, CopyIcon, HomeIcon, IdCardIcon, PersonIcon, TokensIcon, TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';


const IS_ACTIVE = `flex transition-colors duration-300 ease-in-out text-black items-center px-5 py-3 space-x-2 hover:bg-primaryGreen bg-primaryGreen cursor-pointer w-full`
const IS_NOT_ACTIVE = `flex transition-colors duration-300 ease-in-out text-white items-center px-5 py-3 space-x-2 hover:bg-primaryGreen hover:text-black cursor-pointer w-full`
function Sidenav() {
  const pathName = usePathname();
  const [pageDown, setPageDown] = useState<boolean>(false)
  const isActive = (path: string) => pathName == path;

  return (
    <div className="tabs:w-64 bg-primaryDark text-white flex flex-col font-semibold py-16">
      <div onClick={(e) => { e.preventDefault(); setPageDown(prevState => !prevState) }} className={isActive('/pages/homepage') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center space-x-2'>
            <CopyIcon />
            <div className='hidden tabs:block'>Pages</div>
          </div>
          <div>
            {pageDown ? <TriangleUpIcon /> : <TriangleDownIcon />}
          </div>
        </div>
      </div>
      {pageDown && <Link href="/pages/homepage" className={`pl-10 ${isActive('/pages/homepage') ? IS_ACTIVE : IS_NOT_ACTIVE}`}>
        <div className='flex flex-row items-center space-x-2'>
          <HomeIcon />
          <div className='hidden tabs:block'> Homepage </div>
        </div>
      </Link>}
      {pageDown && <Link href="/pages/categories" className={`pl-10 ${isActive('/pages/categories') ? IS_ACTIVE : IS_NOT_ACTIVE}`}>
        <div className='flex flex-row items-center space-x-2'>
          <TokensIcon />
          <div className='hidden tabs:block'> Categories </div>
        </div>
      </Link>}
      <Link href="/events" className={isActive('/events') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <div className='flex flex-row items-center space-x-2'>
          <CalendarIcon />
          <div className='hidden tabs:block'> Events</div>
        </div>
      </Link>
      <Link href="/tickets" className={isActive('/tickets') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <div className='flex flex-row items-center space-x-2'>
          <IdCardIcon />
          <div className='hidden tabs:block'>Tickets</div>
        </div>
      </Link>
      <Link href="/users" className={isActive('/users') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <div className='flex flex-row items-center space-x-2'>
          <PersonIcon />
          <div className='hidden tabs:block'>Users</div>
        </div>
      </Link>
    </div>
  );
}

export default Sidenav;
