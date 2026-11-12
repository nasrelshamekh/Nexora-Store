import React from "react"
import { PackageSearch, Sparkles } from "lucide-react"

import { ProductI } from "@/interfaces/product"
import { allCategoriesI } from "@/interfaces/allcategories"
import { BrandsI } from "@/interfaces/allbrands"
import { getAllBrands, getAllCategories, getProducts } from "@/services/productServices"
import ProductCatalogClient from "@/components/products/ProductCatalogClient"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const [productsRes, categoriesRes, brandsRes] = await Promise.all([
    getProducts().catch(() => ({ data: [] })),
    getAllCategories().catch(() => ({ data: [] })),
    getAllBrands().catch(() => ({ data: [] })),
  ])

  const products: ProductI[] = productsRes?.data || []
  const categories: allCategoriesI[] = categoriesRes?.data || []
  const brands: BrandsI[] = brandsRes?.data || []

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors pb-20">
      {/* Atmospheric Page Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm shrink-0">
                <PackageSearch className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Marketplace</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Full Product Catalog</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Discover genuine apparel, electronics, and daily essentials with verified warranty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Badge
                variant="secondary"
                className="text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border"
              >
                {products.length} Items Listed
              </Badge>
              <Badge
                variant="outline"
                className="text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border-primary/30 text-primary bg-primary/5"
              >
                {categories.length} Departments
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Catalog Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        <ProductCatalogClient
          initialProducts={products}
          categories={categories}
          brands={brands}
        />
      </section>
    </main>
  )
}
