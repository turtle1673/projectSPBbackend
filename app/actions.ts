"use server"

export async function calHeartRate(age:number){
    return 220-age;
}

export async function calSugar(blood_value: number) {
    let blood_result = '';

    // เช็คระดับน้ำตาลและคำนวณผลลัพธ์
    if (blood_value <= 69) {
        blood_result = 'ระดับน้ำตาลต่ำ';
    } else if (blood_value >= 70 && blood_value <= 100) {
        blood_result = 'ระดับปกติ';
    } else if (blood_value > 100 && blood_value <= 125) {
        blood_result = 'เสี่ยงเบาหวาน';
    } else {
        blood_result = 'ความเสี่ยงสูง';
    } 

    return blood_result;
}
