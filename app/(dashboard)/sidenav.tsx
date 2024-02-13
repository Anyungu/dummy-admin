'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@radix-ui/react-icons';

const IS_ACTIVE = `flex transition-colors duration-300 ease-in-out text-black items-center px-5 py-3 space-x-2 hover:bg-primaryGreen bg-primaryGreen cursor-pointer w-full`
const IS_NOT_ACTIVE = `flex transition-colors duration-300 ease-in-out text-white items-center px-5 py-3 space-x-2 hover:bg-primaryGreen hover:text-black cursor-pointer w-full`
function Sidenav() {
  const pathName = usePathname();
  const isActive = (path: string) => pathName == path;

  return (
    <div className="w-64 bg-primaryDark text-white flex flex-col font-semibold py-16">
      <div className={isActive('/pages/homepage') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <HomeIcon />
        <div>Pages</div>
      </div>
      <div className={`pl-10 ${isActive('/pages/homepage') ? IS_ACTIVE : IS_NOT_ACTIVE}`}>
        <Link href="/pages/homepage">Homepage</Link>
      </div>
      <div className={`pl-10 ${isActive('/pages/categories') ? IS_ACTIVE : IS_NOT_ACTIVE}`}>
        <Link href="/pages/categories">Categories</Link>
      </div>
      <div className={isActive('/events') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <Link href="/events">Events</Link>
      </div>
      <div className={isActive('/tickets') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <Link href="/tickets">Tickets</Link>
      </div>
      <div className={isActive('/users') ? IS_ACTIVE : IS_NOT_ACTIVE}>
        <Link href="/users">Users</Link>
      </div>
    </div>
  );
}

export default Sidenav;
