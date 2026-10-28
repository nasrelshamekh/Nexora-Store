"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/actions/cart.action'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { cartContext } from '@/provider/cart-provider'
import { useRouter } from 'next/navigation'

export default function AddCartButton({ prodId }: { prodId: string }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)

    async function addProductToCart(productId: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(productId)
            
            if (response.status === "success") {
                toast.success(response.message, { position: "top-center" })
            }
            handleCart()
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
            onClick={() => { addProductToCart(prodId) }} 
            className="w-full grow cursor-pointer h-10 sm:h-11 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all gap-2 text-xs sm:text-sm"
        >
            {isLoading ? (
                <Spinner className="w-4 h-4" />
            ) : (
                <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add To Cart</span>
                </>
            )}
        </Button>
    )
}
