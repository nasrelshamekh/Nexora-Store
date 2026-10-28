"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { checkoutUser } from "@/actions/cart.action"
import { CheckoutFormValues, checkoutSchema } from "@/schema/checkout.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CreditCard, MapPin, Building2, Phone, ShieldCheck, Lock } from "lucide-react"

export function Checkout({ cartId }: { cartId: string }) {
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            shippingAddress: {
                details: "",
                city: "",
                phone: "",
            },
        },
    })

    async function handleCheckout(values: CheckoutFormValues) {
        try {
            const origin = typeof window !== "undefined" ? window.location.origin : undefined
            const response = await checkoutUser(values, cartId, origin)
            if (response.status === "success" && response.session?.url) {
                window.location.href = response.session.url
            } else {
                toast.error(response.message || "Failed to initiate payment session", { position: "top-center" })
            }
        } catch (error) {
            toast.error((error as Error).message || "Checkout session error", { position: "top-center" })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="w-full rounded-2xl text-base py-6 font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
                >
                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Pay with Card (Stripe)</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[440px] rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <DialogHeader className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <DialogTitle className="text-xl font-bold">Stripe Card Checkout</DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-1">
                            Provide your delivery details. You will be redirected to Stripe to finalize payment securely.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-4 mt-2">
                        {/* Street Address Details */}
                        <FormField
                            control={form.control}
                            name="shippingAddress.details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold">Street & Building Details</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                placeholder="e.g. 14 El-Tahrir St, Apt 4B"
                                                className="pl-10 rounded-xl"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* City */}
                        <FormField
                            control={form.control}
                            name="shippingAddress.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold">City / Governorate</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                placeholder="e.g. Cairo, Giza, Alexandria"
                                                className="pl-10 rounded-xl"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="shippingAddress.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold">Contact Phone Number</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="tel"
                                                placeholder="e.g. 01012345678"
                                                className="pl-10 rounded-xl"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Security notice */}
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/60 text-[11px] text-muted-foreground">
                            <Lock className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span>Payments processed through 256-bit SSL encrypted Stripe gateway.</span>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 pt-2">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="rounded-xl cursor-pointer">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="rounded-xl cursor-pointer bg-primary text-primary-foreground font-semibold"
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner className="w-4 h-4" /> Redirecting...
                                    </span>
                                ) : (
                                    "Continue to Payment"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
