"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RiMenuLine } from "react-icons/ri";

    const path = usePathname();

    useEffect(() => {
    </div>

  {/* Mobile Menu Button */}
  <button
    className="text-2xl md:hidden p-2 absolute right-14"  
    onClick={() => setIsOpen(!isOpen)}
  >
    <RiMenuLine />
  </button>

  <div className="w-full">
    {/* Navigation Links */}
    <ul
      className={`absolute md:static md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-br-md transition-all duration-300 flex flex-col md:flex-row font-medium tracking-wide gap-4
        ${isOpen ? "flex z-10 right-0 top-full md:bg-transparent md:w-auto" : "hidden md:flex justify-center space-x-6"}`}
    >
      <li><Link href="/" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">หน้าแรก</Link></li>
      <li><Link href="/sugarlevels" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">คำนวณระดับน้ำตาล</Link></li>
      <li><Link href="/page3" className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300">หน้า 3</Link></li>
    </ul>
  </div>

  {/* Authentication Button (Login/Sign In) */}
  <div className="hidden md:block absolute right-4 top-1.5">
    {isSignedIn ? <UserButton /> : <Link href={"/sign-in"}><button className="bg-blue-500 text-white px-4 rounded-lg h-7">Login</button></Link>}
  </div>

  {/* Mobile Login Button */}
  <div className="md:hidden absolute right-4 top-1.5">
    {isSignedIn ? <UserButton /> : <Link href={"/sign-in"}><button className="bg-blue-500 text-white px-4 rounded-lg h-7">Login</button></Link>}
  </div>
</div>

    );
}
