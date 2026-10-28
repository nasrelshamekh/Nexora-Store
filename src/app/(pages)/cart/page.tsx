"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

import { clearUserCart, getLoggedUserCart } from "@/actions/cart.action";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "@/components/cart/cart-item";
import { CartDataI, CartI, CartProductI } from "@/interfaces/cart";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { cartContext } from "@/provider/cart-provider";
import { Checkout } from "@/components/cart/checkout";
import { CashCheckout } from "@/components/cart/cash-checkout";

export default function Cart() {
  const [products, setProducts] = useState<CartProductI[] | []>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isClearCartLoading, setIsClearCartLoading] = useState(false)
  const {noOfCartItems, handleCart} = useContext(cartContext)
  const [cart, setCart] = useState<CartI | null>(null)
  const [cartData, setCartData] = useState<CartDataI | null>(null)

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart()
      
      setProducts(data.data.products)
      setCart(data)
      setCartData(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function clearCart() {
    try {
      setIsClearCartLoading(true)
      const response = await clearUserCart()
      
      if (response.message == "success") {
        toast.success("Cart cleared successfully", { position: "top-center" })
      }
      setProducts([])
      handleCart()
    } catch (error) {
      console.error(error)
      toast.error("Error occurred", { position: "top-center" })
    } finally {
      setIsClearCartLoading(false)
    }

  }

  useEffect(() => {
    getUserCart()
  }, [])


  if (isLoading) {
    return <>
      <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
        <div className="flex justify-center items-center gap-3">
          <Avatar className="rounded-lg text-xl flex items-center justify-center font-bold bg-black text-white size-9">
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <span className="font-bold text-2xl">Nexora</span>
        </div>
        <Spinner className="size-12" />
      </div>
    </>
  }

  if (products.length == 0) {
    return <>
      <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
        <span className="font-bold text-2xl">Cart is empty</span>
        <Link href={"/products"}><Button className="cursor-pointer">Shop Now!</Button></Link>
      </div>
    </>
  }




  return (
    <>
      <div className="container mx-auto p-5 md:p-6">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">{noOfCartItems} items in your cart</p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="space-y-6 pt-4">
                {products.map((prod) => <React.Fragment key={prod.product._id}><CartItem setProducts={setProducts} product={prod} /></React.Fragment>)}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg rounded-3xl overflow-hidden h-fit  top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-5 text-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({noOfCartItems} items)</span>
                    <span className="font-bold">EGP {cartData?.totalCartPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-3xl font-bold">EGP {cartData?.totalCartPrice ?? 0}</span>
                </div>

                <div className="space-y-3">
                  {cart && <Checkout cartId={cart?.cartId}/>}
                  {cart && <CashCheckout cartId={cart?.cartId}/>}
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full text-lg py-6 cursor-pointer">
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>

                <Button onClick={clearCart} variant="ghost" className="w-full text-red-600 hover:bg-red-50 cursor-pointer">
                  {isClearCartLoading ? <Spinner /> : <>
                    <Trash2 />
                    Clear cart
                  </>}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}