"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { NexoraLogo } from '@/components/common/logo'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaType } from '@/schema/auth.schema'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { toast } from 'sonner'
import { cartContext } from '@/provider/cart-provider'
import { wishlistContext } from '@/provider/wishlist-provider'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleCart } = useContext(cartContext)
  const { handleWishlist } = useContext(wishlistContext)

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function handleLogin(values: loginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (response?.ok) {
      toast.success("Logged in successfully", { position: 'top-center', duration: 3000 })
      router.push("/products")
      handleCart()
      handleWishlist()
    } else {
      toast.error(response?.error || "Invalid credentials", { position: 'top-center', duration: 3000 })
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors px-4 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md shadow-2xl relative z-10 overflow-hidden">
        <CardHeader className="space-y-3 pb-6 text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex justify-center items-center gap-2.5 mx-auto">
            <NexoraLogo size={42} withGlow className="shadow-lg shadow-purple-500/25" />
            <span className="font-extrabold text-2xl tracking-tight">Nexora</span>
          </Link>

          {/* Title */}
          <div>
            <CardTitle className="text-2xl font-extrabold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Sign in to access your cart, saved wishlist, and orders
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="rounded-xl h-11 text-sm bg-background/50 border-border/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs font-semibold">Password</FormLabel>
                      <Link
                        href="/forgotpassword"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl h-11 text-sm bg-background/50 border-border/70 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full rounded-xl h-11 text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer mt-2"
                size="lg"
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/60">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline cursor-pointer">
                  Create one now
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
