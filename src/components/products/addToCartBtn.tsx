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
            
            if (response.status == "success") {
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
        <>
            <Button disabled={isLoading} onClick={() => { addProductToCart(prodId) }} className='grow cursor-pointer h-12'>
                {isLoading ? <Spinner /> : <>
                    <ShoppingCart className='size-5' />
                    <span className='text-[16px]'>Add To Cart</span>
                </>}
            </Button>
        </>
    )
}
