'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Define types for formData
interface FormData {
  get: (name: string) => string | null
}

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient()

  // Extract form data
  const email = formData.get('email')
  const password = formData.get('password')

  // Basic validation
  if (!email || !password) {
    redirect('/error')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    // Handle errors such as incorrect credentials
    redirect('/error')
  }

  // Revalidate the path after successful login
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData): Promise<void> {
  const supabase = await createClient()

  // Extract form data
  const email = formData.get('email')
  const password = formData.get('password')

  // Basic validation
  if (!email || !password) {
    redirect('/error')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    // Handle errors during signup, e.g., email already exists
    redirect('/error')
  }

  // Revalidate the path after successful signup
  revalidatePath('/', 'layout')
  redirect('/')
}
