import React from 'react';
import { Heart, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
    console.error(error)
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      if (rating >= starValue) {
        return <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
      } else if (rating >= starValue - 0.5) {
        return <StarHalf key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
      } else {
        return <Star key={index} className="w-5 h-5 text-yellow-400" />;
      }
    });
  };

  const isEmpty = wishlistProducts.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <header className="bg-black p-12">
        <div className="container mx-auto px-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Heart className="size-12 text-white fill-white" />
              <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 text-lg mb-8">Start adding products you love!</p>
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </section>
        ) : (
          <>
            <Separator className="mb-8" />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {wishlistProducts.map((product: WishlistProductI, index) => {
                const isInStock = product.quantity > 0;
                
                return (
                  <React.Fragment key={product._id}>
                    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow relative">
                      {/* Remove from Wishlist Button */}
                      <div className="absolute top-3 right-3 z-10">
                        <RemoveWishlistButton prodId={product._id} />
                      </div>

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
                          
                          {/* Out of Stock Overlay */}
                          {!isInStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Badge variant="secondary" className="text-base px-4 py-2">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{product.brand.name}</Badge>
                            <Badge variant="outline">{product.category.name}</Badge>
                          </div>
                          
                          <CardTitle className="text-xl line-clamp-2">
                            {product.title}
                          </CardTitle>
                          
                          <div className="flex items-center gap-1">
                            {renderStars(product.ratingsAverage)}
                            <span className="text-sm ml-1">({product.ratingsAverage})</span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <CardTitle className="text-xl font-semibold">
                              EGP {product.price.toFixed(2)}
                            </CardTitle>
                            {isInStock && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-sm text-gray-600">
                                  {product.quantity} left
                                </span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                      </Link>

                      <CardFooter className="gap-2">
                        <AddCartButton prodId={product._id} />
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