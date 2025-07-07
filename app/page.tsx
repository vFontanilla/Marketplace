import { Mail } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { SideMenu } from '@/components/side-menu';
import { ContentSide } from '@/components/content-side';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div>
        {/* Hidden */}
      </div>
      <header className="bg-white border-b border-gray-300 px-4 py-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  F
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden sm:block">
                Marketplace
              </span>
            </Link>
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
          <div className='flex gap-6'>
            <div className='w-64 flex-shrink-0'>
              <Suspense fallback={<div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">Loading menu...</div>}>
                <SideMenu />
              </Suspense>
            </div>
            <div className='flex-1'>
              <Suspense fallback={<div className="text-center py-12">Loading listings...</div>}>
                <ContentSide />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}