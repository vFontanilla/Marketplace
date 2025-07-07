'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Mail, Bell, CircleUserRound, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getListingById, sendMessage } from '@/lib/listings'
import type { Listing } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export default function ListingDetails() {
  const params = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [messageData, setMessageData] = useState({
    email: '',
    message: "I&apos;m interested in your item!"
  })

  useEffect(() => {
    if (params.id) {
      fetchListing(params.id as string)
    }
  }, [params.id])

  const fetchListing = async (id: string) => {
    try {
      const { data, error } = await getListingById(id)
      if (error) {
        console.error('Error fetching listing:', error)
        return
      }
      setListing(data)
    } catch (error) {
      console.error('Error fetching listing:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!messageData.email || !messageData.message) {
      alert('Please fill in all fields')
      return
    }

    if (!listing) return

    setSendingMessage(true)
    
    try {
      const { success, error } = await sendMessage({
        listing_id: listing.id,
        buyer_email: messageData.email,
        seller_email: listing.seller_email,
        message: messageData.message
      })

      if (success) {
        alert('Message sent successfully! The seller will contact you soon.')
        setMessageData({ email: '', message: "I&apos;m interested in your item!" })
      } else {
        throw error
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSendingMessage(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-300 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Marketplace</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Mail className="text-gray-500 hover:text-gray-900 w-5 h-5" />
              <Bell className="text-gray-500 hover:text-gray-900 w-5 h-5" />
              <CircleUserRound className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            </div>
          </div>
        </header>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading listing...</div>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-300 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Marketplace</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Mail className="text-gray-500 hover:text-gray-900 w-5 h-5" />
              <Bell className="text-gray-500 hover:text-gray-900 w-5 h-5" />
              <CircleUserRound className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
            <p className="text-gray-600 mb-6">The listing you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Marketplace</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Mail className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            <Bell className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            <CircleUserRound className="text-gray-500 hover:text-gray-900 w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {listing.image_url ? (
                <Image
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">📷</span>
                  </div>
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="text-2xl font-bold text-gray-900 mb-4">{formatPrice(listing.price)}</p>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>{formatDate(listing.created_at)}</p>
                {listing.location && <p>in {listing.location}</p>}
                <p className="capitalize">Category: {listing.category}</p>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h2>
              <p className="text-gray-700">{listing.seller_email}</p>
            </div>

            {/* Message Seller */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Message Seller</h2>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={messageData.email}
                    onChange={(e) => setMessageData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="I&apos;m interested in your item!"
                    value={messageData.message}
                    onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="mt-1"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={sendingMessage}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {sendingMessage ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}