import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, ShieldCheck, Zap, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NexoraLogo } from '@/components/common/logo'

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/50 backdrop-blur-md text-foreground py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Social */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <NexoraLogo size={36} className="shadow-md shadow-purple-500/20" />
              <span className="font-extrabold text-2xl tracking-tight">Nexora</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Next-generation digital commerce experience connecting premium lifestyle, apparel, and electronics powered by Route Academy.
            </p>
            <div className="flex items-center space-x-2.5 pt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-9 h-9 rounded-xl border-border/70 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer"
                asChild
              >
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-9 h-9 rounded-xl border-border/70 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer"
                asChild
              >
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-9 h-9 rounded-xl border-border/70 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer"
                asChild
              >
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Catalog Navigation */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Shop Catalog</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Shop by Category
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Curated Brands
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account & Orders */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Customer Hub</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/allorders" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Order History & Tracking
                </Link>
              </li>
              <li>
                <Link href="/changepassword" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Account Security
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Customer Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Register New Account
                </Link>
              </li>
              <li>
                <Link href="/forgotpassword" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Engineering & Trust */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Architecture</h5>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Engineered with Next.js 15 App Router, React 19, and Tailwind CSS v4. Synchronized live with Route Academy REST backend.
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span>Sub-Second Server Actions Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>COD & Stripe Card Channels</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>NextAuth Secure JWT Sessions</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="border-border/60 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2026 Nexora Store • Engineered by Nasr Elshamekh</p>
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-foreground transition-colors">Catalog</Link>
            <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
            <Link href="/brands" className="hover:text-foreground transition-colors">Brands</Link>
            <Link href="/allorders" className="hover:text-foreground transition-colors">Orders</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
