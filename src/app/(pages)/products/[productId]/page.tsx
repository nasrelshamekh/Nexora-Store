import React from 'react';
import { Star, StarHalf, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { getProducts, getSpecificProduct } from '@/services/productServices';
import { ProductI } from './../../../../interfaces/product';


import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import AddCartButton from '@/components/products/addToCartBtn';
import AddWishlistButton from '@/components/products/addToWishlistBtn';

export default async function ProductDetails({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params
    


    const data = await getSpecificProduct(productId);
    const { data: productData } = data as { data: ProductI }

    const allProductsData = await getProducts()
    const allProducts = allProductsData.data
    const filtered = allProducts.filter(
        (p: ProductI) =>
            p.category._id === productData.category._id &&
            p._id !== productData._id)


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


    return (
        <div className='min-h-screen bg-white'>
            {/* Breadcrumb */}
            <div className='bg-black p-12'>
                <div className='container mx-auto'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/categories/${productData.category._id}`}>
                                    {productData.category.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{productData.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Main Content */}
            <main className='container mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                    {/* Image Carousel */}
                    <Carousel className="w-full">
                        <CarouselContent>
                            {productData.images.map((img: string, idx: number) => (
                                <CarouselItem key={idx}>
                                    <div className='aspect-square bg-gray-100 rounded-lg overflow-hidden relative'>
                                        <Image
                                            sizes='(max-width: 1024px) 100vw, 50vw'
                                            src={img}
                                            alt={`${productData.title} ${idx + 1}`}
                                            fill
                                            className='object-cover'
                                            priority={idx === 0}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>

                    {/* productData Info */}
                    <div className='space-y-6'>
                        {/* Brand & Category */}
                        <div className='flex items-center gap-2'>
                            <Badge variant="secondary">{productData.brand.name}</Badge>
                            <Badge variant="secondary">{productData.category.name}</Badge>
                            {productData.subcategory.length > 0 && (
                                <Badge variant="secondary">{productData.subcategory[0].name}</Badge>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className='text-4xl font-bold'>{productData.title}</h1>

                        {/* Rating */}
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-1'>{renderStars(productData.ratingsAverage)}</div>
                            <span className='text-lg font-semibold'>{productData.ratingsAverage}</span>
                            <span className='text-gray-600'>({productData.ratingsQuantity} reviews)</span>
                        </div>

                        <Separator />

                        {/* Price */}
                        <div>
                            <span className='text-5xl font-bold'>EGP {productData.price.toFixed(2)}</span>
                        </div>

                        {/* Stock Status */}
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                {productData.quantity > 0 ? (
                                    <>
                                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                        <span className='font-medium'>In Stock ({productData.quantity})</span>
                                    </>
                                ) : (
                                    <>
                                        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                        <span className='font-medium text-red-600'>Out of Stock</span>
                                    </>
                                )}
                            </div>
                            <span className='text-gray-600'>{productData.sold} sold</span>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3'>
                            <AddCartButton prodId={productId as string}/>
                            <AddWishlistButton prodId={productId as string}/>
                        </div>

                        <Separator />

                        {/* Features */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col items-center text-center gap-2'>
                                <div className='p-3 bg-gray-100 rounded-full'>
                                    <Truck className='w-6 h-6' />
                                </div>
                                <span className='text-sm font-medium'>Free Shipping</span>
                            </div>
                            <div className='flex flex-col items-center text-center gap-2'>
                                <div className='p-3 bg-gray-100 rounded-full'>
                                    <RotateCcw className='w-6 h-6' />
                                </div>
                                <span className='text-sm font-medium'>30 Day Returns</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className='space-y-2'>
                            <h2 className='text-xl font-bold'>Description</h2>
                            <p className='text-gray-700 leading-relaxed'>{productData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {filtered.length > 0 && (
                    <section className='mt-20'>
                        <Separator className="mb-12" />
                        <h2 className='text-3xl font-bold mb-8 text-center'>Related Products</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {filtered.slice(0, 4).map((relatedProduct: ProductI) => (
                                <Card key={relatedProduct._id} className="overflow-hidden">
                                    <Link href={`/products/${relatedProduct._id}`}>
                                        <div className="relative w-full h-64 mb-3">
                                            <Image
                                                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                                                fill
                                                src={relatedProduct.imageCover}
                                                alt={relatedProduct.title}
                                                className='object-cover'
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardDescription>{relatedProduct.brand.name}</CardDescription>
                                            <CardTitle className='text-lg line-clamp-2'>{relatedProduct.title}</CardTitle>
                                            <CardDescription>{productData.category.name}</CardDescription>
                                            <div className='flex items-center gap-1 mt-2'>
                                                {renderStars(relatedProduct.ratingsAverage)}
                                                <span className="text-sm ml-1">({relatedProduct.ratingsAverage})</span>
                                            </div>
                                            <CardTitle className='text-xl mt-2'>
                                                EGP {relatedProduct.price.toFixed(2)}
                                            </CardTitle>
                                        </CardHeader>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}