import { Mail } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Upload } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Marketplace</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            <Bell className="text-gray-500 hover:text-gray-900 w-5 h-5" />
            <CircleUserRound className="text-gray-500 hover:text-gray-900 w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Photos Section */}
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-1">Add photos</p>
                <p className="text-sm text-gray-500">JPEG, PNG, or WebP (max 5MB)</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input 
                placeholder="What are you selling?" 
                className="bg-white border-gray-300"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select>
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
              />
            </div>

            {/* Location */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Location</Label>
              <Input 
                placeholder="Palo Alto, CA" 
                className="bg-white border-gray-300"
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
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Description</Label>
              <Textarea 
                placeholder="Describe your item..." 
                rows={4}
                className="bg-white border-gray-300 resize-none"
              />
            </div>

            {/* Create Listing Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              Create Listing
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
                <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Photo preview will appear here</p>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Title</h3>
                    <p className="text-lg font-medium text-gray-900 mt-1">Price</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Listed just now</p>
                    <p>in Palo Alto, CA</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Seller Information</h4>
                    <p className="text-sm text-gray-600">seller@email.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}