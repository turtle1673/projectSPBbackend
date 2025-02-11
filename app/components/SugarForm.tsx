"use client"

import { use, useState } from 'react'
import { calSugar } from '../actions'
import { createClient } from '@/utils/supabase/client'


interface calSugarInterface { //ลองใช้ interface
    resul:string
}

export default function SugarForm() {
    const [blood,setBlood] = useState('')
    const [result,setResult] = useState('')
    const [errorform,setErrorform] = useState('')

    const calhandler = async (e:any) => {
        e.preventDefault()

        if(!blood){
            setErrorform('จำเป็นต้องใส่ข้อมูลตัวเลข')
            setResult('')
            return
        }

        const numValue = parseFloat(blood);
        if (!numValue || numValue <= 0) {
            setErrorform("ข้อมูลต้องเป็นตัวเลขที่มากกว่า 0");
            setBlood('')
            return;
         }

         const res = await fetch("/api/calSugar", {
            method: "POST",
            body: JSON.stringify({ value: numValue }),
            headers: { "Content-Type": "application/json" },
          })
      
        const data:calSugarInterface = await res.json();
        setResult(data.resul);
        setErrorform('')
    }

    const savehandler = async (e:any) => {
      e.preventDefault()
      const supabase = createClient()
      const { data, error } = await supabase
      .from('blood_sugar')
      .insert([
        { blood_value: blood, blood_result: result },
      ])
      .select()
        
      if(error){
        console.log('Some error happend ', error)
      }

      setResult('')
      setBlood('')
    }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-16 w-full">
        <div className="h-[15vh] w-full bg-amber-400 text-center flex items-center justify-center"><p className="text-5xl font-sans font-bold text-white">Blood Sugar Calculator</p></div>
        <div className="w-2/3 border-2 border-amber-200 rounded-lg p-12 flex flex-col gap-12 drop-shadow-xl">
          <form className="flex flex-col gap-4">
            <input onChange={e => setBlood(e.target.value)} type="text" placeholder="blood sugar value" className="mx-20 p-4 outline-2 outline-offset-2 outline-amber-600 border-2 border-amber-500 rounded-lg"/>
            <div className='flex gap-32 justify-center'>
            <button onClick={calhandler} className="disabled:bg-amber-200 transition-all disabled:text-stone-500 uppercase py-4 px-32 bg-amber-400 rounded-lg font-semibold text-stone-600 mali-bold">calculate</button>
            <button onClick={savehandler} disabled={!blood || !result} className="disabled:bg-amber-200 transition-all disabled:text-stone-500 uppercase py-4 px-32 bg-amber-400 rounded-lg font-semibold text-stone-600 mali-bold">save</button>
            </div>
          </form>
          {
            errorform && (<div className="bg-red-500 p-2 text-lg text-white w-fit rounded-lg mali-medium-italic">{errorform}</div>)
          }
        </div>
        {
         result && (<p className="text-6xl font-serif text-emerald-500 mali-bold-italic">{result}</p>)
        }
      </div>
    </div>
  )
}