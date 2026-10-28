"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NexoraLogo } from "@/components/common/logo"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema, changePasswordSchemaType } from "@/schema/change-password.schema"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { changePassword } from "@/actions/password.action"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    }
  })

  function logoutUser() {
    signOut({ callbackUrl: "/login" })
  }

  async function handleChangePassword(values: changePasswordSchemaType) {
    try {
      const data = await changePassword(values.currentPassword, values.password, values.rePassword)

      if (data?.message === "success") {
        toast.success("Password changed successfully. Please log in again.", { position: "top-center" })
        logoutUser()
      } else {
        toast.error(data?.message || "Failed to change password", { position: "top-center" })
      }
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to change password", { position: "top-center" })
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
            <CardTitle className="text-2xl font-extrabold tracking-tight">Account Security</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Update your account credentials to keep your profile secure
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleChangePassword)} className="space-y-4">

              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrent ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl h-11 text-sm bg-background/50 border-border/70 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => setShowCurrent(!showCurrent)}
                        >
                          {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNew ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl h-11 text-sm bg-background/50 border-border/70 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => setShowNew(!showNew)}
                        >
                          {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    <FormLabel className="text-xs font-semibold">Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          className="rounded-xl h-11 text-sm bg-background/50 border-border/70 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                    Update Password <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs text-muted-foreground pt-4 mt-4 border-t border-border/60">
            <Link
              href="/products"
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Back to Catalog
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
