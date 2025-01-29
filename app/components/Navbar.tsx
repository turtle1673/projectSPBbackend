"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Navbar() {

    const {user,isSignedIn} = useUser();

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    },[])

  return (
    <div className='flex items-start justify-between px-4 py-2 drop-shadow-lg bg-black text-white '>
    <div className='flex font-medium tracking-wide gap-4'>
      <div>nav 1</div>
      <div>nav 2</div>
      <div>nav 3</div>
    </div>

    { isSignedIn? <UserButton /> : <Link href={"/sign-in"}><button>Login</button></Link> }
    </div>
  )
}

export default Navbar
