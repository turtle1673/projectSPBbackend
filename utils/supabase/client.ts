import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ewpxbkowozipvpeddfux.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cHhia293b3ppcHZwZWRkZnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NDkxMTAsImV4cCI6MjA1MzIyNTExMH0.OgkYTT_DM2b57iP5mpErrdQiUqR_0fJBMMusU7tRWOg'
export const supabase = createClient(supabaseUrl, supabaseKey)