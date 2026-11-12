"use server"
import { getUserToken } from "@/lib/auth"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ecommerce.routemisr.com/api/v1"

export async function forgotPassword(userEmail: string) {
    const response = await fetch(`${BASE_URL}/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function changePassword(currentPassword: string, newPassword: string, rePassword: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("You must be logged in to change your password")
    }

    const response = await fetch(`${BASE_URL}/users/changeMyPassword`, {
        method: "PUT",
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword,
            password: newPassword,
            rePassword
        })
    })

    const data = await response.json()
    return data
}

export async function verifyResetCode(resetCode: string) {
    const response = await fetch(`${BASE_URL}/auth/verifyResetCode`, {
        method: "POST",
        body: JSON.stringify({ resetCode: resetCode }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function resetPassword(email: string, newPassword: string) {
    const response = await fetch(`${BASE_URL}/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    })
    const data = await response.json()
    return data
}
