"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import BloodCart from "./BloodCard";

const formatDateThai = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bloodsugars, setBloodsugars] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.log("User not logged in");
        setLoading(false);
        return;
      }

      const user = session.user;
      console.log("Authenticated User:", user);

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBloodsugars = async () => {
      let { data, error } = await supabase
        .from("blood_sugar")
        .select("*")
        .eq("user_id", user.id) // กรองให้แสดงเฉพาะของตัวเอง
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        setBloodsugars([]);
      } else {
        setBloodsugars(data);
      }
    };

    fetchBloodsugars();
  }, [user]); // ดึงข้อมูลใหม่เมื่อ user เปลี่ยน

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <section className="text-black flex items-center justify-center mt-10">
      <div className="border border-black bg-yellow-100 p-6 rounded-lg shadow-lg text-center w-[90%]">
        {user ? (
          <>
            <h2 className="text-xl font-semibold">{user.email}</h2>
            <p className="text-black">
              สมัครสมาชิกเมื่อ : {user.created_at ? formatDateThai(user.created_at) : "N/A"}
            </p>
          </>
        ) : (
          <p className="text-red-500">User not found</p>
        )}
        <div className="text-white">
          <div
            className="p-4 h-screen border border-black overflow-auto bg-grey rounded-lg"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/ab/52/03/ab5203ae7914f0798884bdfcf3b97b05.jpg')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              width: "100%",
              height: "100%",
              margin: "0",
              overflow: "hidden",
            }}
          >
            {bloodsugars.length > 0 ? (
              <div className="grid grid-cols-4 gap-6 p-4">
                {bloodsugars.map((e) => (
                  <BloodCart key={e.id} bloodsu={e} />
                ))}
              </div>
            ) : (
              <div className="text-center text-2xl text-black">ไม่มีข้อมูล</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
