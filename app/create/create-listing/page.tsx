'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Bell, CircleUserRound, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createListing } from '@/lib/listings'
import Link from 'next/link'

export default function CreateListing() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    location: '',
    seller_email: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }
    
    setSelectedImages(files)
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.price || !formData.category || !formData.seller_email) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      const { data, error } = await createListing({
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        location: formData.location,
        seller_email: formData.seller_email,
        images: selectedImages
      })

      if (error) {
        throw error
      }

      alert('Listing created successfully!')
      router.push('/')
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Failed to create listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Photos Section */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white hover:border-gray-400 transition-colors cursor-pointer relative">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Add photos</p>
                  <p className="text-sm text-gray-500">JPEG, PNG, or WebP (max 5MB)</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {selectedImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {previewUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input 
                  placeholder="What are you selling?" 
                  className="bg-white border-gray-300"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="apparel">Apparel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  min="0" 
                  step="0.01"
                  className="bg-white border-gray-300"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>

              {/* Location */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">Location</Label>
                <Input 
                  placeholder="Palo Alto, CA" 
                  className="bg-white border-gray-300"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              {/* Contact Email */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-white border-gray-300"
                  value={formData.seller_email}
                  onChange={(e) => handleInputChange('seller_email', e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">Description</Label>
                <Textarea 
                  placeholder="Describe your item..." 
                  rows={4}
                  className="bg-white border-gray-300 resize-none"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {/* Create Listing Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
              </Button>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                </div>
                
                <div className="p-6">
                  {/* Preview Image Area */}
                  <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center overflow-hidden">
                    {previewUrls.length > 0 ? (
                      <img
                        src={previewUrls[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">Photo preview will appear here</p>
                      </div>
                    )}
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {formData.title || 'Title'}
                      </h3>
                      <p className="text-lg font-medium text-gray-900 mt-1">
                        {formData.price ? `$${formData.price}` : 'Price'}
                      </p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>Listed just now</p>
                      <p>in {formData.location || 'Palo Alto, CA'}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Seller Information</h4>
                      <p className="text-sm text-gray-600">
                        {formData.seller_email || 'seller@email.com'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}