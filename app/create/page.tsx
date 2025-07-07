import { Mail } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { SideMenu } from '@/components/side-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
                <a href="/create/create-listing" className='flex items-center gap-4'>
                  <Card>
                    <CardContent>
                      <CardTitle>Image</CardTitle>
                      <CardDescription>
                        <div>Items to sell</div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
                <a href="/" className='flex items-center gap-4'>
                  <Card>
                    <CardContent>
                      <CardTitle>Image</CardTitle>
                      <CardDescription>
                        <div>Items to sell</div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
                <a href="/" className='flex items-center gap-4'>
                  <Card>
                    <CardContent>
                      <CardTitle>Image</CardTitle>
                      <CardDescription>
                        <div>Items to sell</div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}