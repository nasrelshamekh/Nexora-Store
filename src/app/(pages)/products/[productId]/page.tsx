import React from 'react';
import { Star, StarHalf, Truck, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    const { data: productData } = (data || {}) as { data: ProductI }

    const allProductsData = await getProducts()
    const allProducts = allProductsData?.data || []
    const filtered = allProducts.filter(
        (p: ProductI) =>
            p.category?._id === productData?.category?._id &&
            p._id !== productData?._id)

    const renderStars = (rating: number = 0) => {
        return [...Array(5)].map((_, index) => {
            const starValue = index + 1;
            if (rating >= starValue) {
                return <Star key={index} className='w-4 h-4 text-amber-500 fill-amber-500' />
            } else if (rating >= starValue - 0.5) {
                return <StarHalf key={index} className='w-4 h-4 text-amber-500 fill-amber-500' />
            } else {
                return <Star key={index} className='w-4 h-4 text-muted-foreground/30' />
            }
        })
    }

    if (!productData) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
                <p className="text-muted-foreground">Product not found.</p>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-background text-foreground transition-colors duration-200'>
            {/* Breadcrumb Header */}
            <div className='border-b border-border bg-card/60 backdrop-blur-md py-6 px-4'>
                <div className='container mx-auto px-2 sm:px-6 lg:px-8'>
                    <Breadcrumb>
                        <BreadcrumbList className="text-sm">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products" className="hover:text-primary transition-colors">Products</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/categories/${productData.category?._id}`} className="hover:text-primary transition-colors">
                                    {productData.category?.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold text-foreground line-clamp-1">{productData.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            {/* Main Product Showcase */}
            <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                    {/* Image Carousel */}
                    <div className="w-full">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {(productData.images || [productData.imageCover]).map((img: string, idx: number) => (
                                    <CarouselItem key={idx}>
                                        <div className='aspect-square bg-muted rounded-3xl overflow-hidden relative border border-border shadow-md'>
                                            <Image
                                                sizes='(max-width: 1024px) 100vw, 50vw'
                                                src={img}
                                                alt={`${productData.title} ${idx + 1}`}
                                                fill
                                                className='object-cover hover:scale-105 transition-transform duration-500'
                                                priority={idx === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-md border-border hover:bg-background" />
                            <CarouselNext className="right-4 bg-background/80 backdrop-blur-md border-border hover:bg-background" />
                        </Carousel>
                    </div>

                    {/* Product Information */}
                    <div className='space-y-6'>
                        {/* Brand & Category Tags */}
                        <div className='flex flex-wrap items-center gap-2'>
                            <Badge variant="outline" className="px-3 py-1 font-bold text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5 rounded-full">
                                {productData.brand?.name}
                            </Badge>
                            <Badge variant="secondary" className="px-3 py-1 font-semibold text-xs rounded-full">
                                {productData.category?.name}
                            </Badge>
                            {productData.subcategory?.length > 0 && (
                                <Badge variant="secondary" className="px-3 py-1 font-semibold text-xs rounded-full">
                                    {productData.subcategory[0]?.name}
                                </Badge>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight'>{productData.title}</h1>

                        {/* Rating & Reviews */}
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-1'>{renderStars(productData.ratingsAverage)}</div>
                            <span className='text-base font-bold'>{productData.ratingsAverage}</span>
                            <span className='text-muted-foreground text-sm'>({productData.ratingsQuantity} reviews)</span>
                        </div>

                        <Separator />

                        {/* Price Display */}
                        <div>
                            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1 font-semibold">Total Price</span>
                            <span className='text-4xl sm:text-5xl font-black text-foreground tracking-tight'>
                                EGP {productData.price?.toFixed(2)}
                            </span>
                        </div>

                        {/* Stock & Sold Telemetry */}
                        <div className='flex items-center justify-between py-2'>
                            <div>
                                {productData.quantity > 0 ? (
                                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>In Stock ({productData.quantity} units ready to ship)</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-semibold text-xs">
                                        <div className='w-2 h-2 bg-red-500 rounded-full' />
                                        <span>Out of Stock</span>
                                    </div>
                                )}
                            </div>
                            <span className='text-muted-foreground text-xs font-medium'>{productData.sold} items sold</span>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3 pt-2'>
                            <AddCartButton prodId={productId} />
                            <AddWishlistButton prodId={productId} />
                        </div>

                        <Separator />

                        {/* Security & Logistics Badges */}
                        <div className='grid grid-cols-3 gap-3'>
                            <div className='flex flex-col items-center text-center p-3.5 rounded-2xl bg-card border border-border shadow-xs'>
                                <div className='p-2 bg-primary/10 rounded-xl text-primary mb-1'>
                                    <Truck className='w-5 h-5' />
                                </div>
                                <span className='text-xs font-bold'>Free Shipping</span>
                                <span className='text-[10px] text-muted-foreground mt-0.5'>Sub-second dispatch</span>
                            </div>
                            <div className='flex flex-col items-center text-center p-3.5 rounded-2xl bg-card border border-border shadow-xs'>
                                <div className='p-2 bg-primary/10 rounded-xl text-primary mb-1'>
                                    <RotateCcw className='w-5 h-5' />
                                </div>
                                <span className='text-xs font-bold'>30-Day Returns</span>
                                <span className='text-[10px] text-muted-foreground mt-0.5'>Hassle-free guarantee</span>
                            </div>
                            <div className='flex flex-col items-center text-center p-3.5 rounded-2xl bg-card border border-border shadow-xs'>
                                <div className='p-2 bg-primary/10 rounded-xl text-primary mb-1'>
                                    <ShieldCheck className='w-5 h-5' />
                                </div>
                                <span className='text-xs font-bold'>100% Authentic</span>
                                <span className='text-[10px] text-muted-foreground mt-0.5'>Verified supplier</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        <div className='space-y-2'>
                            <h2 className='text-lg font-bold uppercase tracking-wider text-foreground'>Product Overview</h2>
                            <p className='text-muted-foreground leading-relaxed text-sm sm:text-base'>{productData.description}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {filtered.length > 0 && (
                    <section className='mt-24 pt-12 border-t border-border'>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">SIMILAR STYLES</span>
                                <h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5'>Related Products</h2>
                            </div>
                            <Link href={`/categories/${productData.category?._id}`} className="text-primary font-semibold hover:underline text-xs sm:text-sm">
                                View More in {productData.category?.name} →
                            </Link>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {filtered.slice(0, 4).map((relatedProduct: ProductI) => (
                                <Card key={relatedProduct._id} className="overflow-hidden rounded-2xl border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                                    <Link href={`/products/${relatedProduct._id}`}>
                                        <div className="relative w-full aspect-square bg-muted overflow-hidden">
                                            <Image
                                                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                                                fill
                                                src={relatedProduct.imageCover}
                                                alt={relatedProduct.title}
                                                className='object-cover hover:scale-105 transition-transform duration-500'
                                            />
                                        </div>
                                        <CardHeader className="p-5">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs font-bold uppercase tracking-wider text-primary">{relatedProduct.brand?.name}</span>
                                                <div className='flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full'>
                                                    <Star className='w-3 h-3 text-amber-500 fill-amber-500' />
                                                    <span className='text-xs font-bold text-amber-600 dark:text-amber-400'>{relatedProduct.ratingsAverage}</span>
                                                </div>
                                            </div>
                                            <CardTitle className='text-sm font-bold line-clamp-2 leading-snug'>{relatedProduct.title}</CardTitle>
                                            <CardDescription className="text-xs mt-1">{productData.category?.name}</CardDescription>
                                            <div className='text-base font-extrabold text-foreground mt-3 pt-2 border-t border-border'>
                                                EGP {relatedProduct.price.toFixed(2)}
                                            </div>
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
