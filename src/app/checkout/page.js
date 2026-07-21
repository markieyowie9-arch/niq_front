"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dataProvider from "@/utils/dataProvider";

const paymentMethods = [
  { id: "gcash", name: "GCash", logo: "/gcash-logo.png" },
  { id: "paymaya", name: "PayMaya", logo: "/paymaya-logo.png" },
  { id: "bank", name: "Bank Transfer", logo: "/bank-logo.png" },
  { id: "paypal", name: "PayPal", logo: "/paypal-logo.png" },
];

export default function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    contact: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    const payload = {
      customer: shippingInfo.fullName || shippingInfo.email || "Guest",
      email: shippingInfo.email,
      shipping: shippingInfo,
      paymentMethod,
      total: 0,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      items: [],
    };

    try {
      await dataProvider.createOrder(payload);
      router.push("/checkout/success");
    } catch (err) {
      console.error("Order creation failed", err);
      router.push("/checkout/success");
    }
  };

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Checkout</h1>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {step} of 3</span>
            <span>
              {step === 1
                ? "Shipping"
                : step === 2
                  ? "Payment"
                  : "Review"}
            </span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Step 1: Shipping */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      required
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Complete Address *</Label>
                  <Textarea
                    rows={2}
                    required
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input
                      required
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Province *</Label>
                    <Input
                      required
                      value={shippingInfo.province}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          province: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code *</Label>
                    <Input
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Contact Number *</Label>
                  <Input
                    type="tel"
                    required
                    value={shippingInfo.contact}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentSelect(method.id)}
                    className={cn(
                      "rounded-lg border-2 bg-card p-6 text-center transition-colors hover:border-primary/50",
                      paymentMethod === method.id
                        ? "border-primary"
                        : "border-border",
                    )}
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="mx-auto h-10 object-contain"
                    />
                    <p className="mt-2 font-medium">{method.name}</p>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="mt-2"
              >
                Back
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Items</h3>
                <p className="text-sm text-muted-foreground">
                  List cart items here
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Shipping To:</h3>
                <p className="text-sm text-muted-foreground">
                  {shippingInfo.fullName}
                  <br />
                  {shippingInfo.address}
                  <br />
                  {shippingInfo.city}, {shippingInfo.province}{" "}
                  {shippingInfo.zipCode}
                  <br />
                  Contact: {shippingInfo.contact}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Payment Method:</h3>
                <p className="text-sm capitalize text-muted-foreground">
                  {paymentMethod}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Total Amount:</h3>
                <p className="text-2xl font-bold text-primary">₱1,234.56</p>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={setAgreed}
                />
                <Label htmlFor="terms" className="cursor-pointer">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </Label>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePlaceOrder}
                  disabled={!agreed}
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
}
