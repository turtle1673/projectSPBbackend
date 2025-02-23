import React, { useState, useEffect } from "react";

interface BloodCartProps {
  bloodsu: {
    blood_value: number;
    blood_result: string;
    heart_rate: number;
    created_at: Date;
  };
}

const formatDateThai = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const calSugar = (blood_value: number) => {
  let blood_result = "";

  if (blood_value <= 69) {
    blood_result = '⚠ คุณอยู่ในภาวะน้ำตาลต่ำ\n\n👉 กินอาหารที่มีคาร์โบไฮเดรต เช่น ขนมปัง หรือ แครกเกอร์';
  } else if (blood_value >= 70 && blood_value <= 100) {
    blood_result = '✅ คุณอยู่ในระดับปกติ\n\n💡 ควรรับประทานอาหารที่มีประโยชน์และออกกำลังกาย';
  } else if (blood_value > 100 && blood_value <= 125) {
    blood_result = '⚠ คุณมีภาวะเสี่ยงเบาหวาน\n\n💡 ลดของหวาน ออกกำลังกาย และตรวจน้ำตาลเป็นระยะ';
  } else {
    blood_result = '❗ คุณมีความเสี่ยงเป็นเบาหวาน\n\n🚑 ควรพบแพทย์และปรับพฤติกรรมการกิน';
  }

  return blood_result;
};

export default function BloodCart({ bloodsu }: BloodCartProps) {
  const [sugarInfo, setSugarInfo] = useState<string>("");

  useEffect(() => {
    const result = calSugar(bloodsu.blood_value);
    setSugarInfo(result);
  }, [bloodsu.blood_value]);
  

  return (
    <div className="col-span-1 text-white bg-stone-500 border-2 border-green-500 rounded-xl p-4">
      <p className="text-center text-lg font-semibold">
        {bloodsu.created_at ? formatDateThai(bloodsu.created_at) : "N/A"}
      </p>
      <div className="flex justify-between items-center mt-2">
        <div>ระดับน้ำตาล: {bloodsu.blood_value}</div>
        <div>อัตราการเต้นของหัวใจ: {bloodsu.heart_rate}</div>
      </div>
      <div className="text-xl mt-2">ผลการประเมิน: {bloodsu.blood_result}</div>
      <div className="text-sm mt-2">{sugarInfo}</div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 py-1 px-3 rounded-sm">edit</button>
      </div>
    </div>
  );
}
