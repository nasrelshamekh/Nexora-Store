import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BrandsI } from "@/interfaces/allbrands"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface BrandCardProps {
  brand: BrandsI
  priority?: boolean
  className?: string
}

export default function BrandCard({ brand, priority = false, className = "" }: BrandCardProps) {
  return (
    <Card
      className={`group flex flex-col h-full rounded-2xl border border-border/80 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden p-0 py-0 gap-0 ${className}`}
    >
      <Link href={`/brands/${brand._id}`} className="flex-1 flex flex-col">
        {/* Brand Logo Presentation Box */}
        <div className="relative w-full aspect-square overflow-hidden bg-muted/20 p-6 flex items-center justify-center">
          <Image
            fill
            src={brand.image}
            alt={brand.name}
            className="object-contain p-4 group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        </div>

        {/* Brand Card Title */}
        <CardHeader className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-border/50">
          <CardTitle className="text-center text-base sm:text-lg font-bold group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
            <span>{brand.name}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  )
}
