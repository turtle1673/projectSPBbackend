import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) {
    redirect("/login");
  }

  const { data: userRole, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (userError || !userRole) {
    redirect("/error");
  }
  
  if (userRole.role !== "admin") {
    console.log(userRole);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-3xl bg-slate-800 p-6 rounded-md">
          Sorry, you are not authorized to view this page
        </p>
      </div>
    )
  }

  const { data: allUser, error: allUserError } = await supabase
    .from("users")
    .select("*");
    

  if(allUserError){
    console.log(allUserError)
  }
  if(allUser){
    console.log(allUser)
  }
  return (
    <>
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-fuchsia-600 text-5xl">Admin role only</h1>
      <ul>
      {allUser?.map((user) => (
          <li key={user.id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}
