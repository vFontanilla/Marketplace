'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { getListings, getListingsByCategory } from '@/lib/listings'
import type { Listing } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export function ContentSide() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchListings = useCallback(async () => {
    setLoading(true)
    try {
      let result
      if (category) {
        result = await getListingsByCategory(category)
      } else {
        result = await getListings()
      }
      
      const { data, error } = result
      if (error) {
        console.error('Error fetching listings:', error)
        return
      }
      setListings(data || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])
  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the filteredListings above
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Listed just now'
    if (diffInHours < 24) return `Listed ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Listed ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    
    return `Listed on ${date.toLocaleDateString()}`
  }

  const getCategoryDisplayName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1)
  }
  if (loading) {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {category ? `${getCategoryDisplayName(category)} Items` : "Today's Pick"}
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading listings...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {category ? `${getCategoryDisplayName(category)} Items` : "Today's Pick"}
      </h2>
      <div className="space-y-6">
        <form className="flex gap-2" onSubmit={handleSearch}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              className="pl-10" 
              placeholder={category ? `Search in ${getCategoryDisplayName(category)}...` : "Search for a product"} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm 
              ? 'No listings found matching your search.' 
              : category 
                ? `No listings found in ${getCategoryDisplayName(category)} category.`
                : 'No listings available yet.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
          {filteredListings.map((listing) => (
            <Link key={listing.id} href={`/list-details/${listing.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  {/* Image */}
                  <div className="w-full h-32 bg-gray-200 rounded-md mb-3 overflow-hidden">
                    {listing.image_url ? (
                      <Image
                        src={listing.image_url}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        width={200}
                        height={128}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {listing.title}
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatPrice(listing.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(listing.created_at)}
                    </div>
                    {listing.location && (
                      <div className="text-sm text-gray-600">
                        {listing.location}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 capitalize">
                      {listing.category}
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}