'use client'

import { Tag, CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export function SideMenu() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleCategoryClick = (category: string) => {
    // If clicking the same category, clear the filter
    if (currentCategory === category) {
      router.push('/')
    } else {
      router.push(`/?category=${category}`)
    }
  }

  const handleAllItemsClick = () => {
    router.push('/')
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
            onClick={handleAllItemsClick}
            className={`flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left ${
              !currentCategory ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
          >
            <span>All Items</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('vehicles')}
            className={`flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left ${
              currentCategory === 'vehicles' ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
          >
            <span>Vehicles</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('electronics')}
            className={`flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left ${
              currentCategory === 'electronics' ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
          >
            <span>Electronics</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('apparel')}
            className={`flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left ${
              currentCategory === 'apparel' ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
          >
            <span>Apparel</span>
          </button>
          <button 
            onClick={() => handleCategoryClick('other')}
            className={`flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors w-full text-left ${
              currentCategory === 'other' ? 'bg-blue-50 text-blue-600 font-medium' : ''
            }`}
          >
            <span>Other</span>
          </button>
        </div>
      </div>
    </div>
  )
}