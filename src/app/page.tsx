import React from 'react';
import { ChevronRight, Star, StarHalf } from 'lucide-react';
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
  const categories = categoryData.data as allCategoriesI[]

  const getRandomProducts = (products: ProductI[], count: number): ProductI[] => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const randomProducts: ProductI[] = getRandomProducts(featuredProducts, 4)

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
    <div className="min-h-screen bg-gray-50">


      {/* Hero Section */}
      <section className="relative h-150 bg-black text-white flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">New Season Arrivals</h2>
            <p className="text-xl mb-8 text-gray-300">Discover the latest trends in fashion and technology.</p>
            <Link href={"/products"}>
              <Button className="bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105 cursor-pointer">
                <span>Shop Now</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-5 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category: allCategoriesI) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="relative aspect-square">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  src={category.image}
                  alt={category.name}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end">
                <h4 className="text-white text-2xl font-bold p-6">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Products</h3>
            <Link href={"/products"} className="text-black font-semibold hover:text-gray-700 flex items-center">
              View All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden">
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <Link href={`/products/${product._id}`} className="flex-1">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg mb-4">
                      <Image
                        fill
                        src={product.imageCover}
                        alt={product.title}
                        className='object-cover hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardHeader>
                      <CardDescription>{product.brand.name}</CardDescription>
                      <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                      <div className='flex items-center gap-1'>
                        {renderStars(product.ratingsAverage)}
                        <span className='text font-semibold'>({product.ratingsAverage})</span>
                      </div>
                      <CardTitle className='text-xl font-semibold'>EGP {product.price.toFixed(2)}</CardTitle>
                    </CardHeader>
                  </Link>
                  <CardFooter className='gap-2'>
                    <AddCartButton prodId={product._id}/>
                    <AddWishlistButton prodId={product._id}/>
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