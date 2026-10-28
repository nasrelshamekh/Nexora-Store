import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { ScrollToTopButton } from "@/components/ui/scrolltotop";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/provider/auth-provider";
import CartContextProvider from "@/provider/cart-provider";
import WishlistContextProvider from "@/provider/wishlist-provider";
import { ThemeProvider } from "@/provider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexora Store",
  description: "Next-Generation Digital E-Commerce Experience engineered by Nasr Elshamekh",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <WishlistContextProvider>
              <CartContextProvider>
                <Navbar />
                <ScrollToTopButton />
                <div className="pt-20">
                  {children}
                </div>
                <Toaster richColors />
                <Footer />
              </CartContextProvider>
            </WishlistContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
