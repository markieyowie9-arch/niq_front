"use client";
import Link from "next/link";
import CustomerLayout from "../../src/components/layouts/CustomerLayout";

export default function OrderSuccess() {
  return (
    <CustomerLayout>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body p-5">
              <div className="mb-4">
                <span className="display-1 text-success">✓</span>
              </div>

              <h2 className="mb-3">Order Placed Successfully!</h2>

              <p className="text-muted mb-4">
                Thank you for your purchase. Your order has been received and is
                being processed.
              </p>

              <div className="alert alert-info">
                <strong>Order Code: </strong>
                <span className="font-monospace">NIQ-2024-0001</span>
              </div>

              <div className="alert alert-success">
                A receipt has been sent to your email address.
              </div>

              <div className="d-grid gap-2">
                <Link href="/store" className="btn btn-primary">
                  Continue Shopping
                </Link>
                <Link
                  href="/customer/orders"
                  className="btn btn-outline-primary"
                >
                  View My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
