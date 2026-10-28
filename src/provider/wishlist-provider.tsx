"use client"
import { getLoggedUserWishlist } from '@/actions/wishlist.action';
import { WishlistContextI } from '@/interfaces/wishlistcontext';
import { WishlistResponseI } from '@/interfaces/wishlistresponse';
import { useSession } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react'

export const wishlistContext = createContext<WishlistContextI>({
    count: 0,
    handleWishlist: () => { },
    isLoadingWishlist: false
})

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(false)
    const { data: session, status } = useSession()

    async function handleWishlist() {
        if (status === "unauthenticated" || !session) {
            setCount(0)
            return
        }

        try {
            setIsLoadingWishlist(true)
            const data: WishlistResponseI = await getLoggedUserWishlist()
            setCount(data.count)
        } catch (error) {
            console.error(error)
            setCount(0)
        } finally {
            setIsLoadingWishlist(false)
        }
    }

    useEffect(() => {
        if (status !== "loading") {
            handleWishlist()
        }
    }, [status])

    return (
        <wishlistContext.Provider value={{ count, handleWishlist, isLoadingWishlist }}>
            {children}
        </wishlistContext.Provider>
    )
}