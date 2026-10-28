
import { ProductI } from '@/interfaces/product'
import { getProducts } from '@/services/productServices'
import React from "react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Star, StarHalf } from 'lucide-react'
import Link from 'next/link'
import AddCartButton from '@/components/products/addToCartBtn'
import AddWishlistButton from '@/components/products/addToWishlistBtn'

export default async function Products() {
  const data = await getProducts()
  
  const { data: products } = data as { data: ProductI[] }

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
    <>
      <main>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {products.map((product: ProductI, index) => {
              return <React.Fragment key={product._id}>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <Link href={`/products/${product._id}`} className="flex-1">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg mb-4">
                      <Image
                        fill
                        src={product.imageCover}
                        alt={product.title}
                        className='object-cover hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={index < 8}
                      />
                    </div>
                    <CardHeader>
                      <CardDescription>{product.brand.name}</CardDescription>
                      <CardTitle className='text-xl line-clamp-2'>{product.title}</CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                      <div className='flex items-center gap-1'>
                        {renderStars(product.ratingsAverage)}
                        <span>({product.ratingsAverage})</span>
                      </div>

                      <CardTitle className='text-xl font-semibold'>EGP {product.price.toFixed(2)}</CardTitle>
                    </CardHeader>
                  </Link>
                  <CardFooter className='gap-2'>
                    <AddCartButton prodId={product._id}/>
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