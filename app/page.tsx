"use client"
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {user} = useUser();
    

  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    const form = e.target
    
    const { data, error } = await supabase
    .from('users_TestTable')
    .insert([
      { user_name:username,
        user_email:email,
        password:password,
        createdBy:user?.primaryEmailAddress?.emailAddress
      },
    ])
    .select()

    if(!data){
      console.log("error can't submit this form :(")
    }else{
      console.log("submit successfully!!! ", data)
      form.reset()
    }
    if(error){
      console.log("error!! : ",error)
    }
    console.log("User name : ", username)
    console.log("Email : ", email)
    console.log("Password : ", password)
  }
  return (

    <>
      <div className="justify-self-center">
        <form onSubmit={handleSubmit} className="bg-slate-400 p-4 flex flex-col">
          <input onChange={e => setUsername(e.target.value)} type="text" placeholder="user name"/>
          <input onChange={e => setEmail(e.target.value)} type="text" placeholder="email"/>
          <input onChange={e => setPassword(e.target.value)} type="text" placeholder="password"/>
          <button type="submit" className="bg-blue-600 text-white p-2">submit</button>
        </form>
      </div>
    </>
  );
}
