"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import CustomerLayout from "@/components/layouts/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Questions" },
  { id: "orders", name: "Orders" },
  { id: "payments", name: "Payments" },
  { id: "delivery", name: "Delivery" },
  { id: "products", name: "Products" },
  { id: "returns", name: "Returns" },
];

const faqs = [
  {
    category: "orders",
    question: "How do I place an order?",
    answer:
      "Browse our products, add items to cart, proceed to checkout, provide shipping information, select payment method, and confirm your order.",
  },
  {
    category: "orders",
    question: "Can I modify my order after placing it?",
    answer:
      "Orders can be modified within 1 hour of placement. Contact us immediately for changes.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We accept GCash, PayMaya, Bank Transfer, and PayPal.",
  },
  {
    category: "payments",
    question: "When will my payment be processed?",
    answer:
      "Payments are processed immediately upon confirmation. You will receive an e-receipt via email.",
  },
  {
    category: "delivery",
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3-5 business days within Metro Manila, and 5-7 business days for provincial areas.",
  },
  {
    category: "delivery",
    question: "How much is delivery fee?",
    answer:
      "Delivery fee starts at ₱50 and varies based on location and order value.",
  },
  {
    category: "products",
    question: "Are your products safe to use?",
    answer:
      "Yes, all our products are mixed following safety standards and are safe for their intended use.",
  },
  {
    category: "products",
    question: "Do you offer bulk orders?",
    answer:
      "Yes, we accept bulk orders. Lead time will be provided based on quantity.",
  },
  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We accept returns for damaged products only. Contact us within 24 hours of delivery.",
  },
];

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory !== "all" && faq.category !== activeCategory)
      return false;
    if (
      searchTerm &&
      !faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 pl-9"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQs */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="rounded-lg border">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="px-4">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Alert variant="info">
            <AlertDescription>No FAQs found matching your search.</AlertDescription>
          </Alert>
        )}

        {/* Contact Support */}
        <Card className="mt-6 text-center">
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Contact our support team
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
