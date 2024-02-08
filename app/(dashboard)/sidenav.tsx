'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

function Sidenav() {
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path;

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col font-semibold px-5 py-16 space-y-4">
      <div className={isActive('/pages/homepage') ? 'text-blue-500' : ''}>
        <Link href="/pages/homepage">Pages</Link>
      </div>
      <div className={isActive('/pages/homepage') ? 'text-blue-500 ml-4' : 'ml-4'}>
        <Link href="/pages/homepage">Homepage</Link>
      </div>
      <div className={isActive('/pages/categories') ? 'text-blue-500 ml-4' : 'ml-4'}>
        <Link href="/pages/categories">Categories</Link>
      </div>
      <div className={isActive('/events') ? 'text-blue-500' : ''}>
        <Link href="/events">Events</Link>
      </div>
      <div className={isActive('/tickets') ? 'text-blue-500' : ''}>
        <Link href="/tickets">Tickets</Link>
      </div>
    </div>
  );
}

export default Sidenav;
