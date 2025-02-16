"use server"

export async function calSugar(blood_parameter:number){
    let sugarResult = ''
    if(blood_parameter<70 || blood_parameter == 0){
      sugarResult = 'คุณมีระดับน้ำตาลน้อยกว่าปกติ'
  }else if(blood_parameter>=70 && blood_parameter<=100){
      sugarResult = 'ปกติ'
  }else if(blood_parameter>100 && blood_parameter<=125){
      sugarResult = 'มีความเสี่ยง'
  }else{
    sugarResult = 'มีความเสี่ยงสูง'
  }

  return sugarResult
  }