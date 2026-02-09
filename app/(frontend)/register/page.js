"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


import { registerUser } from "@/services/auth.service";
import { verifyOtp } from "@/services/otp.service";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import SendOTPForm from "@/app/components/form/SendOTPForm";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VERIFY OTP ---------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const otp = e.target.otp.value.trim();

      await verifyOtp({
        email: registerData.email,
        otp,
        otpType: "REGISTRATION",
        type: "EMAIL",
      });

      setRegisterData((prev) => ({ ...prev, otp }));
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- REGISTER ---------------- */
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: e.target.password.value,
        roleId: 1,
        otp: registerData.otp,
      });

      alert("Registration successful!");
      router.replace("/login"); // ✅ go to login page
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Register to get started
          </p>
        </div>

        {/* REGISTER FLOW */}
        {step === 1 && (
          <SendOTPForm
            loading={loading}
            setLoading={setLoading}
            setRegisterData={setRegisterData}
            setRegisterStep={setStep}
          />
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <div>
              <Label>OTP</Label>
              <Input name="otp" placeholder="Enter OTP" required />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Create password"
                required
              />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        )}

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-brand font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
