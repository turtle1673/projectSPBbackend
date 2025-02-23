'use client'

import { logout } from "../logout/actions";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";



const navElements = [
    { title: 'หน้าหลัก', href: '/', icon: <AiFillHome className='w-6 h-6' /> },
    { title: 'โปรไฟล์', href: '/profile', icon: <FaUser className='w-6 h-6' /> },
    { title: 'วัดระดับน้ำตาล', href: '/sugarcalculator', icon: <MdBloodtype className='w-6 h-6' /> },
    { title: 'ตั้งค่า', href: '/settings', icon: <IoSettingsSharp className='w-6 h-6' /> },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

    if (pathname === "/login") return null;

    return (
        <div className={`h-screen bg-amber-500  text-white flex flex-col  ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-xl`}>            
            <div className="relative flex items-center justify-between h-20  px-4">
                {!isCollapsed && <h1 className="text-xl font-bold">คำนวณน้ำตาล</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='text-white focus:outline-none'
                >
                    {isCollapsed ? (
                        <RxHamburgerMenu size={24} className="text-xl absolute mx-2 mt-[-10px] text-white focus:outline-none" />
                    ) : (
                        <FiChevronLeft size={30} />
                    )}
                </button>
            </div>

            <nav className='flex-1 flex flex-col items-start pt-6'>
                {navElements.map(({ title, href, icon }) => (
                    <Link href={href} key={title} className='w-full'>
                        <div className={`flex items-center justify-start py-4 px-6 rounded-md transition duration-300 hover:bg-gray-800 ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
                            {icon}
                            {!isCollapsed && <span className='text-sm'>{title}</span>}
                        </div>
                    </Link>
                ))}
            </nav>

            <div className='mb-10 px-4'>           
                <form action={logout}>
                    <button
                        type="submit"
                        className="flex items-center justify-center py-3 w-full rounded-md transition duration-300 bg-red-600 hover:bg-red-700"
                    >
                        <TbLogout2 className='w-6 h-6' />
                        {!isCollapsed && <span className='ml-3 text-bold'>ออกจากระบบ</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
