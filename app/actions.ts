"use server"

export async function calHeartRate(age:number){
    return 220-age;
}

export async function calSugar(value:number){
    let sugarResult = ''
    if(value<70 || value == 0){
      sugarResult = 'คุณมีระดับน้ำตาลน้อยกว่าปกติ'
  }else if(value>=70 && value<=100){
      sugarResult = 'ปกติ'
  }else if(value>100 && value<=125){
      sugarResult = 'มีความเสี่ยง'
  }else{
    sugarResult = 'มีความเสี่ยงสูง'
  }

  return sugarResult
  }