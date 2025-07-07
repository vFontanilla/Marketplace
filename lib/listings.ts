import { supabase } from './supabase'
import type { Listing } from './supabase'

export async function createListing(listingData: {
  title: string
  price: number
  description?: string
  category: string
  location?: string
  seller_email: string
  images?: File[]
}) {
  try {
    // Upload first image if any (since schema only supports single image_url)
    let imageUrl: string | null = null
    
    if (listingData.images && listingData.images.length > 0) {
      const file = listingData.images[0] // Take only the first image
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file)
      
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName)
      
      imageUrl = publicUrl
    }
    
    // Create listing record
    const { data, error } = await supabase
      .from('listings')
      .insert({
        title: listingData.title,
        price: listingData.price,
        description: listingData.description || null,
        category: listingData.category,
        location: listingData.location || 'Palo Alto, CA',
        seller_email: listingData.seller_email,
        image_url: imageUrl
      })
      .select()
      .single()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error creating listing:', error)
    return { data: null, error }
  }
}

export async function getListings(limit = 20): Promise<{ data: Listing[] | null, error: any }> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching listings:', error)
    return { data: null, error }
  }
}

export async function getListingsByCategory(category: string): Promise<{ data: Listing[] | null, error: any }> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching listings by category:', error)
    return { data: null, error }
  }
}

export async function getListingById(id: string): Promise<{ data: Listing | null, error: any }> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching listing by ID:', error)
    return { data: null, error }
  }
}