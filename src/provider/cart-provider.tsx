"use client"
import { getLoggedUserCart } from '@/actions/cart.action';
import { CartI } from '@/interfaces/cart';
import { CartContextI } from '@/interfaces/cartcontext';
import { useSession } from 'next-auth/react';
import React, { createContext, useCallback, useEffect, useState } from 'react'

export const cartContext = createContext<CartContextI>({
    noOfCartItems: 0,
    handleCart: () => { },
    isLoading: false
})

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const { data: session, status } = useSession()

    const handleCart = useCallback(async () => {
        if (status === "unauthenticated" || !session) {
            setNoOfCartItems(0)
            return
        }

        try {
            setIsLoading(true)
            const data: CartI = await getLoggedUserCart()
            if (data?.status === "success" && data?.data) {
                const count = typeof data.numOfCartItems === "number"
                    ? data.numOfCartItems
                    : (data.data.products?.reduce((accu, prod) => (prod.count || 1) + accu, 0) || 0)
                setNoOfCartItems(count)
            } else if (typeof data?.numOfCartItems === "number") {
                setNoOfCartItems(data.numOfCartItems)
            } else {
                setNoOfCartItems(0)
            }
        } catch (error) {
            console.error(error)
            setNoOfCartItems(0)
        } finally {
            setIsLoading(false)
        }
    }, [status, session])

    useEffect(() => {
        if (status !== "loading") {
            handleCart()
        }
    }, [status, handleCart])

    return (
        <cartContext.Provider value={{ noOfCartItems, handleCart, isLoading }}>
            {children}
        </cartContext.Provider>
    )
}
