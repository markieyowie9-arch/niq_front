"use client";
import { useState } from "react";
import CustomerLayout from "@/components/layouts/CostumerLayout";

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-center">Frequently Asked Questions</h1>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="mb-4">
            <ul className="nav nav-pills justify-content-center">
              {categories.map((cat) => (
                <li className="nav-item" key={cat.id}>
                  <a
                    className={`nav-link ${activeCategory === cat.id ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(cat.id);
                    }}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs Accordion */}
          <div className="accordion" id="faqAccordion">
            {filteredFaqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`faq${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="alert alert-info text-center">
              No FAQs found matching your search.
            </div>
          )}

          {/* Contact Support */}
          <div className="card mt-4">
            <div className="card-body text-center">
              <h5>Still have questions?</h5>
              <p className="text-muted">Contact our support team</p>
              <button className="btn btn-primary">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
