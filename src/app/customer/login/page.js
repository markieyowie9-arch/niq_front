"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const router = useRouter();

  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (locked) {
      setError("Account locked. Please try again later.");
      return;
    }

    try {
      await signIn(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("An error occurred:", err?.message || err);
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Admin Login</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={locked}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={locked}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={locked}
                >
                  Login
                </button>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
