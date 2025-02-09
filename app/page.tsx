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
      <div className="flex flex-col justify-center items-center gap-16 w-full">
        <div className="h-[15vh] w-full bg-amber-400 text-center flex items-center justify-center"><p className="text-5xl font-sans font-bold text-white">Blood Sugar Calculator</p></div>
        <div className="w-2/3 border-2 border-amber-200 rounded-lg p-12 flex flex-col gap-12 drop-shadow-xl">
          <form className="flex flex-col gap-4">
            <input type="text" onChange={e => setBloodvalue(e.target.value)} placeholder="blood sugar value" className="mx-20 p-4 outline-2 outline-offset-2 outline-amber-600 border-2 border-amber-500 rounded-lg"/>
            <button disabled={!bloodvalue} onClick={handlerSubmit} className="disabled:bg-amber-200 transition-all disabled:text-stone-500 uppercase py-4 px-6 bg-amber-400 rounded-lg font-semibold text-stone-600 mali-bold">calculate</button>
          </form>
          {
            errorform && (<div className="bg-red-500 p-2 text-lg text-white w-fit rounded-lg mali-medium-italic">{errorform}</div>)
          }
        </div>
        {
         result && (<p className="text-6xl font-serif text-emerald-500 mali-bold-italic">{result}</p>)
        }
      </div>
    </>
  );
}
