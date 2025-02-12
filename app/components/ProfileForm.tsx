'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { format } from 'date-fns';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [supabaseClient, setSupabaseClient] = useState(null);

    useEffect(() => {
        const loadClient = async () => {
            const client = createClient();
            setSupabaseClient(client);
        };

        loadClient();
    }, []);

    useEffect(() => {
        if (!supabaseClient) return;

        const checkSession = async () => {
            // ใช้ onAuthStateChange เพื่อรับเซสชันปัจจุบัน
            const { data: session, error: sessionError } = await supabaseClient.auth.getSession();
            
            if (sessionError || !session?.user) {
                setError("User not authenticated.");
                console.log("No active session", sessionError);
                setLoading(false);
                return;
            }

            const user = session.user;
            console.log("User ID:", user.id); // ตรวจสอบว่าได้ ID ของผู้ใช้หรือไม่

            // ดึงข้อมูลของผู้ใช้จากตาราง "users" โดยใช้ user.id
            const { data, error } = await supabaseClient
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) {
                setError(`Error fetching user data: ${error?.message || error}`);
                console.error("Error fetching user:", error);
            } else {
                setUser(data); // เก็บข้อมูลผู้ใช้ใน state
            }

            setLoading(false); // อัปเดตสถานะ loading
        };

        checkSession();
    }, [supabaseClient]);

    if (loading) {
        return (
            <section className="text-white flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
                <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="text-white flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
                <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                    <p className="text-red-500">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="text-white flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                {user ? (
                    <>
                        <h2 className="mt-4 text-2xl font-bold">{user.email}</h2>
                        <p className="text-gray-400">User ID: {user.id}</p>
                        <p className="text-gray-300">
                            Created At: {user.created_at ? format(new Date(user.created_at), 'PPPppp') : 'N/A'}
                        </p>
                        <p className="text-gray-300">Age: {user.age ?? "N/A"}</p>
                    </>
                ) : (
                    <p className="text-gray-400">User data not found.</p>
                )}
            </div>
        </section>
    );
}
