import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BrandsI } from '@/interfaces/allbrands'
import { getAllBrands } from '@/services/productServices'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Award, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Brands() {
  const data = await getAllBrands()
  const { data: brands } = data as { data: BrandsI[] }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border">
              {brands.length} Official Brands
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand: BrandsI, index) => {
            return (
              <React.Fragment key={brand._id}>
                <Card className="group flex flex-col h-full rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/brands/${brand._id}`} className="flex-1 flex flex-col">
                    <div className="relative w-full aspect-square overflow-hidden bg-muted/20 p-6 flex items-center justify-center">
                      <Image
                        fill
                        src={brand.image}
                        alt={brand.name}
                        className="object-contain p-4 group-hover:scale-108 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index < 8}
                      />
                    </div>
                    <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-border/50">
                      <CardTitle className="text-center text-base sm:text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                        <span>{brand.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
                      </CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </React.Fragment>
            )
          })}
        </div>
      </main>
    </div>
  )
}
