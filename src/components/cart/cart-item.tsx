"use client"

import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CartProductI } from '@/interfaces/cart'
import { deleteCartProduct, updateCartProductCount } from '@/actions/cart.action'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/provider/cart-provider'

interface CartItemProps {
    product: CartProductI;
    setProducts: (products: CartProductI[]) => void;
}

export default function CartItem({ product, setProducts }: CartItemProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)

    async function deleteProduct(productId: string) {
        try {
            setIsLoading(true)
            const data = await deleteCartProduct(productId)

            if (data.status === "success") {
                toast.success("Product removed from cart", { position: "top-center" })
            }
            setProducts(data.data.products)
            handleCart()
        } catch (error) {
            console.error(error)
            toast.error("Error removing product", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    async function updateProductCount(id: string, newCount: number) {
        try {
            setIsLoading(true)
            const response = await updateCartProductCount(id, newCount)

            toast.success("Quantity updated", { position: "top-center" })
            setProducts(response.data.products)
            handleCart()
        } catch (error) {
            console.error(error)
            toast.error("Error updating quantity", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    const itemTotal = (product.price * product.count).toLocaleString()
    const unitPrice = product.price.toLocaleString()
    const productId = product.product?._id
    const productTitle = product.product?.title || "Product Item"
    const categoryName = product.product?.category?.name || "Catalog"
    const brandName = product.product?.brand?.name

    return (
        <article className="group relative flex flex-col sm:flex-row gap-5 p-5 md:p-6 bg-card text-card-foreground rounded-2xl border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-200">
            {/* Product Image with link */}
            <Link
                href={`/products/${productId}`}
                className="relative w-full sm:w-36 h-36 shrink-0 bg-muted rounded-xl overflow-hidden border border-border/60 group-hover:border-foreground/30 transition-colors"
            >
                <Image
                    src={product.product?.imageCover || "/placeholder.png"}
                    alt={productTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                />
            </Link>

            {/* Product Information & Controls */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="space-y-1.5">
                    {/* Category & Brand Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md">
                            {categoryName}
                        </Badge>
                        {brandName && (
                            <span className="text-xs text-muted-foreground font-medium">
                                by <span className="text-foreground">{brandName}</span>
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <Link
                        href={`/products/${productId}`}
                        className="font-semibold text-base sm:text-lg hover:underline transition-colors line-clamp-2 leading-snug"
                        title={productTitle}
                    >
                        {productTitle}
                    </Link>

                    {/* Stock Status */}
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>In Stock • Ready to ship</span>
                    </div>
                </div>

                {/* Bottom Row: Stepper & Pricing */}
                <div className="flex flex-wrap items-end justify-between gap-4 mt-5 pt-3 border-t border-border/60">
                    {/* Stepper + Remove combo */}
                    <div className="flex items-center gap-3">
                        {/* Quantity Stepper Pill */}
                        <div className="inline-flex items-center gap-1 bg-muted/60 dark:bg-neutral-900/80 p-1 rounded-full border border-border">
                            <Button
                                disabled={isLoading}
                                onClick={() => {
                                    if (product.count <= 1) {
                                        deleteProduct(productId)
                                    } else {
                                        updateProductCount(productId, product.count - 1)
                                    }
                                }}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-background transition cursor-pointer disabled:opacity-50"
                                title={product.count <= 1 ? "Remove item" : "Decrease quantity"}
                            >
                                {product.count <= 1 ? (
                                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                ) : (
                                    <Minus className="h-3.5 w-3.5" />
                                )}
                            </Button>

                            <span className="text-sm font-bold min-w-[2.25rem] text-center font-mono tabular-nums">
                                {isLoading ? <Spinner className="h-3.5 w-3.5 inline" /> : product.count}
                            </span>

                            <Button
                                disabled={isLoading}
                                onClick={() => updateProductCount(productId, product.count + 1)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-background transition cursor-pointer disabled:opacity-50"
                                title="Increase quantity"
                            >
                                <Plus className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        {/* Direct Remove Action */}
                        <Button
                            onClick={() => deleteProduct(productId)}
                            disabled={isLoading}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 px-2.5 rounded-lg text-xs transition cursor-pointer hidden sm:inline-flex"
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove
                        </Button>
                    </div>

                    {/* Price Block */}
                    <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                            EGP {itemTotal}
                        </p>
                        {product.count > 1 && (
                            <p className="text-xs text-muted-foreground font-mono">
                                EGP {unitPrice} each
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}
