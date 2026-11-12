"use client"

import React, { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import AddCartButton from "@/components/products/addToCartBtn"
import AddWishlistButton from "@/components/products/addToWishlistBtn"

interface ProductInteractiveActionsProps {
  productId: string
  productTitle: string
}

export default function ProductInteractiveActions({
  productId,
  productTitle,
}: ProductInteractiveActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""

    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Check out ${productTitle} on Nexora Store!`,
          url: currentUrl,
        })
        return
      } catch {
        // User cancelled share or failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      toast.success("Product link copied to clipboard!", { position: "top-center" })
      setTimeout(() => setCopied(false), 3000)
    } catch {
      toast.error("Failed to copy link", { position: "top-center" })
    }
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Primary Actions Row */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <AddCartButton prodId={productId} />
        </div>
        <AddWishlistButton prodId={productId} variant="button" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleShare}
          className="cursor-pointer size-10 sm:size-11 rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors p-0 shrink-0 shadow-xs"
          title="Share this product"
          aria-label="Share this product"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
