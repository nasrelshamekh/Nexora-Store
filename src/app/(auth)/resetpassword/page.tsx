"use client"

import React, { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRouter, useSearchParams } from "next/navigation"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { resetPassword } from "@/actions/password.action"
import { NexoraLogo } from "@/components/common/logo"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react"
import { resetPasswordFormType, resetPasswordSchema } from "@/schema/reset-password.schema"
import Link from "next/link"

function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const form = useForm<resetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: { newPassword: "" },
  })

  async function handleResetPassword(values: resetPasswordFormType) {
    try {
      const data = await resetPassword(email, values.newPassword)
      if (data.token) {
        toast.success("Password reset successfully! Please log in.", { position: "top-center" })
        router.push("/login")
      } else {
        toast.error(data.message || "Failed to reset password", { position: "top-center" })
      }
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to reset password", { position: "top-center" })
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Create new password</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Setting credentials for <span className="font-semibold text-foreground">{email || "your account"}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
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
                    Reset Password <ArrowRight className="w-4 h-4" />
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

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Spinner className="size-8" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
