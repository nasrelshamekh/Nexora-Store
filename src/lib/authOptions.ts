import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"
import { DecodedTokenI } from "@/interfaces/decodedtoken"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: { email: {}, password: {} },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                

                if (data.message == "success") {
                    const decodedToken = jwtDecode<DecodedTokenI>(data.token);
                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token
                    }
                } else {
                    throw new Error(data.message || "Wrong Credentials")
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            if(token) {
                session.user = token.user
            }
            return session
        }
    }
}