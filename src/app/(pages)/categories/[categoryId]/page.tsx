import AddCartButton from '@/components/products/addToCartBtn';
import AddWishlistButton from '@/components/products/addToWishlistBtn';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategoryItemI } from '@/interfaces/categoryitem';
import { ProductI } from '@/interfaces/product';
import { getProducts, getSpecificCategory } from '@/services/productServices';
import { Package, Star, StarHalf, ArrowLeft } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function CategoryItem({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;

  const data = await getSpecificCategory(categoryId);
  const { data: categoryData } = data as { data: CategoryItemI };

  const allProductsData = await getProducts();
  const allProducts = allProductsData.data;
  const filteredCategoryProducts = allProducts.filter((p: ProductI) => p.category._id === categoryData._id);

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

  if (filteredCategoryProducts.length === 0) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center p-6 bg-background text-foreground transition-colors">
        <div className="text-center max-w-md space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-muted/60 border border-border flex items-center justify-center mx-auto shadow-sm">
            <Package className="w-10 h-10 text-muted-foreground" strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-bold tracking-tight">
            No Products Available
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {categoryData?.name || 'This category'} does not have any items listed in our store catalog at the moment.
          </p>

          <Button variant="outline" asChild className="rounded-full px-6 cursor-pointer">
            <Link href="/categories" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Category Hero Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {categoryData?.image ? (
                <div className="relative w-20 h-20 rounded-2xl bg-card border border-border p-1 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                  <Image
                    src={categoryData.image}
                    alt={categoryData.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              ) : null}
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                  <span>/</span>
                  <span className="text-foreground font-medium">{categoryData.name}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{categoryData.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Official catalog collection and curated department items
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border">
              {filteredCategoryProducts.length} {filteredCategoryProducts.length === 1 ? 'Product Available' : 'Products Available'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategoryProducts.map((product: ProductI, index: number) => {
            return (
              <React.Fragment key={product._id}>
                <Card className="group flex flex-col h-full rounded-2xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                    </div>
                    <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <Badge variant="secondary" className="text-[11px] font-medium rounded-md px-2 py-0.5">
                            {product.brand.name}
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

                        <div className="pt-1 border-t border-border/50">
                          <span className="text-lg font-bold text-foreground">
                            EGP {product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>

                  <CardFooter className="p-4 sm:p-5 pt-0 gap-2">
                    <div className="flex-1">
                      <AddCartButton prodId={product._id} />
                    </div>
                    <AddWishlistButton prodId={product._id} />
                  </CardFooter>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}
