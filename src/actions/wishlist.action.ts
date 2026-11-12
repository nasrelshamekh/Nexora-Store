"use server"
import { getUserToken } from "@/lib/auth"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ecommerce.routemisr.com/api/v1"

export async function addToWishlist(productId: string) {
    const token = await getUserToken() 
    if(!token) {
        throw new Error("You must be logged in to add a product to wishlist")
    }
    const response = await fetch(`${BASE_URL}/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function removeFromWishlist(productId: string) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    
    const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    
    if (!response.ok) {
        throw new Error("Failed to remove from wishlist")
    }
    
    const data = await response.json()
    return data
}

export async function getLoggedUserWishlist() {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${BASE_URL}/wishlist`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
