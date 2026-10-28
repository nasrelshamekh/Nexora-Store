import AddCartButton from '@/components/products/addToCartBtn';
import AddWishlistButton from '@/components/products/addToWishlistBtn';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryItemI } from '@/interfaces/categoryitem';
import { ProductI } from '@/interfaces/product';
import { getProducts, getSpecificCategory } from '@/services/productServices';
import { Package, Star, StarHalf } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function CategoryItem({ params }: { params: Promise<{ categoryId: string }> }) {

    const { categoryId } = await params
    

    const data = await getSpecificCategory(categoryId);
    const { data: categoryData } = data as { data: CategoryItemI }

    const allProductsData = await getProducts()
    const allProducts = allProductsData.data
    const filteredCategoryProducts = allProducts.filter((p: ProductI) => p.category._id === categoryData._id)

 const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            if (rating >= starValue) {
                return <Star key={index} className='w-5 h-5 text-yellow-400 fill-yellow-400' />
            } else if (rating >= starValue - 0.5) {
                return <StarHalf key={index} className='w-5 h-5 text-yellow-400 fill-yellow-400' />
            } else {
                return <Star key={index} className='w-5 h-5 text-yellow-400' />
            }
        })
    }

    if (filteredCategoryProducts.length == 0) {
        return <>
            <div className="flex items-center justify-center min-h-[400px] p-8">
                <div className="text-center max-w-md">
                    <div className="mb-4 flex justify-center">
                        <Package className="w-12 h-12 text-black" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No Products Available
                    </h3>

                    <p className="text-slate-600 mb-6">
                        This category doesn&apos;t have any products listed at the moment.
                    </p>

                    <Button variant="outline" asChild>
                        <Link href="/categories">Back to Categories</Link>
                    </Button>
                </div>
            </div>
        </>
    }

    return (
        <>
            <main>
                <div className="container mx-auto p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {filteredCategoryProducts.map((product: ProductI, index: number) => {
                            return <React.Fragment key={product._id}>
                                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                                    <Link href={`/products/${product._id}`} className="flex-1">
                                        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg mb-4">
                                            <Image
                                                fill
                                                src={product.imageCover}
                                                alt={product.title}
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                priority={index < 8}
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardDescription>{product.brand.name}</CardDescription>
                                            <CardTitle className='text-xl line-clamp-2'>{product.title}</CardTitle>
                                            <CardDescription>{product.category.name}</CardDescription>
                                            <div className="flex items-center gap-1">
                                                {renderStars(product.ratingsAverage)}
                                                <span>({product.ratingsAverage})</span>
                                            </div>

                                            <CardTitle className="text-xl font-semibold">EGP {product.price.toFixed(2)}</CardTitle>
                                        </CardHeader>
                                    </Link>
                                    <CardFooter className="gap-2">
                                        <AddCartButton prodId={product._id} />
                                        <AddWishlistButton prodId={product._id}/>
                                    </CardFooter>
                                </Card>
                            </React.Fragment>
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}
