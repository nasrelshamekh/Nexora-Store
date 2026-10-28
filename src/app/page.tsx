import React from 'react';
import { ChevronRight, Star, Sparkles, Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getAllCategories, getProducts } from '@/services/productServices';
import { ProductI } from '@/interfaces/product';
import { allCategoriesI } from './../interfaces/allcategories';
import Image from 'next/image';
import AddCartButton from '@/components/products/addToCartBtn';
import AddWishlistButton from '@/components/products/addToWishlistBtn';

export default async function Home() {
  const data = await getProducts()
  const { data: featuredProducts } = data as { data: ProductI[] }
  const categoryData = await getAllCategories()
  const categories = (categoryData?.data || []) as allCategoriesI[]

  const getRandomProducts = (products: ProductI[] = [], count: number): ProductI[] => {
    if (!products || products.length === 0) return []
    const shuffled = [...products].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const randomProducts: ProductI[] = getRandomProducts(featuredProducts, 4)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative min-h-[580px] md:min-h-[660px] overflow-hidden bg-gradient-to-br from-[#090611] via-[#100a20] to-[#1e0e38] text-white flex items-center justify-center border-b border-border/50">
        {/* Layered Radiant Glow Orbs */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-fuchsia-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            {/* Announcement Badge with Live Beacon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg shadow-purple-500/10 hover:border-purple-400/50 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="font-mono tracking-wider uppercase text-[11px] text-purple-200">
                Winter 2026 Collection
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Next-Gen Digital <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                Commerce Experience
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Curated luxury fashion, high-performance electronics, and lifestyle essentials with sub-second cart sync and express delivery across Egypt.
            </p>

            {/* Value Highlights Pill Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-neutral-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <Zap className="w-3.5 h-3.5 text-purple-400" /> Fast Route Checkout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Brand Authenticity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                <Truck className="w-3.5 h-3.5 text-purple-400" /> Free Doorstep Shipping
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-6 font-bold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer h-13 text-sm sm:text-base border border-purple-400/30"
              >
                <Link href="/products" className="inline-flex items-center gap-2">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto rounded-full px-8 py-6 font-semibold text-white border border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/40 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer h-13 text-sm sm:text-base shadow-sm"
              >
                <Link href="/categories">
                  <span>Shop Categories</span>
                </Link>
              </Button>
            </div>

            {/* Social Proof Counters */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 max-w-lg mx-auto gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">15,000+</p>
                <p className="text-[11px] sm:text-xs text-neutral-400">Happy Shoppers</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-xl sm:text-2xl font-extrabold text-white">4.9 ★</p>
                <p className="text-[11px] sm:text-xs text-neutral-400">Customer Rating</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">24-48h</p>
                <p className="text-[11px] sm:text-xs text-neutral-400">Express Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Value Proposition Strip */}
      <section className="border-y border-border bg-card/60 backdrop-blur-md py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Free Express Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders over EGP 500</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">100% Secure Checkout</p>
                <p className="text-xs text-muted-foreground">Stripe & Cash on Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">30-Day Free Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free money back</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">24/7 Dedicated Support</p>
                <p className="text-xs text-muted-foreground">Live chat & instant assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">CURATED SELECTION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Shop by Category</h2>
          </div>
          <Link href={"/categories"} className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm">
            <span>Browse All Categories</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category: allCategoriesI) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group relative overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-square bg-muted">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src={category.image}
                  alt={category.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-neutral-300 text-xs mt-1 flex items-center gap-1 font-medium">
                    <span>Shop Collection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 border-t border-border py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">TOP PICKS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Featured Products</h2>
            </div>
            <Link href={"/products"} className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm">
              <span>View All Products</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
              <div key={product.id} className="flex">
                <Card className="flex flex-col h-full w-full overflow-hidden rounded-2xl border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                  <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
                    <div className="relative w-full aspect-square overflow-hidden bg-muted">
                      <Image
                        fill
                        src={product.imageCover}
                        alt={product.title}
                        className='object-cover hover:scale-105 transition-transform duration-500'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardHeader className="flex-1 p-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{product.brand?.name}</span>
                        <div className='flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-full'>
                          <Star className='w-3.5 h-3.5 text-amber-500 fill-amber-500' />
                          <span className='text-xs font-bold text-amber-600 dark:text-amber-400'>{product.ratingsAverage}</span>
                        </div>
                      </div>

                      <CardTitle className='text-base font-bold line-clamp-2 leading-snug hover:text-primary transition-colors'>
                        {product.title}
                      </CardTitle>
                      <CardDescription className='text-xs text-muted-foreground mt-1 line-clamp-1'>
                        {product.category?.name}
                      </CardDescription>

                      <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground block">Price</span>
                          <span className='text-xl font-extrabold text-foreground'>EGP {product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                  <CardFooter className='p-5 pt-0 gap-2'>
                    <AddCartButton prodId={product._id} />
                    <AddWishlistButton prodId={product._id} />
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
