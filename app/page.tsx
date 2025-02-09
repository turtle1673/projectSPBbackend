"use client"

// import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  

  // const {user,isSignedIn} = useUser();
  
  // useEffect(() => {
  //   if (isSignedIn) {
  //     router.push("/sugarcalculator");
  //   }
  // }, [isSignedIn, router]);

  const [bloodvalue,setBloodvalue] = useState('')
  const [result,setResult] = useState('')
  const [errorform,setErrorform] = useState('')

  function calSugar(value:number){
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


  const handlerSubmit = (e:any) => {
    e.preventDefault()

    if(!bloodvalue){
      setErrorform('จำเป็นต้องใส่ข้อมูลตัวเลขระดับน้ำตาลของคุณ')
      setResult('')
      return
    }
    const numValue = parseFloat(bloodvalue)
    if(!numValue){
      setErrorform('ข้อมูลต้องเป็นตัวเลขจำนวนเต็มบวก')
      setResult('')
      return
    }

    setResult(calSugar(numValue))
    setErrorform('')
    setErrorform('')
  }

  return (

    <>

    </>
  );
}
