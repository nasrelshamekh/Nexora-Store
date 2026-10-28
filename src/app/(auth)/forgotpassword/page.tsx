"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NexoraLogo } from "@/components/common/logo"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { forgotPassword } from "@/actions/password.action"
import { forgotPasswordSchema, forgotPasswordFormType } from '@/schema/forgot-password.schema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ForgotPassword() {
  const router = useRouter()
  const form = useForm<forgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  })

  async function handleForgotPassword(values: forgotPasswordFormType) {
    try {
      const data = await forgotPassword(values.email)
      toast.success(data?.message || "Reset code sent to your email", { position: "top-center" })
      form.reset()
      router.push(`/verifycode?email=${encodeURIComponent(values.email)}`)
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to send reset email", { position: "top-center" })
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Forgot password?</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Enter your registered email and we&apos;ll send a 6-digit verification code to reset your credentials
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-4">
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
                    Send Reset Code <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs text-muted-foreground pt-4 mt-4 border-t border-border/60">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
