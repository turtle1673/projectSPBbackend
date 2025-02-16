'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import BloodCart from "./components/BloodCard";

export default function Settings() {
    const [bloodsugars,setBloodsugars] = useState<any[]>([])
     
    const supabase = createClient()
     useEffect(() => {
         const fetchBloodsugars = async () => {
             let { data, error } = await supabase
             .from('blood_sugar')
             .select('*')
 
             if(error){
                 console.log(error)
                 setBloodsugars([])
             }
             if(data){
                 setBloodsugars(data)
             }
         }
         fetchBloodsugars()
     },[])

     if(bloodsugars.length > 0 ) {
   return (
     <>
     <div className="bg-pink-500 h-screen">
     {bloodsugars && (
         <div className='grid grid-cols-3 gap-6 p-4'>
             {bloodsugars.map(e => (
             <BloodCart key={e.id} bloodsu={e}/>
             ))}
         </div>
     )}
     </div>
     </>
   )}else{
       return (
           <div className='bg-teal-500 flex justify-center items-center h-screen'>
               <h1 className='text-2xl'>ไม่มีข้อมูล</h1>
           </div>
       )
   }
}