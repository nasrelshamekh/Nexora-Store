import { Badge } from '@/components/ui/badge'
import { allCategoriesI } from '@/interfaces/allcategories'
import { getAllCategories } from '@/services/productServices'
import React from 'react'
import { LayoutGrid } from 'lucide-react'
import CategoryCard from '@/components/categories/CategoryCard'

export const dynamic = 'force-dynamic'

export default async function Categories() {
  const data = await getAllCategories()
  const { data: categories } = (data || {}) as { data: allCategoriesI[] }

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
              {(categories || []).length} Departments
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(categories || []).map((category: allCategoriesI, index: number) => (
            <CategoryCard
              key={category._id}
              category={category}
              priority={index < 8}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
