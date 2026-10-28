"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Menu,
  ShoppingCart,
  ShoppingBag,
  LayoutGrid,
  Award,
  Package,
  KeyRound,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from "next-auth/react"
import { cartContext } from "@/provider/cart-provider"
import { Spinner } from "@/components/ui/spinner"
import { wishlistContext } from "@/provider/wishlist-provider"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { NexoraLogo } from "@/components/common/logo"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { noOfCartItems, isLoading } = useContext(cartContext)
  const { count, isLoadingWishlist } = useContext(wishlistContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function logoutUser() {
    signOut({ callbackUrl: "/" })
  }

  const navLinks = [
    { href: "/products", label: "Catalog", icon: ShoppingBag },
    { href: "/categories", label: "Categories", icon: LayoutGrid },
    { href: "/brands", label: "Brands", icon: Award },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/75 backdrop-blur-xl border-b border-border/60 transition-colors duration-200">
      {/* Top subtle brand purple hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="group flex items-center gap-3 shrink-0 focus-visible:outline-none z-10">
            <div className="relative">
              <NexoraLogo size={38} withGlow className="group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                Nexora
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary hidden sm:block -mt-1">
                Luxe Store
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Pills (Dead-center aligned) */}
          <div className="hidden md:flex items-center gap-1.5 bg-muted/40 p-1.5 rounded-full border border-border/60 shadow-xs absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 z-10">
            {/* Dark / Light Mode Toggle */}
            <ThemeToggle />

            {/* Saved Wishlist Button */}
            {session && (
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-muted-foreground shadow-2xs"
                title="My Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {count > 0 && (
                  <Badge className="h-4 min-w-4 rounded-full px-1 font-mono text-[9px] tabular-nums absolute -top-1 -right-1 bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
                    {isLoadingWishlist ? <Spinner className="w-2.5 h-2.5" /> : count}
                  </Badge>
                )}
              </Link>
            )}

            {/* Cart Button */}
            {session && (
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-muted-foreground shadow-2xs"
                title="Shopping Cart"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {noOfCartItems > 0 && (
                  <Badge className="h-4 min-w-4 rounded-full px-1 font-mono text-[9px] tabular-nums absolute -top-1 -right-1 bg-primary text-primary-foreground flex items-center justify-center border-2 border-background">
                    {isLoading ? <Spinner className="w-2.5 h-2.5" /> : noOfCartItems}
                  </Badge>
                )}
              </Link>
            )}

            {/* User Account Dropdown */}
            {session ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer rounded-full h-10 px-3 border-border/70 bg-card/60 hover:bg-accent/80 hover:border-primary/40 transition gap-2 shadow-2xs text-xs font-semibold"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="max-w-[100px] truncate hidden sm:inline-block">
                      {session.user?.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 border-border/80 shadow-2xl">
                  <DropdownMenuLabel className="p-2">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="font-bold text-sm text-foreground truncate mt-0.5">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">{session.user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2">
                    <Link href="/allorders" className="flex items-center gap-2.5 text-xs font-medium">
                      <Package className="w-4 h-4 text-primary" />
                      <span>Order History</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2">
                    <Link href="/wishlist" className="flex items-center gap-2.5 text-xs font-medium">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2">
                    <Link href="/changepassword" className="flex items-center gap-2.5 text-xs font-medium">
                      <KeyRound className="w-4 h-4 text-amber-500" />
                      <span>Account Security</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logoutUser}
                    className="rounded-xl cursor-pointer py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-500/10 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs font-semibold px-4 cursor-pointer hidden sm:inline-flex"
                >
                  <Link href="/login" className="inline-flex items-center gap-1.5">
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full text-xs font-bold px-4 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                >
                  <Link href="/register" className="inline-flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Hamburger Drawer */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-xl h-10 w-10 border border-border/60 hover:bg-accent cursor-pointer"
                  aria-label="Open Mobile Menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground border-border w-[300px] sm:w-[360px] p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <SheetHeader className="text-left pb-4 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <NexoraLogo size={36} withGlow />
                      <div>
                        <SheetTitle className="text-xl font-extrabold tracking-tight">Nexora</SheetTitle>
                        <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest text-primary">
                          Luxe Commerce
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  {/* User Profile Card (if logged in) */}
                  {session ? (
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate">{session.user?.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate font-mono">{session.user?.email}</p>
                      </div>
                    </div>
                  ) : null}

                  {/* Navigation Links */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Browse Store
                    </p>
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      const active = isActive(link.href)
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{link.label}</span>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Account / Shopping Links */}
                  {session && (
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                        My Account
                      </p>
                      <Link
                        href="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                      >
                        <span className="flex items-center gap-3">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                          <span>Shopping Cart</span>
                        </span>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {noOfCartItems}
                        </Badge>
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                      >
                        <span className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>Saved Wishlist</span>
                        </span>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {count}
                        </Badge>
                      </Link>
                      <Link
                        href="/allorders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                      >
                        <Package className="w-4 h-4 text-primary" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        href="/changepassword"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
                      >
                        <KeyRound className="w-4 h-4 text-amber-500" />
                        <span>Security & Password</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-border/60 space-y-3">
                  {session ? (
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        logoutUser()
                      }}
                      variant="outline"
                      className="w-full rounded-xl text-rose-600 border-rose-500/30 hover:bg-rose-500/10 cursor-pointer font-semibold gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl text-xs font-semibold"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button
                        asChild
                        className="rounded-xl text-xs font-bold bg-primary text-primary-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/register">Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
