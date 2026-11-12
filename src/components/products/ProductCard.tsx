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
      {/* If wishlist mode, show floating remove button on top-right */}
      {variant === "wishlist" && (
        <div className="absolute top-3 right-3 z-20">
          <div className="rounded-full bg-background/90 backdrop-blur-md p-1 shadow-sm border border-border/70 hover:bg-background transition">
            <RemoveWishlistButton prodId={product._id} />
          </div>
        </div>
      )}

      <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
        {/* Image Frame with Floating Overlays */}
        <div className="relative w-full aspect-square overflow-hidden bg-muted/40">
          <Image
            fill
            src={product.imageCover}
            alt={product.title}
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {product.brand?.name ? (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground shadow-xs line-clamp-1 max-w-[130px]">
                {product.brand.name}
              </span>
            ) : (
              <span />
            )}

            {/* In standard mode, show Rating badge in top-right */}
            {variant === "default" && (
              <div className="flex items-center gap-1 bg-background/90 backdrop-blur-md border border-border px-2.5 py-0.5 rounded-full shadow-xs">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold text-foreground">
                  {product.ratingsAverage}
                </span>
              </div>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px] flex items-center justify-center z-10">
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
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-primary line-clamp-1">
                {product.category?.name || "General"}
              </span>
              {(product.sold ?? 0) > 0 && (
                <span className="text-[10px] text-muted-foreground font-medium">
                  {product.sold} sold
                </span>
              )}
            </div>

            <CardTitle className="text-base font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {product.title}
            </CardTitle>

            {product.description && (
              <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {product.description}
              </CardDescription>
            )}
          </div>

          {/* Price and Stock / Rating Row */}
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
            ) : !isOutOfStock ? (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                In Stock
              </span>
            ) : null}
          </div>
        </CardHeader>
      </Link>

      {/* Action Buttons Footer */}
      <CardFooter className="p-5 pt-0 gap-2 mt-auto">
        {variant === "wishlist" ? (
          <div className="w-full">
            <AddCartButton prodId={product._id} />
          </div>
        ) : (
          <>
            <AddCartButton prodId={product._id} />
            <AddWishlistButton prodId={product._id} />
          </>
        )}
      </CardFooter>
    </Card>
  )
}
