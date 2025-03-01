"use server"

export async function calSugar(blood_value: number) {
    let blood_result = '';

    // เช็คระดับน้ำตาลและคำนวณผลลัพธ์
    if (blood_value <= 69) {
        blood_result = 'ระดับน้ำตาลต่ำ';
    } else if (blood_value >= 70 && blood_value <= 100) {
        blood_result = 'ระดับปกติ';
    } else if (blood_value > 100 && blood_value <= 125) {
        blood_result = 'ภาวะเสี่ยงเบาหวาน';
    } else {
        blood_result = 'มีความเสี่ยงสูง';
    } 

    return blood_result;
}



export async function calAvg(arr: number[]) : Promise<number>{
    let sum = 0
    arr.forEach((e) => {
        sum += e
    })
    return parseFloat((sum / arr.length).toFixed(2))
}

type dateOption = "short" | "long" | "numeric" | "2-digit" | "narrow"
export const formatDateThai = async (dateString: string | Date, option:dateOption) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: option,
      year: "numeric",
    }).format(date);
  };