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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifyCodeFormType, verifyCodeSchema } from "@/schema/verify-code.schema"
import Link from "next/link"

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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center items-center gap-3">
            <Avatar className="rounded-lg font-bold bg-black text-white size-10">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="font-bold text-2xl">Nexora</span>
          </div>

          <div className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Verify Reset Code</CardTitle>
            <CardDescription className="mt-2">
              Enter the verification code you received in your email
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
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your 6-digit code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" size="lg">
                {form.formState.isSubmitting ? <Spinner /> : "Verify Code"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm pt-2">
            <Link
              href="/forgotpassword"
              className="text-gray-600 font-semibold hover:underline cursor-pointer"
            >
              Back to Forgot Password
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default function VerifyCode() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner className="size-10" /></div>}>
      <VerifyCodeContent />
    </Suspense>
  )
}
