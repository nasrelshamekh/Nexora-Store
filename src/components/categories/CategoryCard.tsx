import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { allCategoriesI } from "@/interfaces/allcategories"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryCardProps {
  category: allCategoriesI
  priority?: boolean
  className?: string
}

export default function CategoryCard({
  category,
  priority = false,
  className = "",
}: CategoryCardProps) {
  return (
    <Card
      className={`group flex flex-col h-full rounded-2xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden ${className}`}
    >
      <Link href={`/categories/${category._id}`} className="flex-1 flex flex-col">
        {/* Category Image with Atmospheric Gradient */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted/30">
          <Image
            fill
            src={category.image}
            alt={category.name}
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Category Footer Label */}
        <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-border/50 bg-card">
          <CardTitle className="text-center text-base sm:text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
            <span>{category.name}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  )
}
