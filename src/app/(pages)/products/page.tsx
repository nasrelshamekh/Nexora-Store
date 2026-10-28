import { ProductI } from '@/interfaces/product'
import { getProducts } from '@/services/productServices'
import React from "react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Star, PackageSearch } from 'lucide-react'
import Link from 'next/link'
import AddCartButton from '@/components/products/addToCartBtn'
import AddWishlistButton from '@/components/products/addToWishlistBtn'
import { Badge } from '@/components/ui/badge'

export default async function Products() {
  const data = await getProducts()
  const { data: products } = (data || {}) as { data: ProductI[] }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <div className="border-b border-border bg-card/50 py-10">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <PackageSearch className="w-4 h-4" />
                <span>OFFICIAL STORE CATALOG</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">All Products</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Explore our full line of curated fashion, apparel, and electronics.
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-semibold rounded-full w-fit">
              {products?.length || 0} Products Available
            </Badge>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(products || []).map((product: ProductI, index) => (
            <Card
              key={product._id}
              className="flex flex-col h-full overflow-hidden rounded-2xl border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
                <div className="relative w-full aspect-square overflow-hidden bg-muted">
                  <Image
                    fill
                    src={product.imageCover}
                    alt={product.title}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 8}
                  />
                </div>
                <CardHeader className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{product.brand?.name}</span>
                    <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{product.ratingsAverage}</span>
                    </div>
                  </div>

                  <CardTitle className="text-base font-bold line-clamp-2 leading-snug hover:text-primary transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {product.category?.name}
                  </CardDescription>

                  <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block">Price</span>
                      <span className="text-xl font-extrabold text-foreground">EGP {product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
              </Link>
              <CardFooter className="p-5 pt-0 gap-2">
                <AddCartButton prodId={product._id} />
                <AddWishlistButton prodId={product._id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
