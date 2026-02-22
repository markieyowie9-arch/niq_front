"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");

  // Simulated stored data (replace with backend call)
  const mockUser = {
    email: "test@example.com",
    securityQuestion: "What was your first pet's name?",
    securityAnswer: "buddy",
  };

  const handleEmailVerify = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (email !== mockUser.email) {
      setError("Email not found.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleAnswerVerify = () => {
    if (!securityAnswer) {
      setError("Please enter your answer.");
      return;
    }

    if (
      securityAnswer.toLowerCase().trim() !==
      mockUser.securityAnswer.toLowerCase()
    ) {
      setError("Incorrect answer.");
      return;
    }

    setError("");
    setStep(3);
  };

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Reset Password</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* STEP 1 - EMAIL */}
              {step === 1 && (
                <>
                  <p className="text-muted mb-4">
                    Enter your email to verify your identity.
                  </p>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleEmailVerify}
                  >
                    Continue
                  </button>
                </>
              )}

              {/* STEP 2 - SECURITY QUESTION */}
              {step === 2 && (
                <>
                  <p className="text-muted mb-4">
                    Answer your security question to proceed.
                  </p>

                  <div className="mb-3">
                    <label className="form-label">Question</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mockUser.securityQuestion}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleAnswerVerify}
                  >
                    Verify
                  </button>
                </>
              )}

              {/* STEP 3 - SUCCESS */}
              {step === 3 && (
                <>
                  <p className="text-muted mb-4">
                    Your temporary password has been sent to your email.
                  </p>

                  <div className="alert alert-success">
                    Check your inbox for the temporary password.
                  </div>

                  <Link href="/login">
                    <button className="btn btn-primary w-100">
                      Return to Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
