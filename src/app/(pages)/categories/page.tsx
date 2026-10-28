import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { allCategoriesI } from '@/interfaces/allcategories'
import { getAllCategories } from '@/services/productServices'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LayoutGrid, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Categories() {
  const data = await getAllCategories()
  const { data: categories } = data as { data: allCategoriesI[] }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <LayoutGrid className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Product Categories</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Explore tailored selections across fashion, electronics, and daily essentials
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border">
              {categories.length} Departments
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category: allCategoriesI, index) => {
            return (
              <React.Fragment key={category._id}>
                <Card className="group flex flex-col h-full rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/categories/${category._id}`} className="flex-1 flex flex-col">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted/30">
                      <Image
                        fill
                        src={category.image}
                        alt={category.name}
                        className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={index < 8}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>
                    <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-border/50">
                      <CardTitle className="text-center text-base sm:text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                        <span>{category.name}</span>
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
