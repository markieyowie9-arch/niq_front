"use client";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "2. Products and Services",
    body: "Ni-Q Cleaning Solutions provides cleaning products including but not limited to detergent soaps, dishwashing soaps, car shampoos, and bleaches. All products are manufactured and mixed by Ni-Q Cleaning Solutions.",
  },
  {
    title: "3. Orders and Payments",
    body: "All orders placed through this website are subject to acceptance and availability. Payment must be received in full before order processing begins. We accept payments through GCash, PayMaya, Bank Transfer, and PayPal.",
  },
  {
    title: "4. Shipping and Delivery",
    body: "Delivery is available within the Philippines only. Shipping costs are calculated based on location and order value. Delivery times are estimates and not guaranteed.",
  },
  {
    title: "5. Cancellations and Returns",
    body: "Orders can be cancelled before production begins. For bulk orders, cancellations must be made before production starts. Returns are accepted for damaged products only.",
  },
  {
    title: "6. Privacy and Data Protection",
    body: "We collect and store personal information necessary for order processing and delivery. Your data will not be shared with third parties without your consent.",
  },
  {
    title: "7. Changes to Terms",
    body: "Ni-Q Cleaning Solutions reserves the right to modify these terms at any time. Continued use of the website constitutes acceptance of modified terms.",
  },
];

export default function Terms() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">
          Terms and Conditions
        </h1>

        <Card>
          <CardContent className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h5 className="mb-2 font-semibold">{section.title}</h5>
                <p className="text-muted-foreground">{section.body}</p>
              </div>
            ))}

            <Alert variant="info">
              <AlertDescription>
                <strong>Last Updated:</strong> February 2024
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
