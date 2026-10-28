"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NexoraLogo } from '@/components/common/logo'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, registerSchemaType } from '@/schema/auth.schema'
import { registerUser } from '@/services/auth.services'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  })

  async function handleRegister(values: registerSchemaType) {
    try {
      const data = await registerUser(values)
      if (data.message === "success") {
        toast.success("Account created successfully! Please sign in.", { position: "top-center" })
        router.push("/login")
      } else {
        toast.error(data.message || "Registration failed", { position: "top-center" })
      }
    } catch (error) {
      toast.error((error as Error)?.message || "Registration failed", { position: "top-center" })
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Join Nexora for curated shopping, fast checkout, and rewards
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-3.5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="rounded-xl h-10 text-sm bg-background/50 border-border/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

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
                        className="rounded-xl h-10 text-sm bg-background/50 border-border/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="0123 456 7890"
                        className="rounded-xl h-10 text-sm bg-background/50 border-border/70"
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
                    <FormLabel className="text-xs font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="rounded-xl h-10 text-sm bg-background/50 border-border/70 pr-10"
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

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showRePassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="rounded-xl h-10 text-sm bg-background/50 border-border/70 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          {showRePassword ? (
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
                className="w-full rounded-xl h-11 text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer mt-3"
                size="lg"
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center text-xs text-muted-foreground pt-3 border-t border-border/60">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline cursor-pointer">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
