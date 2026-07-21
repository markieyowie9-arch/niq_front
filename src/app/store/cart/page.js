"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, X, ChevronRight } from "lucide-react";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dataProvider from "@/utils/dataProvider";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([
        {
          id: 1,
          name: "Laundry Detergent",
          price: 120,
          quantity: 2,
          image: "/product1.jpg",
          stock: 15,
        },
        {
          id: 3,
          name: "Car Shampoo",
          price: 150,
          quantity: 1,
          image: "/product3.jpg",
          stock: 5,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dataProvider.saveCartForUser("current", cartItems).catch(() => {});
    } else if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const vat = calculateSubtotal() * 0.12;
  const deliveryFee = 50;
  const total = calculateSubtotal() + vat + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <CustomerLayout>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <div className="py-12 text-center">
          <h3 className="mb-4 text-xl font-semibold">Your cart is empty</h3>
          <Button asChild>
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="divide-y p-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center gap-4 p-4"
                >
                  <div className="col-span-3 sm:col-span-2">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="h-20 w-full rounded object-cover"
                    />
                  </div>
                  <div className="col-span-9 sm:col-span-4">
                    <h5 className="font-semibold">{item.name}</h5>
                    <p className="text-sm text-muted-foreground">₱{item.price}</p>
                  </div>
                  <div className="col-span-8 sm:col-span-3">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        className="h-9 w-14 rounded-none border-x-0 text-center"
                        value={item.quantity}
                        min={1}
                        max={item.stock}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-3 text-right sm:col-span-2">
                    <p className="font-bold">₱{item.price * item.quantity}</p>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₱{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (12%)</span>
                <span>₱{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₱{deliveryFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-primary">₱{total.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pt-2">
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/store">Continue Shopping</Link>
                </Button>
              </div>

              {!isLoggedIn && (
                <Alert variant="info" className="mt-3">
                  <AlertDescription>
                    <Link
                      href="/customer/login"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Login
                    </Link>{" "}
                    to save your cart for next time.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
