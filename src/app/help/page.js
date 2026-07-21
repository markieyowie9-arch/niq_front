"use client";

import Link from "next/link";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const sections = [
  { id: "getting-started", title: "Getting Started" },
  { id: "ordering", title: "Placing Orders" },
  { id: "payment", title: "Payment Guide" },
  { id: "tracking", title: "Order Tracking" },
  { id: "account", title: "Account Management" },
];

export default function Help() {
  return (
    <CustomerLayout>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <h1 className="mb-4 text-2xl font-bold">Help Center</h1>
          <nav className="space-y-1">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-6 md:col-span-3">
          <Card id="getting-started">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Welcome to Ni-Q Cleaning Solutions! Here's how to get started:
              </p>
              <ol className="ml-6 list-decimal space-y-1 text-sm text-muted-foreground">
                <li>Create an account or browse as guest</li>
                <li>Browse our product catalog</li>
                <li>Add items to your cart</li>
                <li>Proceed to checkout</li>
                <li>Provide shipping information</li>
                <li>Choose payment method</li>
                <li>Confirm your order</li>
              </ol>
            </CardContent>
          </Card>

          <Card id="ordering">
            <CardHeader>
              <CardTitle>Placing Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <h6 className="mb-2 font-semibold">Step-by-step guide:</h6>
              <ol className="ml-6 mb-4 list-decimal space-y-1 text-sm text-muted-foreground">
                <li>Go to the Store page</li>
                <li>Browse products or use search</li>
                <li>Click on a product to view details</li>
                <li>Select quantity and click "Add to Cart"</li>
                <li>Review items in your cart</li>
                <li>Click "Proceed to Checkout"</li>
                <li>Fill in shipping details</li>
                <li>Select payment method</li>
                <li>Review order and confirm</li>
              </ol>
              <Alert variant="info">
                <AlertDescription>
                  <strong>Note:</strong> You must agree to the Terms and
                  Conditions before placing an order.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card id="payment">
            <CardHeader>
              <CardTitle>Payment Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">We accept the following payment methods:</p>
              <h6 className="mb-1 font-semibold">GCash:</h6>
              <ol className="ml-6 mb-3 list-decimal text-sm text-muted-foreground">
                <li>Select GCash as payment method</li>
                <li>You will be redirected to GCash</li>
                <li>Log in to your GCash account</li>
                <li>Confirm payment</li>
                <li>You'll be redirected back to our store</li>
              </ol>
              <h6 className="mb-1 font-semibold">PayMaya:</h6>
              <ol className="ml-6 mb-3 list-decimal text-sm text-muted-foreground">
                <li>Select PayMaya as payment method</li>
                <li>Enter your PayMaya details</li>
                <li>Confirm payment</li>
              </ol>
              <h6 className="mb-1 font-semibold">Bank Transfer:</h6>
              <ol className="ml-6 list-decimal text-sm text-muted-foreground">
                <li>Select Bank Transfer</li>
                <li>Choose your bank</li>
                <li>Transfer the amount to our account</li>
                <li>Upload proof of payment</li>
              </ol>
            </CardContent>
          </Card>

          <Card id="tracking">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">To track your order:</p>
              <ol className="ml-6 mb-4 list-decimal text-sm text-muted-foreground">
                <li>Log in to your account</li>
                <li>Go to "My Orders"</li>
                <li>Click on the order you want to track</li>
                <li>View current status and updates</li>
              </ol>
              <p className="mb-2">Order status meanings:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Badge variant="warning">Pending</Badge>
                  Order received, waiting for payment confirmation
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="info">Processing</Badge>
                  Payment confirmed, preparing your order
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="success">Delivered</Badge>
                  Order has been delivered
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Cancelled</Badge>
                  Order was cancelled
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="account">
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent>
              <h6 className="mb-1 font-semibold">Creating an account:</h6>
              <ol className="ml-6 mb-4 list-decimal text-sm text-muted-foreground">
                <li>Click "Register" on the top menu</li>
                <li>Fill in your details</li>
                <li>Verify your email</li>
                <li>Log in with your credentials</li>
              </ol>
              <h6 className="mb-1 font-semibold">
                Benefits of having an account:
              </h6>
              <ul className="ml-6 list-disc text-sm text-muted-foreground">
                <li>Saved cart items</li>
                <li>Order history</li>
                <li>Faster checkout</li>
                <li>Order tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Alert variant="warning">
            <AlertTitle>Need more help?</AlertTitle>
            <AlertDescription>
              Contact our support team at support@niq.com or call (123)
              456-7890
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </CustomerLayout>
  );
}
