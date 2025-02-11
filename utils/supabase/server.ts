import { createServerClient, SupabaseClient } from '@supabase/ssr'
import { cookies, CookieStore } from 'next/headers'

// Define the return type of the createClient function
export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string, // Ensure the URL is a string
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, // Ensure the key is a string
    {
      cookies: {
        getAll(): Record<string, string> {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string, value: string, options?: { [key: string]: any } }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
