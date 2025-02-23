"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface calSugarInterface {
  resul: string
}

export default function SugarForm() {
  const [blood, setBlood] = useState('')
  const [result, setResult] = useState('')
  const [potd, setPotd] = useState('none')
  const [errorform, setErrorform] = useState('')
  const [note, setNote] = useState('')

  const router = useRouter()
  const supabase = createClient()

  const calhandler = async (e: any) => {
    e.preventDefault()

    if (!blood) {
      setErrorform('จำเป็นต้องใส่ข้อมูลตัวเลข')
      setResult('')
      setNote('')
      return
    }

    const numValue = parseFloat(blood)
    if (!numValue || numValue <= 0) {
      setErrorform('ข้อมูลต้องเป็นตัวเลขที่มากกว่า 0')
      setBlood('')
      setNote('')
      return
    }

    const res = await fetch('/api/calSugar', {
      method: 'POST',
      body: JSON.stringify({ value: numValue }),
      headers: { 'Content-Type': 'application/json' },
    })

    const calculateResult: calSugarInterface = await res.json()
    setResult(calculateResult.resul)
    setErrorform('')

    // ตรวจสอบค่าระดับน้ำตาล
    if (numValue <= 69) {
      setNote('⚠ คุณอยู่ในภาวะน้ำตาลต่ำ\n\n👉 กินอาหารที่มีคาร์โบไฮเดรต เช่น ขนมปัง หรือ แครกเกอร์');
    } else if (numValue >= 70 && numValue <= 100) {
      setNote('✅ คุณอยู่ในระดับปกติ\n\n💡 ควรรับประทานอาหารที่มีประโยชน์และออกกำลังกาย');
    } else if (numValue > 100 && numValue <= 125) {
      setNote('⚠ คุณมีภาวะเสี่ยงเบาหวาน\n\n💡 ลดของหวาน ออกกำลังกาย และตรวจน้ำตาลเป็นระยะ');
    } else {
      setNote('❗ คุณมีความเสี่ยงเป็นเบาหวาน\n\n🚑 ควรพบแพทย์และปรับพฤติกรรมการกิน');
    }
  }

  const savehandler = async (e: any) => {
    e.preventDefault()

    const { error } = await supabase
      .from('blood_sugar')
      .insert([{ blood_value: blood, blood_result: result, potd: potd }])
      .select()

    if (error) {
      console.log('Some error happened ', error)
    }
    setResult('')
    setBlood('')
    setPotd('none')
    setNote('')
    router.push('/')
  }

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col justify-center items-center gap-16 w-full">
        <div className="h-[15vh] w-full bg-amber-400 text-center flex items-center justify-center">
          <p className="text-5xl font-sans font-bold text-white">Blood Sugar Calculator</p>
        </div>
        <div className="w-2/3 border-2 border-amber-200 rounded-lg p-12 flex flex-col gap-12 drop-shadow-xl bg-pink-100 bg-opacity-80">
          <form className="flex flex-col gap-4">
            <input
              onChange={(e) => setBlood(e.target.value)}
              value={blood}
              type="text"
              placeholder="blood sugar value"
              id="b"
              className="mx-20 p-4 outline-2 outline-offset-2 outline-amber-600 border-2 border-amber-500 rounded-lg"
            />
            <select
              value={potd}
              onChange={(e) => setPotd(e.target.value)}
              className="mx-20 p-4 outline-2 outline-offset-2 outline-amber-600 border-2 border-amber-500 rounded-lg bg-white"
            >
              <option value="none">--none--</option>
              <option value="เช้า">เช้า</option>
              <option value="กลางวัน">กลางวัน</option>
              <option value="เย็น">เย็น</option>
            </select>
            <div className="flex gap-32 justify-center">
              <button
                onClick={calhandler}
                className="disabled:bg-amber-200 disabled:text-stone-500 hover:scale-105 transition-all uppercase py-4 px-32 bg-amber-400 rounded-lg font-semibold text-stone-600 mali-bold"
              >
                calculate
              </button>
              <button
                onClick={savehandler}
                disabled={!blood || !result}
                className="disabled:bg-amber-200 disabled:text-stone-500 hover:scale-105 transition-all uppercase py-4 px-32 bg-amber-400 rounded-lg font-semibold text-stone-600 mali-bold"
              >
                save
              </button>
            </div>
          </form>
          {errorform && (
            <div className="bg-red-500 p-2 text-lg text-white w-fit rounded-lg mali-medium-italic">
              {errorform}
            </div>
          )}
        </div>
        {result && (
          <div className="text-center flex flex-col gap-3">
            <p className="text-6xl font-serif text-emerald-500 mali-bold-italic">{result}</p>

            {note && (
              <p className="text-2xl font-serif text-emerald-500 mali-bold-italic ">{note}</p>

            )}
          </div>
        )}
      </div>
    </div>
  )
}
