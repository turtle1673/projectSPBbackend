'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import BloodCart from '../components/BloodCard'

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
            {bloodsugars.map(e => (
            <BloodCart key={e.id} bloodsu={e}/>
            ))}
        </div>
    )}
    </>
  )
}

export default page
