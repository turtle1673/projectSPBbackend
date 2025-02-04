"use server"

export async function calHeartRate(age:number){
    return 220-age;
}

export async function calSugar(sugarValue:number){
    let sugarResult = ''

    if(sugarValue<70){
        sugarResult = 'คุณมีระดับน้ำตาลน้อยกว่าปกติ'
    }else if(sugarValue>=70 && sugarValue<100){
        sugarResult = 'ปกติ'
    }else if(sugarValue>=100 && sugarValue<125){
        sugarResult = 'มีความเสี่ยง'
    }else{
        sugarResult = 'มีความเสี่ยงสูง'
    }

    return sugarResult
}