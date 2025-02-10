'use client'

import { logout } from "../logout/actions";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineClose, AiOutlineDashboard, AiOutlineMenu, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { TbLogout2 } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";

const navElements = [
    { title: 'Dashboard', href: '/dashboard', icon: <AiOutlineDashboard className='w-6 h-6' /> },
    { title: 'โปรไฟล์', href: '/profile', icon: <AiOutlineUser className='w-6 h-6' /> },
    { title: 'วัดระดับน้ำตาล', href: '/sugarlevels', icon: <MdBloodtype className='w-6 h-6' /> },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    if (pathname === "/login") return null;

    return (
        <div className={`h-screen bg-black text-white flex flex-col border-r border-gray-700 ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-xl`}>            
            <div className="flex items-center justify-between h-20 border-b border-gray-700 px-4">
                {!isCollapsed && <h1 className="text-xl font-semibold">Mysite</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='text-white focus:outline-none mr-3'
                >
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={30} />}
                </button>
            </div>

            <nav className='flex-1 flex flex-col items-center pt-6'>
                {navElements.map(({ title, href, icon }) => (
                    <Link href={href} key={title} className='w-full'>
                        <div className={`flex items-center justify-center py-4 px-6 rounded-md transition duration-300 hover:bg-gray-800 ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
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
                        {!isCollapsed && <span className='ml-3 text-bold'>Logout</span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Sidebar;
