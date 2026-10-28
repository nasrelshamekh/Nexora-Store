import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Social */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Nexora Store</h4>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Next-generation digital commerce experience connecting premium lifestyle, apparel, and electronics powered by Route Academy.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition"
                asChild
              >
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition"
                asChild
              >
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition"
                asChild
              >
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Catalog Navigation */}
          <div>
            <h5 className="text-lg font-bold mb-6">Shop Catalog</h5>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/products">All Products</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/categories">Shop by Category</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/brands">Curated Brands</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/cart">Shopping Cart</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/wishlist">Saved Wishlist</Link>
                </Button>
              </li>
            </ul>
          </div>
          
          {/* Account & Orders */}
          <div>
            <h5 className="text-lg font-bold mb-6">Customer Hub</h5>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/allorders">Order History & Tracking</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/changepassword">Account Security</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/login">Customer Sign In</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/register">Register New Account</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/forgotpassword">Reset Password</Link>
                </Button>
              </li>
            </ul>
          </div>
          
          {/* Engineering & Credits */}
          <div>
            <h5 className="text-lg font-bold mb-6">Architecture</h5>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Engineered with Next.js 15 App Router, React 19, and Tailwind CSS v4. Integrated with Route Academy REST API.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Fast Sub-Second Cart Sync</p>
              <p>• COD & Stripe Card Channels</p>
              <p>• NextAuth Secure JWT Sessions</p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
          <p>&copy; 2026 Nexora Store • Engineered by Nasr Elshamekh</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/products" className="hover:text-white transition">Catalog</Link>
            <Link href="/categories" className="hover:text-white transition">Categories</Link>
            <Link href="/brands" className="hover:text-white transition">Brands</Link>
            <Link href="/allorders" className="hover:text-white transition">Orders</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
