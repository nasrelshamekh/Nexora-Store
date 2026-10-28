"use client"

import React, { useEffect, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { verifyResetCode } from "@/actions/password.action"
import { useRouter, useSearchParams } from "next/navigation"
import { NexoraLogo } from "@/components/common/logo"
import { VerifyCodeFormType, verifyCodeSchema } from "@/schema/verify-code.schema"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

function VerifyCodeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const form = useForm<VerifyCodeFormType>({
    resolver: zodResolver(verifyCodeSchema),
    mode: "onTouched",
    defaultValues: { resetCode: "" },
  })

  useEffect(() => {
    if (!email) {
      router.push("/forgotpassword")
    }
  }, [email, router])

  if (!email) {
    return null
  }

  async function handleVerifyCode(values: VerifyCodeFormType) {
    try {
      const data = await verifyResetCode(values.resetCode)

      if (data.status === "Success") {
        toast.success("Code verified successfully!", { position: "top-center" })
        router.push(`/resetpassword?email=${encodeURIComponent(email as string)}`)
      } else {
        toast.error(data.message || "Invalid code", { position: "top-center" })
      }
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to verify code", { position: "top-center" })
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Verify Reset Code</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Enter the 6-digit verification code sent to <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-4">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        maxLength={6}
                        className="rounded-xl h-12 text-center text-xl font-mono tracking-widest bg-background/50 border-border/70"
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
                    Verify Code <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs text-muted-foreground pt-4 mt-4 border-t border-border/60">
            <Link
              href="/forgotpassword"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Forgot Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default function VerifyCode() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><Spinner className="size-8" /></div>}>
      <VerifyCodeContent />
    </Suspense>
  )
}
