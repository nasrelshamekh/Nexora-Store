"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
  title: string
}

export default function ProductImageGallery({ images = [], title }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const imageList = images && images.length > 0 ? images : ["/placeholder.png"]
  const currentImage = imageList[selectedIndex] || imageList[0]

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-card border border-border/80 shadow-md group">
        <Image
          src={currentImage}
          alt={`${title} - view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[11px] font-bold text-foreground shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Official Store</span>
          </div>
        </div>

        {/* Image Counter Badge */}
        {imageList.length > 1 && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[11px] font-mono font-semibold text-muted-foreground shadow-xs">
            {selectedIndex + 1} / {imageList.length}
          </div>
        )}

        {/* Carousel Arrow Controls */}
        {imageList.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background cursor-pointer shadow-md"
              title="Previous image"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background cursor-pointer shadow-md"
              title="Next image"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar">
          {imageList.map((img, idx) => {
            const isSelected = selectedIndex === idx
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer border-2 bg-muted/30 ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 scale-102 shadow-md"
                    : "border-border/80 hover:border-border opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
