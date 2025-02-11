import React from "react";

interface BloodCartProps {
  bloodsu: {
    blood_value: string;
    blood_result: string;
  };
}

export default function BloodCart({ bloodsu }: BloodCartProps) {
  return (
    <div className="flex flex-col text-white bg-red-500 border-2 border-green-500 gap-4 justify-center p-4">
      <div>ระดับน้ำตาล: {bloodsu.blood_value}</div>
      <div>ผลการประเมิน: {bloodsu.blood_result}</div>
    </div>
  );
}
