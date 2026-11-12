"use client"

import React, { useState, useMemo, useTransition } from "react"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  X,
  PackageOpen,
  LayoutGrid,
  Grid3X3,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"

import { ProductI } from "@/interfaces/product"
import { allCategoriesI } from "@/interfaces/allcategories"
import { BrandsI } from "@/interfaces/allbrands"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProductCard from "@/components/products/ProductCard"

type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc" | "popular" | "name-asc"
type PriceBracket = "all" | "under-500" | "500-1500" | "1500-3000" | "above-3000"

interface ProductCatalogClientProps {
  initialProducts: ProductI[]
  categories: allCategoriesI[]
  brands: BrandsI[]
}

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured (Default)",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "rating-desc": "Highest Rated",
  popular: "Most Popular",
  "name-asc": "Name: A to Z",
}

const PRICE_BRACKETS: { id: PriceBracket; label: string }[] = [
  { id: "all", label: "All Prices" },
  { id: "under-500", label: "Under EGP 500" },
  { id: "500-1500", label: "EGP 500 – 1,500" },
  { id: "1500-3000", label: "EGP 1,500 – 3,000" },
  { id: "above-3000", label: "Above EGP 3,000" },
]

export default function ProductCatalogClient({
  initialProducts = [],
  categories = [],
  brands = [],
}: ProductCatalogClientProps) {
  const [, startTransition] = useTransition()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [priceBracket, setPriceBracket] = useState<PriceBracket>("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [layoutMode, setLayoutMode] = useState<"standard" | "compact">("standard")

  // Category counts
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>()
    initialProducts.forEach((p) => {
      const catId = p.category?._id
      if (catId) {
        map.set(catId, (map.get(catId) || 0) + 1)
      }
    })
    return map
  }, [initialProducts])

  // Brand counts
  const brandCounts = useMemo(() => {
    const map = new Map<string, number>()
    initialProducts.forEach((p) => {
      const brandId = p.brand?._id
      if (brandId) {
        map.set(brandId, (map.get(brandId) || 0) + 1)
      }
    })
    return map
  }, [initialProducts])

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?._id === selectedCategory || p.category?.name === selectedCategory
      )
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(
        (p) => p.brand?._id === selectedBrand || p.brand?.name === selectedBrand
      )
    }

    // In-stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.quantity > 0)
    }

    // Price bracket
    if (priceBracket === "under-500") {
      result = result.filter((p) => p.price < 500)
    } else if (priceBracket === "500-1500") {
      result = result.filter((p) => p.price >= 500 && p.price <= 1500)
    } else if (priceBracket === "1500-3000") {
      result = result.filter((p) => p.price > 1500 && p.price <= 3000)
    } else if (priceBracket === "above-3000") {
      result = result.filter((p) => p.price > 3000)
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        result.sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        break
      case "popular":
        result.sort((a, b) => (b.sold || 0) - (a.sold || 0))
        break
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "featured":
      default:
        break
    }

    return result
  }, [initialProducts, searchQuery, selectedCategory, selectedBrand, inStockOnly, priceBracket, sortBy])

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchQuery.trim()) count++
    if (selectedCategory !== "all") count++
    if (selectedBrand !== "all") count++
    if (priceBracket !== "all") count++
    if (inStockOnly) count++
    if (sortBy !== "featured") count++
    return count
  }, [searchQuery, selectedCategory, selectedBrand, priceBracket, inStockOnly, sortBy])

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchQuery("")
      setSelectedCategory("all")
      setSelectedBrand("all")
      setPriceBracket("all")
      setSortBy("featured")
      setInStockOnly(false)
    })
  }

  // Selected names for badges
  const activeCategoryObj = categories.find((c) => c._id === selectedCategory)
  const activeBrandObj = brands.find((b) => b._id === selectedBrand)

  return (
    <div className="space-y-8">
      {/* Search & Control Toolbar */}
      <div className="bg-card/70 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Row 1: Search + Quick Tools */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, category, or brand..."
              className="pl-10 pr-9 h-11 rounded-xl bg-background border-border/80 text-sm focus-visible:ring-primary shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Brand Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-11 px-3.5 rounded-xl border-border/80 gap-2 cursor-pointer text-xs sm:text-sm font-medium ${
                    selectedBrand !== "all" ? "border-primary text-primary bg-primary/5" : ""
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Brand:</span>
                  <span className="font-semibold line-clamp-1 max-w-[100px]">
                    {activeBrandObj ? activeBrandObj.name : "All Brands"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 max-h-72 overflow-y-auto rounded-xl p-1">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Filter by Brand
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedBrand("all")}
                  className="flex items-center justify-between text-xs cursor-pointer py-2"
                >
                  <span>All Brands</span>
                  {selectedBrand === "all" && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
                {brands.map((b) => {
                  const count = brandCounts.get(b._id) || 0
                  if (count === 0) return null
                  return (
                    <DropdownMenuItem
                      key={b._id}
                      onClick={() => setSelectedBrand(b._id)}
                      className="flex items-center justify-between text-xs cursor-pointer py-2 gap-2"
                    >
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span>{b.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono font-medium">({count})</span>
                      </span>
                      {selectedBrand === b._id && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-11 px-3.5 rounded-xl border-border/80 gap-2 cursor-pointer text-xs sm:text-sm font-medium ${
                    sortBy !== "featured" ? "border-primary text-primary bg-primary/5" : ""
                  }`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort:</span>
                  <span className="font-semibold line-clamp-1 max-w-[120px]">{SORT_LABELS[sortBy]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Sort Order
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="flex items-center justify-between text-xs cursor-pointer py-2"
                  >
                    <span>{SORT_LABELS[option]}</span>
                    {sortBy === option && <Check className="w-3.5 h-3.5 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-11 px-3.5 rounded-xl border-border/80 gap-2 cursor-pointer text-xs sm:text-sm font-medium ${
                    priceBracket !== "all" ? "border-primary text-primary bg-primary/5" : ""
                  }`}
                >
                  <span className="hidden sm:inline">Price:</span>
                  <span className="font-semibold line-clamp-1">
                    {PRICE_BRACKETS.find((p) => p.id === priceBracket)?.label}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Price Brackets
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {PRICE_BRACKETS.map((bracket) => (
                  <DropdownMenuItem
                    key={bracket.id}
                    onClick={() => setPriceBracket(bracket.id)}
                    className="flex items-center justify-between text-xs cursor-pointer py-2"
                  >
                    <span>{bracket.label}</span>
                    {priceBracket === bracket.id && <Check className="w-3.5 h-3.5 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Layout switch */}
            <div className="hidden lg:flex items-center border border-border/80 rounded-xl p-1 bg-background">
              <Button
                variant={layoutMode === "standard" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayoutMode("standard")}
                className="h-8 w-8 p-0 cursor-pointer rounded-lg"
                title="4-Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={layoutMode === "compact" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayoutMode("compact")}
                className="h-8 w-8 p-0 cursor-pointer rounded-lg"
                title="3-Column Spacious Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span>All Categories</span>
                <span className="text-[10px] opacity-80 font-mono font-medium">({initialProducts.length})</span>
              </span>
            </button>

            {categories.map((cat) => {
              const count = categoryCounts.get(cat._id) || 0
              if (count === 0) return null
              const isSelected = selectedCategory === cat._id
              return (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-80 font-mono font-medium">({count})</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Row 3: In-Stock Toggle & Active Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* In Stock toggle pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                inStockOnly
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "bg-background border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${inStockOnly ? "text-emerald-500" : "opacity-40"}`} />
              <span className="whitespace-nowrap">In Stock Only</span>
            </button>

            {/* Quick Best Sellers button */}
            <button
              onClick={() => setSortBy(sortBy === "popular" ? "featured" : "popular")}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                sortBy === "popular"
                  ? "bg-primary/10 border-primary/30 text-primary font-semibold"
                  : "bg-background border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Best Sellers</span>
            </button>
          </div>

          {/* Result Count and Clear Filters */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="whitespace-nowrap">
              Showing <strong className="text-foreground">{filteredProducts.length}</strong> of{" "}
              {initialProducts.length} products
            </span>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-7 px-2.5 text-xs text-muted-foreground hover:text-destructive cursor-pointer gap-1 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3 h-3 shrink-0" />
                <span className="whitespace-nowrap">Reset ({activeFiltersCount})</span>
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/40">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Active Filters:
            </span>

            {searchQuery && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>Keyword: &quot;{searchQuery}&quot;</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSearchQuery("")} />
              </Badge>
            )}

            {activeCategoryObj && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>Category: {activeCategoryObj.name}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}

            {activeBrandObj && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>Brand: {activeBrandObj.name}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSelectedBrand("all")} />
              </Badge>
            )}

            {priceBracket !== "all" && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>Price: {PRICE_BRACKETS.find((p) => p.id === priceBracket)?.label}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setPriceBracket("all")} />
              </Badge>
            )}

            {inStockOnly && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>In Stock Only</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setInStockOnly(false)} />
              </Badge>
            )}

            {sortBy !== "featured" && (
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs rounded-lg font-normal">
                <span>Sort: {SORT_LABELS[sortBy]}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => setSortBy("featured")} />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Catalog Display: Empty State or Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-card/40 border border-dashed border-border rounded-3xl p-8">
          <div className="w-20 h-20 rounded-3xl bg-muted/70 border border-border flex items-center justify-center mb-5 text-muted-foreground shadow-xs">
            <PackageOpen className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-2">No Matching Products Found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
            We couldn&apos;t find any items matching your current search criteria. Try loosening your filters or
            searching for a different term.
          </p>
          <Button onClick={handleResetFilters} variant="default" className="rounded-full px-6 gap-2 cursor-pointer shadow-md">
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            layoutMode === "compact"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              priority={index < 8}
            />
          ))}
        </div>
      )}
    </div>
  )
}
