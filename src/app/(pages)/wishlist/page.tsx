import React from 'react';
import { Heart, Star, StarHalf, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getLoggedUserWishlist } from '@/actions/wishlist.action';
import { WishlistProductI } from '@/interfaces/wishlistproduct';
import AddCartButton from '@/components/products/addToCartBtn';
import RemoveWishlistButton from '@/components/wishlist/removeFromWishlistBtn';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  let wishlistProducts: WishlistProductI[] = [];
  
  try {
    const wishlistData = await getLoggedUserWishlist();
    wishlistProducts = wishlistData.data || [];
  } catch (error) {
    console.error(error);
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      if (rating >= starValue) {
        return <Star key={index} className="w-4 h-4 text-amber-400 fill-amber-400" />;
      } else if (rating >= starValue - 0.5) {
        return <StarHalf key={index} className="w-4 h-4 text-amber-400 fill-amber-400" />;
      } else {
        return <Star key={index} className="w-4 h-4 text-muted-foreground/30" />;
      }
    });
  };

  const isEmpty = wishlistProducts.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <Heart className="w-7 h-7 fill-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">My Wishlist</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Curate and organize your favorite pieces for future purchase
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'saved item' : 'saved items'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-muted/60 border border-border flex items-center justify-center mb-6 shadow-sm">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Explore our wide catalog of high-performance fashion, electronics, and daily essentials to save your top picks.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer">
              <Link href="/products" className="inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </section>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product: WishlistProductI, index) => {
                const isInStock = product.quantity > 0;
                
                return (
                  <React.Fragment key={product._id}>
                    <Card className="group flex flex-col h-full rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                      {/* Remove from Wishlist Button */}
                      <div className="absolute top-3 right-3 z-20">
                        <div className="rounded-full bg-background/80 backdrop-blur-md p-1 shadow-sm border border-border/60 hover:bg-background transition">
                          <RemoveWishlistButton prodId={product._id} />
                        </div>
                      </div>

                      <Link href={`/products/${product._id}`} className="flex-1 flex flex-col">
                        <div className="relative w-full aspect-square overflow-hidden bg-muted/30">
                          <Image
                            fill
                            src={product.imageCover}
                            alt={product.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            priority={index < 4}
                          />
                          
                          {/* Out of Stock Overlay */}
                          {!isInStock && (
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center">
                              <Badge variant="destructive" className="text-xs px-3 py-1 font-semibold">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                              <Badge variant="secondary" className="text-[11px] font-medium rounded-md px-2 py-0.5">
                                {product.brand.name}
                              </Badge>
                              <Badge variant="outline" className="text-[11px] text-muted-foreground rounded-md px-2 py-0.5">
                                {product.category.name}
                              </Badge>
                            </div>
                            
                            <CardTitle className="text-base font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-2">
                              {product.title}
                            </CardTitle>
                          </div>
                          
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                {renderStars(product.ratingsAverage)}
                              </div>
                              <span className="text-xs font-semibold text-muted-foreground">
                                {product.ratingsAverage}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-border/50">
                              <span className="text-lg font-bold text-foreground">
                                EGP {product.price.toFixed(2)}
                              </span>
                              {isInStock ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                  </span>
                                  <span className="text-xs text-muted-foreground font-medium">
                                    {product.quantity} left
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-rose-500 font-medium">Sold Out</span>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </Link>

                      <CardFooter className="p-4 sm:p-5 pt-0">
                        <div className="w-full">
                          <AddCartButton prodId={product._id} />
                        </div>
                      </CardFooter>
                    </Card>
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
