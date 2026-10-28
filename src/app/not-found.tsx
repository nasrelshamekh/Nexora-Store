import React from 'react'
import Link from 'next/link'
import { PackageSearch, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xl">
        {/* Visual Icon Badge */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/10">
          <PackageSearch className="w-10 h-10" />
        </div>

        {/* Status & Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
            Error 404 // Lost In Inventory
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            The page or product you are looking for might have been moved, renamed, or is temporarily unavailable in our catalog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button asChild size="lg" className="w-full sm:flex-1 rounded-full cursor-pointer bg-black hover:bg-gray-800">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:flex-1 rounded-full cursor-pointer">
            <Link href="/products" className="inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop Catalog
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
