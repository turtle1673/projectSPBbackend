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
      <div className="flex justify-center items-center min-h-screen ">
  <form onSubmit={handleSubmit} className="border-2 border-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6">
    <h2 className="text-2xl font-semibold text-center text-white">Create an Account</h2>
    <div className="space-y-4">
      <input 
        onChange={e => setUsername(e.target.value)} 
        type="text" 
        placeholder="Username" 
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        onChange={e => setEmail(e.target.value)} 
        type="text" 
        placeholder="Email" 
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        onChange={e => setPassword(e.target.value)} 
        type="password" 
        placeholder="Password" 
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold">
      Submit
    </button>
  </form>
</div>

    </>
  );
}
