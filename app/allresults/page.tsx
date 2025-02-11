'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import BloodCart from '../components/BloodCart'

function page() {
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
        <div className=''>
            {bloodsugars.map(bloodsugar => (
            <BloodCart key={bloodsugar.id} bloodsugar={bloodsugar}/>
                
            ))}
        </div>
    )}
    </>
  )
}

export default page
