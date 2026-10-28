import React from 'react';
import { Package, Calendar, CreditCard, MapPin, Truck, Check, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getUserOrders } from '@/actions/order.action';
import { getUserToken } from '@/lib/auth';
import { Order } from '@/interfaces/order';
import { jwtDecode } from 'jwt-decode';
import { DecodedTokenI } from '@/interfaces/decodedtoken';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const token = await getUserToken();
  if (!token) {
    redirect('/login');
  }

  let orders: Order[] = [];

  try {
    const decoded = jwtDecode<DecodedTokenI>(token);
    const userId = decoded.id;

    const ordersData = await getUserOrders(userId);
    orders = ordersData || [];
  } catch (error) {
    console.error(error);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getOrderStatus = (order: Order) => {
    if (order.isDelivered) {
      return {
        label: 'Delivered',
        className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: Check
      };
    } else if (order.isPaid) {
      return {
        label: 'Processing',
        className: 'bg-primary/10 text-primary border-primary/20',
        icon: Truck
      };
    } else {
      return {
        label: 'Pending',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        icon: Clock
      };
    }
  };

  const isEmpty = orders.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors pb-16">
      {/* Atmospheric Header */}
      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background py-14 px-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Order History</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Track live shipments, view past receipts, and manage deliveries
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-border">
              {orders.length} {orders.length === 1 ? 'order placed' : 'orders placed'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 max-w-6xl py-10">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-muted/60 border border-border flex items-center justify-center mb-6 shadow-sm">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              When you complete an order, its real-time shipping updates and receipt items will appear here.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer">
              <Link href="/products" className="inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Browse Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </section>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = getOrderStatus(order);
              const StatusIcon = status.icon;

              return (
                <Card key={order._id} className="overflow-hidden rounded-2xl border border-border/80 bg-card hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-muted/30 border-b border-border/60 p-5 sm:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <CardTitle className="text-lg sm:text-xl font-bold font-mono tracking-tight">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </CardTitle>
                          <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${status.className}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span className="capitalize">{order.paymentMethodType}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{order.shippingAddress.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right">
                        <div className="text-xs text-muted-foreground mb-0.5">Total Paid</div>
                        <div className="text-2xl font-extrabold text-foreground">
                          EGP {order.totalOrderPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 space-y-6">
                    {/* Order Items */}
                    <div className="divide-y divide-border/50">
                      {order.cartItems.map((item) => (
                        <div key={item._id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center">
                          <Link href={`/products/${item.product._id}`} className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-muted/40 border border-border/60">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="80px"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.product._id}`}>
                              <h3 className="font-semibold text-sm sm:text-base hover:text-primary transition-colors line-clamp-1">
                                {item.product.title}
                              </h3>
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand.name}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="text-muted-foreground font-medium">Qty: {item.count}</span>
                              <span className="font-bold text-foreground">EGP {item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="border-border/60" />

                    {/* Shipping Address */}
                    <div className="bg-muted/20 border border-border/60 p-4 rounded-xl flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-background border border-border/60 text-muted-foreground shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-xs space-y-0.5">
                        <h4 className="font-semibold text-foreground">Shipping Destination</h4>
                        <p className="text-muted-foreground">{order.shippingAddress.details}</p>
                        <p className="text-muted-foreground font-medium">{order.shippingAddress.city} • Phone: {order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/20 border-t border-border/60 px-5 sm:px-6 py-3.5 flex justify-between items-center text-xs text-muted-foreground">
                    <span>
                      {order.cartItems.length} {order.cartItems.length === 1 ? 'item' : 'items'} in shipment
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-xs hover:text-primary">
                      <Link href="/products">Order More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
