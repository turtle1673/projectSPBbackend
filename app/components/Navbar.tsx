"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { logout } from "../logout/actions";



 function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const path = usePathname();

//   // ซ่อน Navbar ถ้าอยู่ที่หน้า login
//   if (path === "/login") return null;

  return (
    <div>

    </div>
//     <div className="bg-gray-300/20 flex items-center justify-between px-4 py-2 drop-shadow-lg text-white relative border-b border-white">
//       {/* ปุ่มเมนู (มือถือ) */}
//       <button
//         className="text-2xl md:hidden p-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <RiMenuLine />
//       </button>

//       {/* ชื่อเว็บไซต์ (ซ้ายสุด) */}
//       <div className="font-bold">
//         <Link href="/">Mysite</Link>
//       </div>

//       {/* เมนู (มุมซ้าย) */}
//       <div className="flex-1 flex md:justify-center">
//         <ul
//           className={`absolute md:static md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-br-md transition-all duration-300 flex flex-col md:flex-row font-medium tracking-wide gap-4 ${
//             isOpen
//               ? "flex z-10 left-0 top-full w-full md:bg-transparent md:w-auto items-start text-left "
//               : "hidden md:flex"
//           }`}
//         >
//           <li>
//             <Link
//               href="/"
//               className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300"
//             >
//               หน้าแรก
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/sugarlevels"
//               className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300"
//             >
//               คำนวณระดับน้ำตาล
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/page3"
//               className="block md:inline hover:border-b-2 hover:border-white font-bold transition-all duration-300"
//             >
//               หน้า 3
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Profile (ขวาสุด) */}
//       <div className="relative">
//         <button
//           className="font-bold"
//           onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle profile menu
//         >
//           Profile
//         </button>

//         {isProfileOpen && (
//           <div className="absolute right-0 mt-6 w-40 bg-gray-300/20 text-white rounded-lg shadow-lg">
//             <ul>
//               <li>
//                   <main className="">
//                    <form action={logout}>
//                      <button className="pr-[92px] border block px-4 py-2 hover:border rounded-lg" type="submit">
//                        Logout
//                     </button>
//                 </form>
//             </main>
                
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
   );
 }

export default Navbar;
