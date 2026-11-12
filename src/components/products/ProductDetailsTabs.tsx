"use client"

import React, { useState } from "react"
import {
  FileText,
  Layers,
  Truck,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Clock,
} from "lucide-react"
import { ProductI } from "@/interfaces/product"

interface ProductDetailsTabsProps {
  product: ProductI
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "shipping">("overview")

  return (
    <div className="mt-12 pt-8 border-t border-border">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-border pb-px overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Product Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "specs"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Specifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "shipping"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Warranty</span>
        </button>
      </div>

      {/* Tabs Body */}
      <div className="py-6">
        {activeTab === "overview" && (
          <div className="space-y-4 max-w-3xl">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {product.description || "No extended overview provided for this product."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Verified Authenticity</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    100% genuine merchandise sourced directly from official brand distributors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Quality Assured</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Pre-inspected packaging to ensure damage-free doorstep delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
              <div className="flex items-center justify-between p-3.5 bg-muted/30 text-xs">
                <span className="text-muted-foreground font-medium">Brand</span>
                <span className="font-bold text-foreground">{product.brand?.name || "Generic"}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 text-xs">
                <span className="text-muted-foreground font-medium">Category</span>
                <span className="font-bold text-foreground">{product.category?.name || "General"}</span>
              </div>
              {product.subcategory?.length > 0 && (
                <div className="flex items-center justify-between p-3.5 bg-muted/30 text-xs">
                  <span className="text-muted-foreground font-medium">Subcategory</span>
                  <span className="font-bold text-foreground">{product.subcategory[0]?.name}</span>
                </div>
              )}
              <div className="flex items-center justify-between p-3.5 text-xs">
                <span className="text-muted-foreground font-medium">Product ID (SKU)</span>
                <span className="font-mono text-muted-foreground text-[11px]">{product._id}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-muted/30 text-xs">
                <span className="text-muted-foreground font-medium">Stock Availability</span>
                <span className="font-bold text-foreground">
                  {product.quantity > 0 ? `${product.quantity} units ready in warehouse` : "Out of stock"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 text-xs">
                <span className="text-muted-foreground font-medium">Customer Rating</span>
                <span className="font-bold text-foreground">
                  ★ {product.ratingsAverage} / 5 ({product.ratingsQuantity} ratings)
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-muted/30 text-xs">
                <span className="text-muted-foreground font-medium">Items Delivered</span>
                <span className="font-bold text-foreground">{product.sold} units sold</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold">Rapid Express Dispatch</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Orders placed before 2:00 PM are processed and handed to local couriers the same business day.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Not satisfied with your order? Request a return or replacement directly from your account within 30 days.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold">Official Buyer Protection</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full money-back guarantee if the item is broken, damaged, or significantly not as described.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
