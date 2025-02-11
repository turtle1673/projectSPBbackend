import React from 'react'

export default function BloodCart(bloodf) {
  return (
    <div className="flex flex-col text-white bg-red-500 border-2 border-green-500 gap-4 justify-center p-4">
      <div>ระดับน้ำตาล: {bloodf.blood_value}</div>
      <div>ผลลัพธ์: {bloodf.blood_result}</div>
    </div>
  );
}
