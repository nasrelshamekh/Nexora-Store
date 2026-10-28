import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { CartProductI } from '@/interfaces/cart'
import { deleteCartProduct, updateCartProductCount } from '@/actions/cart.action'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/provider/cart-provider'

export default function CartItem({ product, setProducts }: { product: CartProductI, setProducts: (products: CartProductI[]) => void }) {

    const [isLoading, setIsLoading] = useState(false)
    const {handleCart} = useContext(cartContext)

    async function deleteProduct(productId: string) {
        try {
            setIsLoading(true)
            const data = await deleteCartProduct(productId)
            
            if (data.status == "success") {
                toast.success("Product removed successfully", { position: "top-center" })
            }
            setProducts(data.data.products)
            handleCart()
        } catch (error) {
            console.error(error)
            toast.error("Error occurred", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    async function updateProductCount(id: string, newCount: number) {
        try {
            setIsLoading(true)
            const response = await updateCartProductCount(id, newCount)
            
            toast.success("Product quantity updated successfully", { position: "top-center" })
            setProducts(response.data.products)
            handleCart()
        } catch (error) {
            console.error(error)
            toast.error("Error occurred", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>

            <div
                className="flex flex-col sm:flex-row gap-5 p-5 bg-gray-50/50 rounded-2xl border border-gray-200"
            >
                {/* Product Image */}
                <div className="w-full sm:w-32 lg:h-40 bg-gray-200 rounded-2xl overflow-hidden border">
                    <Image
                        src={product.product.imageCover}
                        width={400}
                        height={400}
                        alt={product.product.title}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                            {product.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{product.product.category.name}</p>
                    </div>

                    <div className="flex items-end justify-between mt-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                            <Button disabled={isLoading}
                                onClick={() => {
                                    if (product.count <= 1) {
                                        deleteProduct(product.product._id);
                                    } else {
                                        updateProductCount(product.product._id, product.count - 1);
                                    }
                                }}
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-full border-gray-300 cursor-pointer hover:bg-accent disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-bold w-12 text-center">{isLoading ? <Spinner className='text-lg font-bold w-12 text-center'/> : <>
                            {product.count}
                            </>}
                            </span>
                            <Button
                                disabled={isLoading}
                                onClick={() => { updateProductCount(product.product._id, product.count + 1) }}
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-full border-gray-300 cursor-pointer hover:bg-accent disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <p className="text-2xl font-bold">EGP {product.price * product.count}</p>
                            <p className="text-sm text-muted-foreground">{product.count} x EGP {product.price}</p>
                        </div>
                    </div>

                    {/* Remove Button */}
                    <Button onClick={() => { deleteProduct(product.product._id) }}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50/70 
                        self-start sm:self-end mt-4 sm:mt-0
                        h-9 px-3 rounded-lg
                        transition-all cursor-pointer"
                    >
                        {isLoading ? <Spinner /> : <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                        </>}
                    </Button>
                </div>
            </div>

        </>
    )
}
