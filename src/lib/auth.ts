import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const myCookies = await cookies()
    const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
    if (!secret) return undefined

    let encryptedToken =
        myCookies.get("next-auth.session-token")?.value ||
        myCookies.get("__Secure-next-auth.session-token")?.value

    // If session cookie is chunked by NextAuth (e.g. payload > 4KB), reassemble it
    if (!encryptedToken) {
        const prefix = myCookies.has("__Secure-next-auth.session-token.0")
            ? "__Secure-next-auth.session-token."
            : myCookies.has("next-auth.session-token.0")
            ? "next-auth.session-token."
            : null

        if (prefix) {
            let i = 0
            let chunks = ""
            while (myCookies.has(`${prefix}${i}`)) {
                chunks += myCookies.get(`${prefix}${i}`)?.value || ""
                i++
            }
            encryptedToken = chunks || undefined
        }
    }

    if (!encryptedToken) return undefined

    try {
        const token = await decode({ token: encryptedToken, secret })
        return token?.token as string
    } catch {
        return undefined
    }
}
