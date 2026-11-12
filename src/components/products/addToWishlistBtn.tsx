"use client"

import React, { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { addToWishlist } from "@/actions/wishlist.action"
import { wishlistContext } from "@/provider/wishlist-provider"

interface AddWishlistButtonProps {
  prodId: string
  className?: string
  variant?: "floating" | "button"
}

export default function AddWishlistButton({
  prodId,
  className = "",
  variant = "floating",
}: AddWishlistButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { handleWishlist } = useContext(wishlistContext)

  async function addProductToWishlist(productId: string) {
    try {
      setIsLoading(true)
      const response = await addToWishlist(productId)

      if (response.status === "success") {
        setIsSaved(true)
        toast.success(response.message || "Added to wishlist", { position: "top-center" })
      }
      handleWishlist()
    } catch (error) {
      toast.error((error as Error).message || "Failed to add to wishlist", { position: "top-center" })
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  const baseClasses =
    variant === "floating"
      ? "size-8 sm:size-9 rounded-full bg-background/90 backdrop-blur-md border border-border/80 text-muted-foreground hover:text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10 shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer p-0 shrink-0"
      : "size-10 sm:size-11 rounded-xl border border-border/80 bg-background text-muted-foreground hover:text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10 transition-colors cursor-pointer p-0 shrink-0"

  return (
    <Button
      type="button"
      disabled={isLoading}
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        addProductToWishlist(prodId)
      }}
      className={`${baseClasses} ${className}`}
      title="Save to Wishlist"
      aria-label="Save to Wishlist"
    >
      {isLoading ? (
        <Spinner className="w-4 h-4" />
      ) : (
        <Heart
          className={`w-4 h-4 transition-colors ${
            isSaved ? "fill-rose-500 text-rose-500" : ""
          }`}
        />
      )}
    </Button>
  )
}
