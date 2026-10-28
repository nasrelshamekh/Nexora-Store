"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { addToWishlist } from '@/actions/wishlist.action'
import { wishlistContext } from '@/provider/wishlist-provider'

export default function AddWishlistButton({ prodId }: { prodId: string }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const { handleWishlist } = useContext(wishlistContext)

    async function addProductToWishlist(productId: string) {
        try {
            setIsLoading(true)
            const response = await addToWishlist(productId)
            
            if (response.status === "success") {
                toast.success(response.message, { position: "top-center" })
            }
            handleWishlist()
        } catch (error) {
            toast.error((error as Error).message, { position: "top-center" })
            router.push("/login")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button 
            disabled={isLoading} 
            variant="outline"
            onClick={() => { addProductToWishlist(prodId) }} 
            className="cursor-pointer h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-border/80 text-muted-foreground hover:text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10 transition-colors p-0 shrink-0"
            title="Save to Wishlist"
            aria-label="Save to Wishlist"
        >
            {isLoading ? <Spinner className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
        </Button>
    )
}
