import React from 'react';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { getLoggedUserWishlist } from '@/actions/wishlist.action';
import { WishlistProductI } from '@/interfaces/wishlistproduct';
import ProductCard from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  let wishlistProducts: WishlistProductI[] = [];
  
  try {
    const wishlistData = await getLoggedUserWishlist();
    wishlistProducts = wishlistData.data || [];
  } catch (error) {
    console.error(error);
  }

  const isEmpty = wishlistProducts.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
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
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border whitespace-nowrap shrink-0">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'saved item' : 'saved items'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product: WishlistProductI, index: number) => (
              <ProductCard
                key={product._id}
                product={product}
                variant="wishlist"
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
