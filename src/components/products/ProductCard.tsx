"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { ProductI } from "@/interfaces/product"
import { WishlistProductI } from "@/interfaces/wishlistproduct"
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AddCartButton from "@/components/products/addToCartBtn"
import AddWishlistButton from "@/components/products/addToWishlistBtn"
import RemoveWishlistButton from "@/components/wishlist/removeFromWishlistBtn"

export interface ProductCardProps {
  product: ProductI | WishlistProductI
  priority?: boolean
  variant?: "default" | "wishlist"
  className?: string
}

export default function ProductCard({
  product,
  priority = false,
  variant = "default",
  className = "",
}: ProductCardProps) {
  const isOutOfStock = (product.quantity ?? 0) <= 0
  const isLowStock = (product.quantity ?? 0) > 0 && (product.quantity ?? 0) <= 5

  return (
    <Card
      className={`group flex flex-col h-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1.5 relative ${className}`}
    >
      {/* Floating Action Button (Top-Right of Image) */}
      <div className="absolute top-3 right-3 z-20">
        {variant === "wishlist" ? (
          <div className="rounded-full bg-background/90 backdrop-blur-md p-1 shadow-sm border border-border/70 hover:bg-background transition">
            <RemoveWishlistButton prodId={product._id} />
          </div>
        ) : (
          <AddWishlistButton prodId={product._id} variant="floating" />
        )}
      </div>

      <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
        {/* Image Frame with Floating Brand and Badges */}
        <div className="relative w-full aspect-square overflow-hidden bg-muted/40">
          <Image
            fill
            src={product.imageCover}
            alt={product.title}
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />

          {/* Top-Left Brand Badge */}
          {product.brand?.name && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground shadow-xs line-clamp-1 max-w-[130px] block">
                {product.brand.name}
              </span>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px] flex items-center justify-center z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-destructive/15 border border-destructive/30 text-destructive font-bold text-xs shadow-xs">
                Out of Stock
              </span>
            </div>
          )}

          {/* Low Stock Indicator */}
          {isLowStock && (
            <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-white font-bold text-[10px] shadow-sm">
                Only {product.quantity} left
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <CardHeader className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Category and Rating Row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-primary line-clamp-1">
                {product.category?.name || "General"}
              </span>

              {/* Rating pill */}
              <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full shrink-0">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>

            <CardTitle className="text-base font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {product.title}
            </CardTitle>

            {product.description && (
              <CardDescription className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                {product.description}
              </CardDescription>
            )}
          </div>

          {/* Price and Stock / Reviews Telemetry */}
          <div className="mt-4 pt-3 border-t border-border/60 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-muted-foreground block font-medium">Price</span>
              <span className="text-xl font-extrabold text-foreground tracking-tight">
                EGP {product.price?.toFixed(2)}
              </span>
            </div>

            {(product.ratingsQuantity ?? 0) > 0 ? (
              <span className="text-[11px] text-muted-foreground">
                ({product.ratingsQuantity} reviews)
              </span>
            ) : (product.sold ?? 0) > 0 ? (
              <span className="text-[11px] text-muted-foreground">
                {product.sold} sold
              </span>
            ) : !isOutOfStock ? (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                In Stock
              </span>
            ) : null}
          </div>
        </CardHeader>
      </Link>

      {/* Prominent Full-Width Add To Cart Button */}
      <CardFooter className="p-5 pt-0 mt-auto">
        <AddCartButton prodId={product._id} />
      </CardFooter>
    </Card>
  )
}
