'use client'

import { useEffect, useState } from "react";
import SugarForm from "./components/SugarForm";
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
 
   return (
     <>
     hello
     {bloodsugars && (
         <div className='grid grid-cols-3 gap-6 p-4'>
             {bloodsugars.map(e => (
             <BloodCart key={e.id} bloodsu={e}/>
             ))}
         </div>
     )}
     </>
   )
}