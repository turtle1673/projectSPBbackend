'use client'

import { useState } from "react";

export default function SugarlevelsForm() {
    const [sugarLevel, setSugarLevel] = useState("");
    const [note, setNote] = useState("");

    const calculateSugarLevel = () => {
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
            setNote("ERROR โปรดใส่ค่าที่ถูกต้อง"); // ถ้าค่าผิดปกติ ไม่แสดงอะไร
        }
    };

    return (
        <section className="flex items-center justify-center h-screen">
            <div className="text-black text-center w-[800px] h-[500px] bg-[#FFAD60] rounded-lg shadow-lg flex border-2 border-black">
                {/* กล่องซ้าย */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex flex-col gap-3 w-[80%]">
                        <div className="bg-[#8C5B00] text-white text-[25px] rounded-sm flex items-center justify-center border border-black">
                            คำนวณระดับน้ำตาลในเลือด
                        </div>
                        <input 
                            type="number" 
                            placeholder="ระดับน้ำตาลในเลือด" 
                            value={sugarLevel}
                            onChange={(e) => setSugarLevel(e.target.value)}
                            min="0"
                            className="bg-[#FFEEAD] text-black text-[25px] rounded-sm flex items-center justify-center border border-black text-center outline-none"
                        />
                        <div 
                            className="bg-[#FFEEAD] text-black text-[25px] rounded-sm flex items-center justify-center border border-black cursor-pointer hover:bg-[#8C5B00] hover:text-[white]"
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
                            <div className="text-[#FFEEAD] text-[25px] font-bold mr-[250px]">NOTE</div>
                            <div className="border-2 border-[#FFEEAD] rounded-lg bg-[#8C5B00] h-[200px] p-2 flex items-start overflow-y-auto">
                                <div className="text-[#FFEEAD] font-bold text-left whitespace-pre-line w-full">
                                    {note}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center gap-16 items-center h-[50px]">
                            <div 
                                className="bg-[#FFEEAD] text-[25px] rounded-lg border border-black w-[25%] cursor-pointer hover:bg-[#8C5B00] hover:text-[white]"
                                onClick={() => { setSugarLevel(""); setNote(""); }}
                            >
                                Clear
                            </div>
                            <div className="bg-[#FFEEAD] text-[25px] rounded-lg w-[25%] border border-black cursor-pointer hover:bg-[#8C5B00] hover:text-[white]">
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}