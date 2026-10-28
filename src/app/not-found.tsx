import React from 'react'
import Link from 'next/link'
import { PackageSearch, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-background text-foreground transition-colors px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-card p-8 sm:p-10 rounded-3xl border border-border shadow-2xl">
        {/* Visual Icon Badge */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
          <PackageSearch className="w-10 h-10" />
        </div>

        {/* Status & Title */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
            Error 404 // Lost In Inventory
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page or product you are looking for might have been moved, renamed, or is temporarily unavailable in our catalog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button asChild size="lg" className="w-full sm:flex-1 rounded-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:flex-1 rounded-full cursor-pointer border-border hover:bg-accent">
            <Link href="/products" className="inline-flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Shop Catalog
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
