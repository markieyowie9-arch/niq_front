"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const mockUser = {
  email: "test@example.com",
  securityQuestion: "What was your first pet's name?",
  securityAnswer: "buddy",
};

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");

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
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-muted-foreground">
                Enter your email to verify your identity.
              </p>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleEmailVerify}>
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground">
                Answer your security question to proceed.
              </p>
              <div className="space-y-2">
                <Label>Question</Label>
                <Input value={mockUser.securityQuestion} disabled />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <Input
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleAnswerVerify}>
                Verify
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm text-muted-foreground">
                Your temporary password has been sent to your email.
              </p>
              <Alert variant="success">
                <AlertDescription>
                  Check your inbox for the temporary password.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/login">Return to Login</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
