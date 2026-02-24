"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CustomerLayout from "@/components/layouts/CostumerLayout";
import dataProvider from "@/utils/dataProvider";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample cart data
  useEffect(() => {
    // Check if user is logged in
    // If logged in, load from Firebase
    // If guest, load from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Sample data
      setCartItems([
        {
          id: 1,
          name: "Laundry Detergent",
          price: 120,
          quantity: 2,
          image: "/product1.jpg",
          stock: 15,
        },
        {
          id: 3,
          name: "Car Shampoo",
          price: 150,
          quantity: 1,
          image: "/product3.jpg",
          stock: 5,
        },
      ]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      // persist to backend when logged in (mock or firebase)
      // TODO: replace 'current' with real user id from auth context
      dataProvider.saveCartForUser("current", cartItems).catch(() => {});
    } else if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const vat = calculateSubtotal() * 0.12; // 12% VAT
  const deliveryFee = 50; // Fixed delivery fee
  const total = calculateSubtotal() + vat + deliveryFee;

  return (
    <CustomerLayout>
      <h1 className="mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your cart is empty</h3>
          <Link href="/store" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                {cartItems.map((item) => (
                  <div key={item.id} className="row mb-3 pb-3 border-bottom">
                    <div className="col-md-2">
                      <img
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-4">
                      <h5>{item.name}</h5>
                      <p className="text-muted">₱{item.price}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          min="1"
                          max={item.stock}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1,
                            )
                          }
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <p className="fw-bold">₱{item.price * item.quantity}</p>
                    </div>
                    <div className="col-md-1">
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₱{calculateSubtotal()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>VAT (12%)</span>
                  <span>₱{vat.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>₱{deliveryFee}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">₱{total.toFixed(2)}</strong>
                </div>

                <Link href="/checkout" className="btn btn-primary w-100 mb-2">
                  Proceed to Checkout
                </Link>
                <Link href="/store" className="btn btn-outline-secondary w-100">
                  Continue Shopping
                </Link>

                {!isLoggedIn && (
                  <div className="alert alert-info mt-3">
                    <small>
                      <Link href="/customer/login">Login</Link> to save your
                      cart for next time.
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
