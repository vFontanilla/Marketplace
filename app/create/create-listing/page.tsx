import { Mail } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { SideMenu } from '@/components/side-menu';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

export default function CreateListing() {
  return (
    <div className="">
      <div>
        {/* Hidden */}
      </div>
      <header className="bg-white border-b border-gray-300 px-4 py-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  F
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden sm:block">
                Marketplace
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-5">
            <Mail className="text-gray-500 hover:text-gray-900" />
            <Bell className="text-gray-500 hover:text-gray-900" />
            <CircleUserRound className="text-gray-500 hover:text-gray-900" />
          </div>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex gap-6">
            <div className="w-64 flex-shrink-0">
              <SideMenu />
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a New Listing</h2>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="title">Item Title</Label>
                    <Input id="title" placeholder="e.g., Vintage Bicycle" required />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" min="0" step="0.01" placeholder="e.g., 150.00" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your item (condition, features, etc.)" rows={5} required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
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
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Palo Alto, California" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Seller Contact Email</Label>
                    <Input id="email" type="email" placeholder="e.g., seller@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="images">Upload Images (JPEG, PNG, WebP)</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">Upload up to 5 images for your listing.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Post Listing
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}