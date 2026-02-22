"use client";
import CustomerLayout from "../src/components/layouts/CustomerLayout";
import Link from "next/link";

export default function Help() {
  return (
    <CustomerLayout>
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Help Center</h1>
        </div>

        {/* Quick Links */}
        <div className="col-md-3 mb-4">
          <div className="list-group">
            <Link
              href="#getting-started"
              className="list-group-item list-group-item-action"
            >
              Getting Started
            </Link>
            <Link
              href="#ordering"
              className="list-group-item list-group-item-action"
            >
              Placing Orders
            </Link>
            <Link
              href="#payment"
              className="list-group-item list-group-item-action"
            >
              Payment Guide
            </Link>
            <Link
              href="#tracking"
              className="list-group-item list-group-item-action"
            >
              Order Tracking
            </Link>
            <Link
              href="#account"
              className="list-group-item list-group-item-action"
            >
              Account Management
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card mb-4" id="getting-started">
            <div className="card-body">
              <h4>Getting Started</h4>
              <p>
                Welcome to Ni-Q Cleaning Solutions! Here's how to get started:
              </p>
              <ol>
                <li>Create an account or browse as guest</li>
                <li>Browse our product catalog</li>
                <li>Add items to your cart</li>
                <li>Proceed to checkout</li>
                <li>Provide shipping information</li>
                <li>Choose payment method</li>
                <li>Confirm your order</li>
              </ol>
            </div>
          </div>

          <div className="card mb-4" id="ordering">
            <div className="card-body">
              <h4>Placing Orders</h4>
              <h6>Step-by-step guide:</h6>
              <ol>
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
              <div className="alert alert-info">
                <strong>Note:</strong> You must agree to the Terms and
                Conditions before placing an order.
              </div>
            </div>
          </div>

          <div className="card mb-4" id="payment">
            <div className="card-body">
              <h4>Payment Guide</h4>
              <p>We accept the following payment methods:</p>

              <h6>GCash:</h6>
              <ol>
                <li>Select GCash as payment method</li>
                <li>You will be redirected to GCash</li>
                <li>Log in to your GCash account</li>
                <li>Confirm payment</li>
                <li>You'll be redirected back to our store</li>
              </ol>

              <h6>PayMaya:</h6>
              <ol>
                <li>Select PayMaya as payment method</li>
                <li>Enter your PayMaya details</li>
                <li>Confirm payment</li>
              </ol>

              <h6>Bank Transfer:</h6>
              <ol>
                <li>Select Bank Transfer</li>
                <li>Choose your bank</li>
                <li>Transfer the amount to our account</li>
                <li>Upload proof of payment</li>
              </ol>
            </div>
          </div>

          <div className="card mb-4" id="tracking">
            <div className="card-body">
              <h4>Order Tracking</h4>
              <p>To track your order:</p>
              <ol>
                <li>Log in to your account</li>
                <li>Go to "My Orders"</li>
                <li>Click on the order you want to track</li>
                <li>View current status and updates</li>
              </ol>
              <p>Order status meanings:</p>
              <ul>
                <li>
                  <span className="badge bg-warning">Pending</span> - Order
                  received, waiting for payment confirmation
                </li>
                <li>
                  <span className="badge bg-info">Processing</span> - Payment
                  confirmed, preparing your order
                </li>
                <li>
                  <span className="badge bg-success">Delivered</span> - Order
                  has been delivered
                </li>
                <li>
                  <span className="badge bg-secondary">Cancelled</span> - Order
                  was cancelled
                </li>
              </ul>
            </div>
          </div>

          <div className="card mb-4" id="account">
            <div className="card-body">
              <h4>Account Management</h4>
              <h6>Creating an account:</h6>
              <ol>
                <li>Click "Register" on the top menu</li>
                <li>Fill in your details</li>
                <li>Verify your email</li>
                <li>Log in with your credentials</li>
              </ol>

              <h6>Benefits of having an account:</h6>
              <ul>
                <li>Saved cart items</li>
                <li>Order history</li>
                <li>Faster checkout</li>
                <li>Order tracking</li>
              </ul>
            </div>
          </div>

          <div className="alert alert-warning">
            <h5>Need more help?</h5>
            <p>
              Contact our support team at support@niq.com or call (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
