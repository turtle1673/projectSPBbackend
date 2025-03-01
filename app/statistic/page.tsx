"use client"

import { createClient } from '@/utils/supabase/client'
import React, { useState, useEffect } from 'react'
import { calAvg } from '../actions'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface IBloodSugar {
  id: number
  blood_value: number
  created_at: string
  blood_result: string
}

type dateOption = "short" | "long" | "numeric" | "2-digit" | "narrow"


export const formatDateThai =(dateString: string | Date, option:dateOption) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: option,
      year: "numeric",
    }).format(date);
  };

export default function Page() {
  const [bloodsugars, setBloodsugars] = useState<IBloodSugar[]>([])
  const [average, setAverage] = useState<number | null>(null)
  const [minblood, setMinblood] = useState<number | null>(null)
  const [maxblood, setMaxblood] = useState<number | null>(null)
  const [limit, setLimit] = useState<number>(30)
  const supabase = createClient()

  const fetchBloodsugars = async (limit: number) => {
    let { data, error } = await supabase
      .from('blood_sugar')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.log(error)
      setBloodsugars([])
    }
    if (data) {
      setBloodsugars(data.reverse())
      const bloodValues = data.map((e: IBloodSugar) => Number(e.blood_value))
      setAverage(await calAvg(bloodValues))
      setMinblood(Math.min(...bloodValues))
      setMaxblood(Math.max(...bloodValues))
    }
  }

  useEffect(() => {
    fetchBloodsugars(limit)
  }, [limit])

  const data = {
    labels: bloodsugars.map((e) => formatDateThai(e.created_at, 'narrow')),
    datasets: [
      {
        label: 'Blood Sugar Level',
        data: bloodsugars.map((sugar) => sugar.blood_value),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(2, 159, 64, 0.2)',
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Blood Sugar Levels Over Time',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 159, 64, 0.2)'
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 159, 64, 0.2)'
        },
      },
    },
  }

  return (
    <div className="flex flex-col items-center bg-white p-4 h-screen mali-bold-italic">
      <div className="flex w-full h-[75vh] gap-6 border-4 items-center justify-around border-amber-500 rounded-xl bg-amber-100 p-4">
        <div className='w-4/6'>
        <Line className='w-full h-full' data={data} options={options} />
        </div>
        <div className='flex flex-col bg-[#B1C29E] rounded-lg gap-4 w-2/6 h-full p-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>แถวทั้งหมด</p>
            <p className='text-center bg-[#659287] rounded-lg py-4 text-orange-100 text-lg'>{bloodsugars.length}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>ค่าเฉลี่ยน้ำตาลในเลือด</p>
            <p className='text-center bg-[#659287] rounded-lg py-4 text-orange-100 text-lg'>{average ? average : 'Loading...'} mg/dL</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>ค่าน้ำตาลต่ำสุด</p>
            <p className='text-center bg-[#659287] rounded-lg py-4 text-orange-100 text-lg'>{minblood ? minblood : 'Loading...'} mg/dL</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>ค่าน้ำตาลสูงสุด</p>
            <p className='text-center bg-[#659287] rounded-lg py-4 text-orange-100 text-lg'>{maxblood ? maxblood : 'Loading...'} mg/dL</p>
          </div>

        </div>
      </div>

      <div className='flex gap-4 flex-wrap border-amber-400 bg-yellow-100 p-4 rounded-lg my-4'> 
        <p className='text-orange-500'>น้อยกว่า 70 ขาดน้ำตาล</p>
        <p className='text-teal-500'>70~100 ปรกติ</p>
        <p className='text-orange-500'>100~125 เสี่ยง</p>
        <p className='text-red-500'>มากกว่า 125 เสี่ยงสูง</p>
      </div>

      <div className="flex gap-4">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="p-4 outline-2 outline-offset-2 outline-amber-600 border-2 border-amber-500 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition-colors duration-300 cursor-pointer"
        >
          <option value="30">30 rows</option>
          <option value="3">3 rows</option>
          <option value="7">7 rows</option>
          <option value="14">14 rows</option>
        </select>
      </div>
    </div>
  )
}