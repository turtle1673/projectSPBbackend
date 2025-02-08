"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine } from "react-icons/ri";

function Navbar() {
    const { user, isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]); // Ensure it logs when the path changes

    return (
        <div className='flex items-center justify-between px-4 py-2 drop-shadow-lg text-white relative border-b border-white'>
            {/* Mobile Menu Button */}
            <button 
                className="text-2xl md:hidden p-2" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <RiMenuLine />
            </button>

            {/* Navigation Links */}
            <ul className={`absolute md:static  md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-br-md transition-all duration-300 flex flex-col md:flex-row font-medium tracking-wide gap-4
                ${isOpen ? "flex z-10 left-0 top-full  md:bg-transparent md:w-auto" : "hidden md:flex"}`}
            >
              <li><Link href="/" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">หน้าแรก</Link></li>
              <li><Link href="/sugarlevels" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">คำนวณระดับน้ำตาล</Link></li>
              <li><Link href="/sugarlevels" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">หน้า3</Link></li>
            </ul>

            {/* Authentication Button (Login/Sign In) */}
            <div className="hidden md:block">
                {isSignedIn ? <UserButton /> : <Link href={"/sign-in"}><button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button></Link>}
            </div>

            {/* Mobile Login Button */}
            <div className="md:hidden">
                {isSignedIn ? <UserButton /> : <Link href={"/sign-in"}><button className="bg-blue-500 text-black px-4 py-2 rounded-lg">Login</button></Link>}
            </div>
        </div>
    );
}

export default Navbar;
