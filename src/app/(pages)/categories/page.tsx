import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { allCategoriesI } from '@/interfaces/allcategories'
import { getAllCategories } from '@/services/productServices'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {

  const data = await getAllCategories()

  const { data: categories } = data as { data: allCategoriesI[] }

  return (
    <>
      <main>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {categories.map((category: allCategoriesI, index) => {
              return <React.Fragment key={category._id}>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <Link href={`/categories/${category._id}`} className="flex-1">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg mb-4">
                      <Image
                        fill
                        src={category.image}
                        alt={category.name}
                        className='object-cover hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={index < 8}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className='text-center text-xl line-clamp-2'>{category.name}</CardTitle>
                    </CardHeader>
                  </Link>
                </Card>
              </React.Fragment>
            })}
          </div>
        </div>
      </main>
    </>
  )
}
