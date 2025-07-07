import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Listing = {
  id: string
  title: string
  price: number
  description: string | null
  category: string
  location: string | null
  contact_email: string
  image_urls: string[]
  created_at: string
  updated_at: string
}