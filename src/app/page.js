"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Sparkles,
  ArrowRight,
  ShoppingCart,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Sparkles,
    title: "Quality Products",
    description:
      "All our cleaning solutions are carefully mixed for optimal performance",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Multiple payment options with secure transaction processing",
  },
];

const bestSellers = [
  { name: "Laundry Detergent", price: 120 },
  { name: "Dishwashing Liquid", price: 85 },
  { name: "Car Shampoo", price: 150 },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-base font-bold">
            Ni-Q Cleaning Solutions
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/store">Store</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/customer/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/customer/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Ni-Q Cleaning Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Quality cleaning products for every home and business
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 px-8 py-6 text-base"
          >
            <Link href="/store">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader className="items-center text-center">
                  <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Our Best Sellers
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {bestSellers.map((product) => (
              <Card key={product.name}>
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    ₱{product.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/store">View Product</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/store">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-zinc-900 text-zinc-100">
        <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-3">
          <div>
            <h5 className="mb-2 font-semibold">Ni-Q Cleaning Solutions</h5>
            <p className="text-sm text-zinc-400">
              Village East Avenue St. Cainta Rizal
            </p>
            <p className="text-sm text-zinc-400">Contact: (123) 456-7890</p>
          </div>
          <div>
            <h5 className="mb-2 font-semibold">Quick Links</h5>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/store"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2 font-semibold">Follow Us</h5>
            <p className="text-sm text-zinc-400">Stay connected on social media</p>
          </div>
        </div>
        <Separator className="bg-zinc-800" />
        <p className="py-4 text-center text-xs text-zinc-500">
          © 2024 Ni-Q Cleaning Solutions. All rights reserved.
        </p>
      </footer>

      {/* Admin Access */}
      <div className="py-4 text-center">
        <Link
          href="/login"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Admin Access
        </Link>
      </div>
    </div>
  );
}
