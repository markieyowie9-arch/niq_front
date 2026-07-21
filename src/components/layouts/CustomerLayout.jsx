"use client";

import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CustomerLayout({ children }) {
  const cartCount = 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Ni-Q" className="h-8 w-auto" />
            <span className="text-base font-semibold">
              Ni-Q Cleaning Solutions
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
              />
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative"
              aria-label="Cart"
            >
              <Link href="/store/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/customer/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/customer/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/customer/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/customer/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-zinc-900 text-zinc-100">
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
                  Products
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
    </div>
  );
}
