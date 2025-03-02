import Link from "next/link";
import { createClient } from '@/utils/supabase/client';

interface BloodCartProps {
  bloodsu: {
    id: number;
    blood_value: number;
    blood_result: string;
    created_at: Date;
    potd:string
  };
}

const formatDateThai = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function BloodCart({ bloodsu }: BloodCartProps) {
  const supabase = createClient();

  const handleDelete = async () => {
    const { error } = await supabase
      .from('blood_sugar')
      .delete()
      .eq('id', bloodsu.id);

    if (error) {
      console.error('Error deleting record:', error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="col-span-1 bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col gap-4 m-4 h-full">
        <div className="flex justify-between">
        <p className="text-gray-600 font-medium">{bloodsu.created_at ? formatDateThai(bloodsu.created_at) : "N/A"}</p>
        <p className="text-amber-600 text-xl mali-bold">{bloodsu.potd}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-yellow-700">ระดับน้ำตาล: {bloodsu.blood_value} mg/dL</div>
          <div className="text-xl font-bold text-yellow-800">ผลการประเมิน: {bloodsu.blood_result}</div>
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={`/allresults/${bloodsu.id}`}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300"
          >
            แก้ไข
          </Link>
          <button
            onClick={async () => {
              await handleDelete();
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
}
