"use server"

export async function calHeartRate(age:number){
    return 220-age;
}

export async function calSugar(blood_value:number){
    let sugarResult = ''
    if(blood_value<70 || blood_value == 0){
      sugarResult = 'คุณมีระดับน้ำตาลน้อยกว่าปกติ'
  }else if(blood_value>=70 && blood_value<=100){
      sugarResult = 'ปกติ'
  }else if(blood_value>100 && blood_value<=125){
      sugarResult = 'มีความเสี่ยง'
  }else{
    sugarResult = 'มีความเสี่ยงสูง'
  }

  return sugarResult
  }