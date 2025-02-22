'use client'
import { createClient } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

export default function EditBloodData() {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const update_status = useFormStatus()
  const supabase = createClient()
  const [bloodValue, setBloodValue] = useState('')
  const [potd, setPotd] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from('blood_sugar')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setBloodValue(data.blood_value || '')
        setPotd(data.potd || '')
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bloodValue) {
      setFormError('จำเป็นต้องใส่ข้อมูลตัวเลข')
      return
    }

    const numValue = parseFloat(bloodValue)
    if (!numValue || numValue <= 0) {
      setFormError('ข้อมูลต้องเป็นตัวเลขที่มากกว่า 0')
      setBloodValue('')
      return
    }

    const res = await fetch('/api/calSugar', {
      method: 'POST',
      body: JSON.stringify({ value: numValue }),
      headers: { 'Content-Type': 'application/json' },
    })

    const calculateResult = await res.json()
    setFormError('')

    const { error } = await supabase
      .from('blood_sugar')
      .update({ blood_value: bloodValue, potd: potd, blood_result: calculateResult.resul })
      .eq('id', id)

    if (error) {
      console.error(error)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <div className="flex flex-col gap-6 bg-white w-full max-w-2xl m-8 p-6 rounded-lg shadow-lg border-2 border-yellow-400">
        <div className="rounded-t-lg h-[15vh] bg-yellow-300 flex justify-center items-center">
          <p className="text-6xl font-semibold text-yellow-800 mali-bold">Update your data</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <span className="font-medium text-yellow-800">Blood Value:</span>
            <input
              type="text"
              className="p-2 border-2 border-yellow-300 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={bloodValue}
              onChange={(e) => setBloodValue(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium text-yellow-800">Part of the day:</span>
            <select
              value={potd}
              onChange={(e) => setPotd(e.target.value)}
              className="p-2 border-2 border-yellow-300 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="none">--none--</option>
              <option value="เช้า">เช้า</option>
              <option value="กลางวัน">กลางวัน</option>
              <option value="เย็น">เย็น</option>
            </select>
          </label>
          {formError && <p className="text-red-500 px-4 py-2 bg-red-100 rounded">{formError}</p>}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300 mali-semibold"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}