import { Badge } from '@/components/ui/badge'
import { BrandsI } from '@/interfaces/allbrands'
import { getAllBrands } from '@/services/productServices'
import React from 'react'
import { Award } from 'lucide-react'
import BrandCard from '@/components/brands/BrandCard'

export const dynamic = 'force-dynamic'

export default async function Brands() {
  const data = await getAllBrands()
  const { data: brands } = (data || {}) as { data: BrandsI[] }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Curated Brands</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Discover premier labels and certified global lifestyle manufacturers
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border whitespace-nowrap shrink-0">
              {(brands || []).length} Official Brands
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {(brands || []).map((brand: BrandsI, index: number) => (
            <BrandCard
              key={brand._id}
              brand={brand}
              priority={index < 8}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
