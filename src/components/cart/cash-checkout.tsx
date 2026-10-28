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
import { checkoutCashUser } from "@/actions/cart.action"
import { toast } from "sonner"
import { useContext } from "react"
import { cartContext } from "@/provider/cart-provider"
import { CheckoutFormValues, checkoutSchema } from "@/schema/checkout.schema"
import { zodResolver } from "@hookform/resolvers/zod"

export function CashCheckout({ cartId }: { cartId: string }) {
    const { handleCart } = useContext(cartContext)
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

    async function handleCashCheckout(values: CheckoutFormValues) {
        try {
            const response = await checkoutCashUser(values, cartId)
            if (response.status === "success") {
                toast.success("Order has been placed successfully!", { position: "top-center" })
                handleCart()
                window.location.href = "/allorders"
            } else {
                toast.error(response.message || "Failed to place cash order", { position: "top-center" })
            }
        } catch (error) {
            toast.error((error as Error).message || "Error placing order", { position: "top-center" })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full rounded-full text-lg py-7 font-semibold bg-black hover:bg-gray-900 cursor-pointer">
                    Proceed to Cash Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Fill in the following fields to proceed.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCashCheckout)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="shippingAddress.details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="shippingAddress.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="shippingAddress.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="tel"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="cursor-pointer" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer">{form.formState.isSubmitting ? <Spinner /> : "Checkout"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
