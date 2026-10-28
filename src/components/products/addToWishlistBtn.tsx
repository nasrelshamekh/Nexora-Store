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
            
            if (response.status == "success") {
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
        <>
            <Button disabled={isLoading} onClick={() => { addProductToWishlist(prodId) }} className='cursor-pointer h-12 w-12'>
                {isLoading ? <Spinner /> : <>
                    <Heart className='size-5' />
                </>}
            </Button>
        </>
    )
}
