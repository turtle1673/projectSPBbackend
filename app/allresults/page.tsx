import { createClient } from '@/utils/supabase/server'


export default async function editBloodData({params} : {params : {id:number}}) {
  const dataID = params.id
  const supabase = await createClient()
  let { data, error } = await supabase
  .from('blood_sugar')
  .select('*')
  .eq('id',dataID)
    if(error){
        console.log(error)
    }
  console.log(data)
  return (
    <>
    <div className='flex flex-col gap-6 bg-white h-4/6 m-24 p-4 rounded-lg border-2 border-red-500'>
      <div className='rounded-t-lg h-[15vh] bg-amber-300 flex justify-center items-center'>
        <p className='text-6xl font-semibold text-green-500'>now you in page of data {dataID}</p>
      </div>
      <div className=''>
        <p>{}</p>
      </div>
    </div>
    </>

  )
}