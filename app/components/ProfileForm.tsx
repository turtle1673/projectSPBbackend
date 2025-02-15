"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.log("User not logged in", session);
        setLoading(false);
        return;
      }

      const user = session.user;
      console.log("Authenticated User:", user);

      const { data, error } = await supabase
        .from("users")
        .select("email, created_at, role")
        .eq("id", user.id) // ใช้ user ID จากเซสชั่น
        .limit(1);

      if (error) {
        console.error(
          "Error fetching user data:",
          error.message || error.details || error
        );
        setLoading(false);
        return;
      }

      if (data.length === 0) {
        console.log("No user found for the provided ID");
        console.log("User ID from session:", user.id); // เพิ่มบรรทัดนี้เพื่อตรวจสอบค่า id

        setLoading(false);
        return;
      }

      if (data.length > 1) {
        console.error("Multiple rows returned for user id:", user.id);

        setLoading(false);
        return;
      }

      setUser(data[0]);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <section className="text-white flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {user ? (
          <>
            <h2 className="text-xl font-semibold">{user.email}</h2>
            <p className="text-gray-400">{user.role}</p>
          </>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
      </div>
    </section>
  );
}
