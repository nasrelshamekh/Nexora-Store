import React from "react"
import { Star, StarHalf, Truck, RotateCcw, ShieldCheck, CheckCircle2, ArrowLeft, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

import { getProducts, getSpecificProduct } from "@/services/productServices"
import { ProductI } from "@/interfaces/product"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import ProductCard from "@/components/products/ProductCard"
import ProductImageGallery from "@/components/products/ProductImageGallery"
import ProductInteractiveActions from "@/components/products/ProductInteractiveActions"
import ProductDetailsTabs from "@/components/products/ProductDetailsTabs"

export const dynamic = "force-dynamic"

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params

  const data = await getSpecificProduct(productId).catch(() => null)
  const productData: ProductI | null = data?.data || null

  if (!productData) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-background text-foreground text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-muted-foreground">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Product Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          The product you are looking for may have been retired or does not exist.
        </p>
        <Button asChild variant="outline" className="rounded-full px-6 cursor-pointer">
          <Link href="/products" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </Button>
      </main>
    )
  }

  const allProductsData = await getProducts().catch(() => ({ data: [] }))
  const allProducts: ProductI[] = allProductsData?.data || []
  const relatedProducts = allProducts
    .filter((p) => p.category?._id === productData.category?._id && p._id !== productData._id)
    .slice(0, 4)

  const renderStars = (rating: number = 0) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1
      if (rating >= starValue) {
        return <Star key={index} className="w-4 h-4 text-amber-500 fill-amber-500" />
      } else if (rating >= starValue - 0.5) {
        return <StarHalf key={index} className="w-4 h-4 text-amber-500 fill-amber-500" />
      } else {
        return <Star key={index} className="w-4 h-4 text-muted-foreground/30" />
      }
    })
  }

  const images =
    productData.images && productData.images.length > 0
      ? productData.images
      : [productData.imageCover]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-20">
      {/* Breadcrumb Header Bar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-md py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Breadcrumb>
            <BreadcrumbList className="text-xs sm:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary transition-colors">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products" className="hover:text-primary transition-colors">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {productData.category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/categories/${productData.category._id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {productData.category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-foreground line-clamp-1 max-w-[200px] sm:max-w-md">
                  {productData.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Image Gallery */}
          <div className="w-full">
            <ProductImageGallery images={images} title={productData.title} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="space-y-6">
            {/* Brand & Category Header Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {productData.brand?.name && (
                <Link href={`/brands/${productData.brand._id}`}>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 font-bold text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    {productData.brand.name}
                  </Badge>
                </Link>
              )}

              {productData.category?.name && (
                <Link href={`/categories/${productData.category._id}`}>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 font-semibold text-xs rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    {productData.category.name}
                  </Badge>
                </Link>
              )}

              {productData.ratingsAverage >= 4.5 && (
                <Badge className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-500" />
                  Top Rated
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              {productData.title}
            </h1>

            {/* Rating & Sold Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                <div className="flex items-center gap-0.5">{renderStars(productData.ratingsAverage)}</div>
                <span className="font-bold text-foreground">{productData.ratingsAverage}</span>
                <span className="text-muted-foreground text-xs whitespace-nowrap">({productData.ratingsQuantity} reviews)</span>
              </div>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0">
                <strong className="text-foreground">{productData.sold}</strong> items delivered
              </span>
            </div>

            <Separator />

            {/* Price Showcase */}
            <div className="bg-card/50 border border-border/80 rounded-2xl p-5 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                Official Retail Price
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  EGP {productData.price?.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  All taxes included
                </span>
              </div>
            </div>

            {/* Stock Telemetry */}
            <div className="flex items-center justify-between py-1">
              <div>
                {productData.quantity > 0 ? (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs whitespace-nowrap shrink-0">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">In Stock ({productData.quantity} units available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive font-semibold text-xs">
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <span>Currently Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Fast 24h dispatch</span>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Wishlist, Share */}
            <ProductInteractiveActions
              productId={productData._id}
              productTitle={productData.title}
            />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="p-2 bg-primary/10 rounded-xl text-primary mb-1">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs font-bold">Fast Delivery</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Nationwide coverage</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="p-2 bg-primary/10 rounded-xl text-primary mb-1">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs font-bold">30-Day Returns</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Hassle-free policy</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="p-2 bg-primary/10 rounded-xl text-primary mb-1">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs font-bold">100% Authentic</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Direct brand sourcing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Product Tabs (Overview, Specs, Warranty) */}
        <ProductDetailsTabs product={productData} />

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  EXPLORE ALTERNATIVES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                  Related Products
                </h2>
              </div>
              {productData.category && (
                <Button variant="ghost" asChild className="text-primary hover:text-primary gap-1 text-xs sm:text-sm cursor-pointer p-0 h-auto">
                  <Link href={`/categories/${productData.category._id}`}>
                    View all in {productData.category.name} →
                  </Link>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related: ProductI) => (
                <ProductCard key={related._id} product={related} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
