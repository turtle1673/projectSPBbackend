import Link from "next/link";
import React from "react";

interface BloodCartProps {
  bloodsu: {
    id:number
    blood_value: string
    blood_result: string
    heart_rate:number
    created_at:Date
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

export default function BloodCart({ bloodsu }: BloodCartProps) {
  return (
    <div className="col-span-1 text-white bg-stone-500 border-2 border-green-500 rounded-xl">
      
      <div className="flex flex-col gap-4 m-2 h-max">
      <p>{bloodsu.created_at ? formatDateThai(bloodsu.created_at) : "N/A"}</p>
      <div className="flex gap-6">
        <div>ระดับน้ำตาล: {bloodsu.blood_value}</div>
        <div>อัตราการเต้นของหัวใจ: {bloodsu.heart_rate}</div>
      </div>
      <div className="text-xl">ผลการประเมิน: {bloodsu.blood_result}</div>
      <div className="flex justify-end">
        <Link href={`/allresults/${bloodsu.id}`} className="bg-blue-500 py-1 px-3 rounded-sm">edit</Link>
      </div>
      </div>
      
    </div>
  );
}
