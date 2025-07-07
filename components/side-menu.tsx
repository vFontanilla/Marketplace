'use client'

import { Tag, CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import { getListingsByCategory } from '@/lib/listings'

export function SideMenu() {
  const handleCategoryClick = async (category: string) => {
    // This could be used to filter listings by category
    // For now, we'll just navigate to the home page
    // In a more complex app, you might want to use URL params or state management
    console.log('Filter by category:', category)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create new listing</h3>
        <div className="space-y-2">
          <Link
            href="/create"
            className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Tag className="w-5 h-5" />
            <span>Choose listing type</span>
          </Link>
          <button 
            onClick={() => alert('Feature coming soon!')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <Tag className="w-5 h-5" />
            <span>Your listings</span>
          </button>
          <button 
            onClick={() => alert('Need help? Contact support!')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <CircleUserRound className="w-5 h-5" />
            <span>Seller help</span>
          </button>
        </div>
      </div>
      <div>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>Categories</h3>
        <div className="space-y-2">
          <button 
            onClick={() => handleCategoryClick('vehicles')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <span>Vehicles</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('electronics')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <span>Electronics</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('apparel')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <span>Apparel</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('other')}
            className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left'
          >
            <span>Other</span>
          </button>
        </div>
      </div>
    </div>
  )
}