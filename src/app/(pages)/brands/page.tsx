import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandsI } from '@/interfaces/allbrands'
import { getAllBrands } from '@/services/productServices'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brands() {

  const data = await getAllBrands()
  const { data: brands } = data as { data: BrandsI[] }
  


  return (
    <>
      <main>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {brands.map((brand: BrandsI, index) => {
              return <React.Fragment key={brand._id}>
                <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <Link href={`/brands/${brand._id}`} className="flex-1">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-lg mb-4">
                      <Image
                        width={500}
                        height={500}
                        src={brand.image}
                        alt={brand.name}
                        className='object-cover hover:scale-105 transition-transform duration-300'
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={index < 8}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className='text-center text-xl line-clamp-2'>{brand.name}</CardTitle>
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
