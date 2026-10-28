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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, EyeOff } from "lucide-react"
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
                toast.success("Password reset successfully!", { position: "top-center" })
                router.push("/login")
            } else {
                toast.error(data.message || "Failed to reset password", { position: "top-center" })
            }
        } catch (error) {
            toast.error((error as Error)?.message || "Failed to reset password", { position: "top-center" })
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
                        <CardTitle className="text-2xl md:text-3xl">Reset Password</CardTitle>
                        <CardDescription className="mt-2">
                            Enter your new password for <span className="font-semibold">{email || "your account"}</span>
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
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full cursor-pointer" size="lg">
                                {form.formState.isSubmitting ? <Spinner /> : "Reset Password"}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center text-sm pt-2">
                        <Link
                            href="/login"
                            className="text-gray-600 font-semibold hover:underline cursor-pointer"
                        >
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner className="size-10" /></div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}
