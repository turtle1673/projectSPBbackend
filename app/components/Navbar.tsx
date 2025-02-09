"use client"

// import { UserButton, useUser } from '@clerk/nextjs'
import { AllowlistIdentifier, User } from '@clerk/nextjs/dist/types/server';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Navbar() {

    // const {user,isSignedIn} = useUser();

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    },[])

  return (
    <div className='grid grid-cols-3 bg-black text-white p-4'>
      <div className='col-span-1'></div>
    <div className='col-span-1 flex font-medium tracking-wide gap-4 justify-between text-xl'>
      {/* {
        isSignedIn? 
        <><Link href={'/sugarcalculator'}>calculator</Link><Link href={'/'}>results</Link><Link href={'/userinformation'}>user Info</Link></> : <div></div>
      } */}
      
    </div>
    <div className='col-span-1 flex justify-end '>
    {/* { isSignedIn? <UserButton/> : <Link href={"/sign-in"}><button>Login</button></Link> } */}
    </div>
    </div>
  )
}

