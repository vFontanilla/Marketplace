import { Tag } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

export function SideMenu() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Create new listing</h3>
        <div className="space-y-2">
          <Link
            href="/create"
            className="flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100"
          >
            <Tag />
            <span>Choose listing type</span>
          </Link>
          <a href="#" className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100'>
            <Tag />
            <span>Your listings</span>
          </a>
          <a href="#" className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100'>
            <CircleUserRound />
            <span>Seller help</span>
          </a>
        </div>
      </div>
      <div>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>Categories</h3>
        <div className="space-y-2">
          <a href="#" className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100'>
            <span>Vehicles</span>
          </a>
          <a href="#" className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100'>
            <span>Electronics</span>
          </a>
          <a href="#" className='flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-100'>
            <span>Apparel</span>
          </a>
        </div>
      </div>
    </div>
  );
}