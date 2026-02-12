"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { registerUser } from "@/services/auth.service";
import { verifyOtp } from "@/services/otp.service";
import { updateProfile } from "@/services/user.service";

import SendOTPForm from "@/app/components/form/SendOTPForm";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(registerData)

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
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- REGISTER & UPDATE PROFILE ---------------- */
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const password = e.target.password.value;

    try {
      // 1️⃣ Register the user
      const registrationResponse = await registerUser({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password,
        roleId: 1,
        otp: registerData.otp,
      });

      // 2️⃣ If registration succeeds, update profile
      const profilePayload = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone || "", // optional
      };

      await updateProfile(profilePayload);

      toast.success("Registration and profile update successful!");
      router.replace("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Register to get started</p>
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
              <Label className={"mb-1"}>OTP</Label>
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
            <Link
              href="/login"
              className="ml-1 font-medium text-brand hover:underline transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
