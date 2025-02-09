'use client'

import { useState } from "react";

export default function SugarlevelsForm() {
    const [sugarLevel, setSugarLevel] = useState("");
    const [note, setNote] = useState("");

    const calculateSugarLevel = () => {
        if (sugarLevel.trim() === "" || isNaN(Number(sugarLevel)) || Number(sugarLevel) < 0) {
            setNote("❌ โปรดใส่ค่าที่ถูกต้อง (ตัวเลขบวกเท่านั้น)");
            return;
        }

        const level = Number(sugarLevel);
        if (level <= 69) {
            setNote('คุณอยู่ในภาวะน้ำตาลในเลือดต่ำ\n\n🔹 คำแนะนำ:\n- ควรกินอาหารที่มีคาร์โบไฮเดรตค่อยๆ ดูดซึม เช่น ขนมปังขาว หรือแครกเกอร์ เพื่อให้ระดับน้ำตาลในเลือดกลับสู่สภาวะปกติ');
        } else if (level >= 70 && level <= 100) {
            setNote('คุณอยู่ในภาวะปกติ\n\n✅ ควรรักษาระดับนี้โดย:\n- รับประทานอาหารที่มีประโยชน์\n- ออกกำลังกายอย่างสม่ำเสมอ\n- หลีกเลี่ยงอาหารที่มีน้ำตาลสูงและแป้งขัดสี\n- ตรวจสุขภาพเป็นประจำ');
        } else if (level > 100 && level <= 125) {
            setNote('คุณมีภาวะความเสี่ยง หรือเรียกว่า เบาหวานแฝง\n\n⚠ คำแนะนำ:\n- ควบคุมอาหาร ลดของหวาน แป้งขัดสี และอาหารที่มีดัชนีน้ำตาลสูง\n- เพิ่มการออกกำลังกาย เช่น เดินเร็ว 30 นาที/วัน 5 วัน/สัปดาห์\n- ลดน้ำหนัก (หากมีภาวะน้ำหนักเกิน)\n- หมั่นตรวจระดับน้ำตาลในเลือดเป็นระยะ');
        } else if (level >= 126) {
            setNote('คุณมีความเสี่ยงเป็นโรคเบาหวาน\n\n❗ คำแนะนำ:\n- ควรไปพบแพทย์เพื่อตรวจยืนยันและรับคำแนะนำ\n- ปรับพฤติกรรมการกิน หลีกเลี่ยงน้ำตาลและไขมันทรานส์\n- ออกกำลังกายอย่างสม่ำเสมอ และลดน้ำหนักถ้าจำเป็น\n- อาจต้องใช้ยาในกรณีที่แพทย์เห็นสมควร\n- ควบคุมระดับน้ำตาลอย่างเคร่งครัดเพื่อป้องกันภาวะแทรกซ้อน');
        } else {
            setNote("❌ โปรดใส่ค่าที่ถูกต้อง");
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="bg-gray-300/20 text-black text-center w-full sm:w-[600px] md:w-[700px] lg:w-[800px] h-auto rounded-lg shadow-lg flex border-2 border-white">
                {/* กล่องซ้าย */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex flex-col gap-3 w-[80%]">
                        <div className="bg-700 text-white text-sm sm:text-base md:text-xl lg:text-2xl rounded-sm flex items-center justify-center border-2 border-white">
                            คำนวณระดับน้ำตาลในเลือด
                        </div>
                        <input 
                            type="text" 
                            placeholder="ระดับน้ำตาลในเลือด" 
                            value={sugarLevel}
                            onChange={(e) => setSugarLevel(e.target.value)}
                            className="bg-white text-black text-sm sm:text-base md:text-lg lg:text-xl rounded-sm flex items-center justify-center border-2 border-white text-center outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div 
                            className="bg-white text-sm sm:text-base md:text-lg lg:text-xl rounded-sm flex items-center justify-center border-2 border-white cursor-pointer hover:bg-blue-700 hover:text-white"
                            onClick={calculateSugarLevel}
                        >
                            คำนวณ
                        </div>
                    </div>
                </div>
                
                {/* กล่องขวา */}
                <div className="flex-1 flex items-center justify-start">
                    <div className="flex flex-col gap-10 w-[95%]">
                        <div className="flex flex-col">    
                            <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mr-[250px]">NOTE</div>
                            <div className="border-2 border-white rounded-lg h-[200px] p-2 flex items-start overflow-y-auto">
                                <div className="text-white font-bold text-left whitespace-pre-line w-full">
                                    {note}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center gap-8 sm:gap-16 items-center h-[50px]">
                            <div 
                                className="bg-white text-sm sm:text-base md:text-lg lg:text-xl rounded-lg border border-white w-[30%] sm:w-[25%] cursor-pointer hover:bg-red-600 hover:text-white"
                                onClick={() => { setSugarLevel(""); setNote(""); }}
                            >
                                Clear
                            </div>
                            <div className="bg-white text-sm sm:text-base md:text-lg lg:text-xl rounded-lg w-[30%] sm:w-[25%] border border-white cursor-pointer hover:bg-green-600 hover:text-white">
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
