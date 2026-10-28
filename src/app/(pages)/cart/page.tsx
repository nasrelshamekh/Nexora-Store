"use client"

import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  Tag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.action"
import CartItem from "@/components/cart/cart-item"
import { CartDataI, CartI, CartProductI } from "@/interfaces/cart"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { cartContext } from "@/provider/cart-provider"
import { Checkout } from "@/components/cart/checkout"
import { CashCheckout } from "@/components/cart/cash-checkout"
import { NexoraLogo } from "@/components/common/logo"

export default function Cart() {
  const [products, setProducts] = useState<CartProductI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClearCartLoading, setIsClearCartLoading] = useState(false)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const { noOfCartItems, handleCart } = useContext(cartContext)
  const [cart, setCart] = useState<CartI | null>(null)
  const [cartData, setCartData] = useState<CartDataI | null>(null)

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart()
      setProducts(data?.data?.products || [])
      setCart(data)
      setCartData(data?.data || null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleClearCart() {
    try {
      setIsClearCartLoading(true)
      const response = await clearUserCart()

      if (response.message === "success") {
        toast.success("Shopping cart cleared successfully", { position: "top-center" })
      }
      setProducts([])
      setClearDialogOpen(false)
      handleCart()
    } catch (error) {
      console.error(error)
      toast.error("Failed to clear shopping cart", { position: "top-center" })
    } finally {
      setIsClearCartLoading(false)
    }
  }

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault()
    if (!promoCode.trim()) {
      toast.error("Please enter a discount code", { position: "top-center" })
      return
    }
    if (promoCode.trim().toUpperCase() === "NEXORA10" || promoCode.trim().toUpperCase() === "SAVE10") {
      setPromoApplied(true)
      toast.success("Voucher applied! 10% discount will reflect at checkout", { position: "top-center" })
    } else {
      toast.info(`Promo code '${promoCode.trim().toUpperCase()}' applied for eligible catalog items`, { position: "top-center" })
      setPromoApplied(true)
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  /* -------------------------------------------------------------------------- */
  /* LOADING STATE                                                             */
  /* -------------------------------------------------------------------------- */
  if (isLoading) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center p-6 bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
          <NexoraLogo size={52} withGlow className="shadow-xl shadow-purple-500/25 animate-pulse" />
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Nexora Store</h2>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Spinner className="w-3.5 h-3.5" /> Loading your shopping cart...
            </p>
          </div>
        </div>
      </main>
    )
  }

  /* -------------------------------------------------------------------------- */
  /* EMPTY CART STATE                                                          */
  /* -------------------------------------------------------------------------- */
  if (products.length === 0) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background text-foreground">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Visual Icon Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-muted border border-border flex items-center justify-center shadow-lg shadow-black/5 dark:shadow-white/5">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              0
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-3 max-w-md mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your Shopping Cart is Empty
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Looks like you haven&apos;t added any items yet. Explore our curated collections of electronics, fashion, and accessories.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer"
            >
              <Link href="/products" className="inline-flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Explore Catalog
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold border-border hover:bg-accent cursor-pointer"
            >
              <Link href="/categories" className="inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Browse Categories
              </Link>
            </Button>
          </div>

          {/* Trust Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-border/60">
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/30 border border-border/50 text-center space-y-1">
              <Truck className="w-5 h-5 text-primary mb-1" />
              <h3 className="font-semibold text-xs text-foreground">Free Express Delivery</h3>
              <p className="text-[11px] text-muted-foreground">On all orders across Egypt</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/30 border border-border/50 text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1" />
              <h3 className="font-semibold text-xs text-foreground">100% Authentic Items</h3>
              <p className="text-[11px] text-muted-foreground">Directly sourced brand originals</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-muted/30 border border-border/50 text-center space-y-1">
              <RotateCcw className="w-5 h-5 text-primary mb-1" />
              <h3 className="font-semibold text-xs text-foreground">30-Day Easy Returns</h3>
              <p className="text-[11px] text-muted-foreground">Hassle-free refund policy</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /* -------------------------------------------------------------------------- */
  /* POPULATED CART VIEW                                                       */
  /* -------------------------------------------------------------------------- */
  const subtotal = cartData?.totalCartPrice ?? 0

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Shopping Cart</span>
          </nav>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Checkout
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-8">
        {/* Header Title & Clear Cart Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Shopping Cart</h1>
              <Badge variant="secondary" className="text-xs px-2.5 py-1 rounded-full font-mono font-bold">
                {noOfCartItems} {noOfCartItems === 1 ? "item" : "items"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Review your selected products and proceed to secure checkout.
            </p>
          </div>

          {/* Clear Cart Confirmation Dialog */}
          <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs rounded-xl gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all items
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-3xl border border-border bg-card p-6">
              <DialogHeader className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold">Empty your shopping cart?</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-1">
                    Are you sure you want to remove all items from your cart? This action cannot be reversed.
                  </DialogDescription>
                </div>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-0 pt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl cursor-pointer">
                    Keep Items
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleClearCart}
                  disabled={isClearCartLoading}
                  variant="destructive"
                  className="rounded-xl cursor-pointer font-semibold"
                >
                  {isClearCartLoading ? <Spinner className="w-4 h-4 mr-1.5" /> : null}
                  Clear Everything
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert Box */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-300">
              <Truck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold">Free Express Delivery Unlocked!</span> All orders qualify for free standard shipping across Egypt.
              </div>
            </div>

            {/* Product Cards */}
            <div className="space-y-4">
              {products.map((prod) => (
                <CartItem key={prod.product._id} setProducts={setProducts} product={prod} />
              ))}
            </div>

            {/* Shopping Guarantees Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-muted-foreground">
                  100% Genuine Route Goods
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 text-xs">
                <RotateCcw className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-muted-foreground">
                  30-Day Replacement Guarantee
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 text-xs">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-muted-foreground">
                  Dispatched within 24-48 Hours
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Order Summary (4 Columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <Card className="rounded-3xl border border-border shadow-xl bg-card overflow-hidden">
              <CardHeader className="pb-4 bg-muted/20 border-b border-border/60">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold tracking-tight">Order Summary</CardTitle>
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardHeader>

              <CardContent className="space-y-5 pt-5">
                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Subtotal ({noOfCartItems} {noOfCartItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold text-foreground">
                      EGP {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Estimated Shipping</span>
                    <Badge variant="secondary" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                      FREE
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sales Tax & Duties</span>
                    <span className="text-xs text-muted-foreground font-medium">Included</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Voucher Applied
                      </span>
                      <span>Eligible items discounted</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label htmlFor="promo-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Have a discount code?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="promo-input"
                      type="text"
                      placeholder="e.g. NEXORA10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-xl text-xs uppercase font-mono tracking-wider"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="rounded-xl px-4 text-xs font-semibold cursor-pointer shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                </form>

                <Separator />

                {/* Total */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        EGP {subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-right">
                    Final price with free shipping applied
                  </p>
                </div>

                {/* Checkout Trigger Actions */}
                <div className="space-y-2.5 pt-2">
                  {cart && <Checkout cartId={cart.cartId} />}
                  {cart && <CashCheckout cartId={cart.cartId} />}

                  <Button
                    asChild
                    variant="ghost"
                    className="w-full rounded-2xl text-xs py-5 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Link href="/products" className="inline-flex items-center justify-center gap-2">
                      <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Secure Guarantee Chip */}
                <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-muted-foreground">
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Encrypted & powered by Stripe</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
