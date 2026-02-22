// app/page.js
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            Ni-Q Cleaning Solutions
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/store" className="nav-link">
                  Store
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/customer/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/customer/register"
                  className="btn btn-primary text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center py-5">
          <h1 className="display-3 fw-bold mb-4">Ni-Q Cleaning Solutions</h1>
          <p className="lead fs-3 mb-4">
            Quality cleaning products for every home and business
          </p>
          <Link href="/store" className="btn btn-light btn-lg px-5 py-3">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-1 mb-3">🧼</div>
                <h3 className="h4">Quality Products</h3>
                <p className="text-muted">
                  All our cleaning solutions are carefully mixed for optimal
                  performance
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-1 mb-3">🚚</div>
                <h3 className="h4">Fast Delivery</h3>
                <p className="text-muted">
                  Quick and reliable delivery to your doorstep
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-1 mb-3">💳</div>
                <h3 className="h4">Secure Payments</h3>
                <p className="text-muted">
                  Multiple payment options with secure transaction processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Preview */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Best Sellers</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Laundry Detergent</h5>
                  <p className="card-text text-primary fw-bold fs-4">₱120</p>
                  <Link href="/store" className="btn btn-outline-primary">
                    View Product
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Dishwashing Liquid</h5>
                  <p className="card-text text-primary fw-bold fs-4">₱85</p>
                  <Link href="/store" className="btn btn-outline-primary">
                    View Product
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Car Shampoo</h5>
                  <p className="card-text text-primary fw-bold fs-4">₱150</p>
                  <Link href="/store" className="btn btn-outline-primary">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/store" className="btn btn-primary btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Ni-Q Cleaning Solutions</h5>
              <p className="small">Village East Avenue St. Cainta Rizal</p>
              <p className="small">Contact: (123) 456-7890</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    href="/store"
                    className="text-white text-decoration-none"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-white text-decoration-none"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-white text-decoration-none"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <p className="small">Stay connected on social media</p>
            </div>
          </div>
          <hr className="bg-secondary" />
          <p className="text-center small mb-0">
            © 2024 Ni-Q Cleaning Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Admin Login Link (hidden) */}
      <div className="text-center mt-3">
        <Link href="/login" className="text-muted small text-decoration-none">
          Admin Access
        </Link>
      </div>
    </>
  );
}
