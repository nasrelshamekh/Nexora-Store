"use server"
import { getUserToken } from "@/lib/auth"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ecommerce.routemisr.com/api/v1"

export async function getUserOrders(userId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
