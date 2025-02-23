'use client'

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SugarlevelsForm() {
    const [blood, setBlood] = useState('');
    const [note, setNote] = useState('');
    const [result, setResult] = useState('');
    const [errorform, setErrorform] = useState('');
    const router = useRouter();
    const supabase = createClient();

    interface CalSugarInterface {
        resul: string;
    }

    const calhandler = async (e: any) => {
        e.preventDefault();

        if (!blood) {
            setErrorform('กรุณาใส่ตัวเลขระดับน้ำตาลในเลือด');
            setResult('');
            setNote('');
            return;
        }

        const blood_value = parseFloat(blood);
        if (!blood_value || blood_value <= 0) {
            setErrorform('กรุณาใส่ค่าที่มากกว่า 0');
            setBlood('');
            setNote('');
            return;
        }

        // ส่ง request ไปยัง API calSugar เพื่อนำผลลัพธ์
        const res = await fetch("/api/calSugar", {
            method: "POST",
            body: JSON.stringify({ value: blood_value }),
            headers: { "Content-Type": "application/json" },
        });

        const calculateResult: CalSugarInterface = await res.json();
        setResult(calculateResult.resul);
        setErrorform('');

        // ตรวจสอบค่าระดับน้ำตาล
        if (blood_value <= 69) {
            setNote('⚠ คุณอยู่ในภาวะน้ำตาลต่ำ\n\n👉 กินอาหารที่มีคาร์โบไฮเดรต เช่น ขนมปัง หรือ แครกเกอร์');
        } else if (blood_value >= 70 && blood_value <= 100) {
            setNote('✅ คุณอยู่ในระดับปกติ\n\n💡 ควรรับประทานอาหารที่มีประโยชน์และออกกำลังกาย');
        } else if (blood_value > 100 && blood_value <= 125) {
            setNote('⚠ คุณมีภาวะเสี่ยงเบาหวาน\n\n💡 ลดของหวาน ออกกำลังกาย และตรวจน้ำตาลเป็นระยะ');
        } else {
            setNote('❗ คุณมีความเสี่ยงเป็นเบาหวาน\n\n🚑 ควรพบแพทย์และปรับพฤติกรรมการกิน');
        }
    };

    const savehandler = async (e: any) => {
        e.preventDefault();
        const { error } = await supabase
            .from('blood_sugar')
            .insert([{ blood_value: blood, blood_result: result }]);

        if (error) {
            console.log('เกิดข้อผิดพลาด: ', error);
        }
        setResult('');
        setBlood('');
        setNote('');
        router.push('/');
    };

    return (
        <section className="flex items-center justify-center min-h-screen px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-gray-900 text-center w-[600px] rounded-xl shadow-xl flex border-4 border-white p-6"
            >
                <div className="flex-1 flex flex-col gap-4 items-center">
                    <h2 className="text-xl font-bold text-black">คำนวณระดับน้ำตาลในเลือด</h2>
                    <input 
                        onChange={e => setBlood(e.target.value)} 
                        type="text" 
                        placeholder="กรอกระดับน้ำตาล" 
                        className="bg-gray-100 text-gray-900 rounded-md border border-gray-300 text-center p-3 outline-none focus:ring-2 focus:ring-blue-500 w-[80%]"
                    />
                    <button 
                        onClick={calhandler} 
                        className="bg-blue-500 text-white rounded-md p-3 w-[80%] hover:bg-blue-700 transition-all"
                    >
                        คำนวณ
                    </button>
                    <div className="text-red-500 font-semibold">{errorform}</div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-black ">ผลลัพธ์</h2>
                    <div className="border-2 border-gray-300 rounded-lg h-[200px] p-3 overflow-y-auto bg-gray-100">
                        {note}
                    </div>
                    <button 
                        onClick={savehandler} 
                        disabled={!blood || !result} 
                        className="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                        บันทึก
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
