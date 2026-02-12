"use client";

import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { forgotPassword } from "@/services/auth.service";
import { sendOtp, verifyOtp } from "@/services/otp.service";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  /* ---------------- SEND OTP ---------------- */
  async function handleSendOtp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await sendOtp({
        email: formData.email,
        otpType: "PASSWORD_RESET",
        type: "EMAIL",
      });

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- VERIFY OTP ---------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp({
        email: formData.email,
        otp: formData.otp,
        otpType: "PASSWORD_RESET",
        type: "EMAIL",
      });

      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- RESET PASSWORD ---------------- */
  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({
        email: formData.email,
        password: formData.password,
        roleId: 1,
        otp: formData.otp,
      });

      toast.success("Password reset successfully");
      setStep(4);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* HEADER */}
        <h1 className="text-2xl font-semibold text-center">
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Reset your password securely
        </p>

        {/* STEP 1 – EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="email"
                placeholder="Account's Email Address"
                className="pl-10"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {/* STEP 2 – OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <Input
              type="text"
              placeholder="Enter OTP"
              required
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}

        {/* STEP 3 – NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                placeholder="New Password"
                className="pl-10"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        {/* SUCCESS */}
        {step === 4 && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">
              Password reset successful 🎉
            </p>
            <Link
              href="/accounts/login"
              className="inline-block mt-4 text-brand font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
