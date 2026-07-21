"use client";

import Link from "next/link";
import { CheckCircle2, MailCheck } from "lucide-react";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function OrderSuccess() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-md">
        <Card>
          <CardContent className="flex flex-col items-center p-10 text-center">
            <CheckCircle2 className="mb-4 h-20 w-20 text-emerald-500" />

            <h2 className="mb-2 text-2xl font-bold">Order Placed Successfully!</h2>

            <p className="mb-6 text-muted-foreground">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>

            <Alert className="mb-4 w-full text-left">
              <AlertTitle>Order Code</AlertTitle>
              <AlertDescription>
                <span className="font-mono font-semibold">NIQ-2024-0001</span>
              </AlertDescription>
            </Alert>

            <Alert variant="success" className="mb-6 w-full text-left">
              <MailCheck className="h-4 w-4" />
              <AlertDescription>
                A receipt has been sent to your email address.
              </AlertDescription>
            </Alert>

            <div className="flex w-full flex-col gap-2">
              <Button asChild>
                <Link href="/store">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/customer/orders">View My Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
