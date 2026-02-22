"use client";
import { useState } from "react";
import Link from "next/link";

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Form Submitted:", formData);
    setError("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Customer Registration</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number *</label>
                  <input
                    type="tel"
                    name="contact"
                    className="form-control"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Complete Address *</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Security Question */}
                <div className="mb-3">
                  <label className="form-label">Security Question *</label>
                  <select
                    name="securityQuestion"
                    className="form-select"
                    value={formData.securityQuestion}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a question</option>
                    <option value="pet">What was your first pet's name?</option>
                    <option value="school">
                      What was your elementary school?
                    </option>
                    <option value="mother">
                      What is your mother's maiden name?
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Answer *</label>
                  <input
                    type="text"
                    name="securityAnswer"
                    className="form-control"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link href="/customer/login">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
