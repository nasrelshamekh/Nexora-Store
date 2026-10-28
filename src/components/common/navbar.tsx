"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink
} from "@/components/ui/navigation-menu"
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
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
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Menu, ShoppingCart, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from "next-auth/react"
import { useContext } from "react"
import { cartContext } from "@/provider/cart-provider"
import { Spinner } from "../ui/spinner"
import { wishlistContext } from "@/provider/wishlist-provider"
import { ThemeToggle } from "@/components/common/theme-toggle"

export default function Navbar() {
    const { data: session } = useSession()
    const { noOfCartItems, isLoading } = useContext(cartContext)
    const { count, isLoadingWishlist } = useContext(wishlistContext)

    function logoutUser() {
        signOut({ callbackUrl: "/" })
    }

    return (
        <>
            <nav className="bg-background/80 backdrop-blur-md border-b border-border fixed w-full z-50 transition-colors duration-200">
                <div className="container mx-auto p-4 sm:p-5 flex items-center justify-between">
                    <Link href={"/"}>
                        <div className="nav-logo flex items-center gap-3">
                            <Avatar className="rounded-lg text-xl font-bold bg-primary text-primary-foreground size-9">
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-2xl tracking-tight">Nexora</span>
                        </div>
                    </Link>

                    {/* Centered Desktop Navigation */}
                    <div className="hidden md:flex nav-links absolute left-1/2 -translate-x-1/2">
                        <NavigationMenu className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/products"} className="px-3 py-2 text-sm font-medium hover:text-primary transition">
                                        Products
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/brands"} className="px-3 py-2 text-sm font-medium hover:text-primary transition">
                                        Brands
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/categories"} className="px-3 py-2 text-sm font-medium hover:text-primary transition">
                                        Categories
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenu>
                    </div>

                    {/* Right Action Icons & Controls */}
                    <div className="nav-actions flex items-center gap-3 sm:gap-4">
                        {/* Dark / Light Mode Toggle */}
                        <ThemeToggle />

                        {session && (
                            <p className="font-medium text-sm hidden lg:block text-muted-foreground">
                                Welcome, <span className="text-foreground font-semibold">{session.user?.name}</span>
                            </p>
                        )}

                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full hover:bg-accent transition flex items-center">
                                <UserRound className="w-5 h-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                {session && (
                                    <p className="px-2 py-1.5 text-xs text-muted-foreground lg:hidden">
                                        Signed in as <span className="font-semibold text-foreground">{session.user?.name}</span>
                                    </p>
                                )}
                                <DropdownMenuSeparator />
                                {session ? (
                                    <>
                                        <Link href={"/changepassword"}>
                                            <DropdownMenuItem className="cursor-pointer">Change Password</DropdownMenuItem>
                                        </Link>
                                        <Link href={"/allorders"}>
                                            <DropdownMenuItem className="cursor-pointer">Your Orders</DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logoutUser} className="text-rose-600 focus:text-rose-600 cursor-pointer">
                                            Logout
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <Link href={"/login"}>
                                            <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                                        </Link>
                                        <Link href={"/register"}>
                                            <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                                        </Link>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Cart Action Button */}
                        {session && (
                            <Link href={"/cart"} className="relative p-2 rounded-full hover:bg-accent transition" title="View Cart">
                                <ShoppingCart className="w-5 h-5" />
                                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono text-[10px] tabular-nums absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 flex items-center justify-center">
                                    {isLoading ? <Spinner className="w-3 h-3" /> : noOfCartItems}
                                </Badge>
                            </Link>
                        )}

                        {/* Wishlist Action Button */}
                        {session && (
                            <Link href={"/wishlist"} className="relative p-2 rounded-full hover:bg-accent transition" title="View Wishlist">
                                <Heart className="w-5 h-5" />
                                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono text-[10px] tabular-nums absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 flex items-center justify-center">
                                    {isLoadingWishlist ? <Spinner className="w-3 h-3" /> : count}
                                </Badge>
                            </Link>
                        )}

                        {/* Mobile Menu Drawer */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="size-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-background text-foreground border-border">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link href={"/products"} className="text-lg font-medium hover:bg-accent p-2 rounded-lg transition">
                                        Products
                                    </Link>
                                    <Link href={"/brands"} className="text-lg font-medium hover:bg-accent p-2 rounded-lg transition">
                                        Brands
                                    </Link>
                                    <Link href={"/categories"} className="text-lg font-medium hover:bg-accent p-2 rounded-lg transition">
                                        Categories
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </>
    )
}
