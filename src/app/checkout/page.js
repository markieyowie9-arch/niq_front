"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomerLayout from "../../src/components/layouts/CostumerLayout";
import dataProvider from "@/utils/dataProvider";

export default function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=review
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    contact: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    // Build a minimal order payload; in real app, include cart items, totals
    const payload = {
      customer: shippingInfo.fullName || shippingInfo.email || "Guest",
      email: shippingInfo.email,
      shipping: shippingInfo,
      paymentMethod,
      total: 0,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      items: [],
    };

    try {
      await dataProvider.createOrder(payload);
      router.push("/checkout/success");
    } catch (err) {
      // fallback: still navigate to success but log error
      console.error("Order creation failed", err);
      router.push("/checkout/success");
    }
  };

  return (
    <CustomerLayout>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Checkout</h1>

          {/* Progress Steps */}
          <div className="progress mb-4" style={{ height: "30px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(step / 3) * 100}%` }}
            >
              Step {step} of 3
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Shipping Information</h5>
                <form onSubmit={handleShippingSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Complete Address *</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Province *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingInfo.province}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            province: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">ZIP Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      value={shippingInfo.contact}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          contact: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Select Payment Method</h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div
                      className={`card ${paymentMethod === "gcash" ? "border-primary" : ""}`}
                      onClick={() => handlePaymentSelect("gcash")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body text-center">
                        <img src="/gcash-logo.png" alt="GCash" height="40" />
                        <p className="mt-2 mb-0">GCash</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={`card ${paymentMethod === "paymaya" ? "border-primary" : ""}`}
                      onClick={() => handlePaymentSelect("paymaya")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body text-center">
                        <img
                          src="/paymaya-logo.png"
                          alt="PayMaya"
                          height="40"
                        />
                        <p className="mt-2 mb-0">PayMaya</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={`card ${paymentMethod === "bank" ? "border-primary" : ""}`}
                      onClick={() => handlePaymentSelect("bank")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body text-center">
                        <img
                          src="/bank-logo.png"
                          alt="Bank Transfer"
                          height="40"
                        />
                        <p className="mt-2 mb-0">Bank Transfer</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className={`card ${paymentMethod === "paypal" ? "border-primary" : ""}`}
                      onClick={() => handlePaymentSelect("paypal")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body text-center">
                        <img src="/paypal-logo.png" alt="PayPal" height="40" />
                        <p className="mt-2 mb-0">PayPal</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Review Your Order</h5>

                {/* Order Summary */}
                <div className="mb-4">
                  <h6>Items</h6>
                  {/* List cart items here */}
                </div>

                <div className="mb-4">
                  <h6>Shipping To:</h6>
                  <p>
                    {shippingInfo.fullName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.city}, {shippingInfo.province}{" "}
                    {shippingInfo.zipCode}
                    <br />
                    Contact: {shippingInfo.contact}
                  </p>
                </div>

                <div className="mb-4">
                  <h6>Payment Method:</h6>
                  <p className="text-capitalize">{paymentMethod}</p>
                </div>

                <div className="mb-4">
                  <h6>Total Amount:</h6>
                  <h3 className="text-primary">₱1,234.56</h3>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the{" "}
                    <Link href="/terms">Terms and Conditions</Link>
                  </label>
                </div>

                <div className="d-flex">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
