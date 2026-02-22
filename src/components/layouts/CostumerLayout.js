"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CustomerLayout({ children }) {
  const [cartCount] = useState(0);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/" className="navbar-brand">
            <img src="/logo.png" alt="Ni-Q" height="40" />
            Ni-Q Cleaning Solutions
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            {/* Right Menu */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/store/cart" className="nav-link position-relative">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link href="/customer/login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/customer/register" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link href="/customer/orders" className="dropdown-item">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/customer/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-4">{children}</main>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Ni-Q Cleaning Solutions</h5>
              <p>Village East Avenue St. Cainta Rizal</p>
              <p>Contact: (123) 456-7890</p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link href="/store" className="text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Follow Us</h5>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
