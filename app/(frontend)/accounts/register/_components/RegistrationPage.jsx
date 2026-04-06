"use client";

import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { registerUser } from "@/services/auth.service";
import { verifyOtp } from "@/services/otp.service";

import SendOTPForm from "@/app/components/form/SendOTPForm";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function RegisterPage({ redirectTo = "/" }) {
  const router = useRouter();
  
  // States
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Contexts
  const { refreshProfile } = useAuthContext();
  const { syncGuestCart, fetchCart } = useCart();

  /* ---------------- VERIFY OTP ---------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp")?.toString().trim();

    if (!otp) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
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

  /* ---------------- REGISTER ---------------- */
  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");

    setLoading(true);
    try {
      const response = await registerUser({
        ...registerData,
        password,
        roleId: 1,
      });

      const { token, refreshToken, userData } = response.data.data;

      // 1. Client Storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // 2. Cookies
      const cookieConfig = "path=/; max-age=604800; SameSite=Lax";
      document.cookie = `authToken=${token}; ${cookieConfig}`;
      document.cookie = `userRole=user; ${cookieConfig}`;

      // 3. CART SYNC & REFRESH (The logic you wanted)
      await syncGuestCart(); 
      await refreshProfile(); 
      await fetchCart(); 

      toast.success("Account created successfully!");

      router.refresh();
      router.push(redirectTo); // Redirect back to checkout
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === 3 ? "Set your password" : "Register to get started"}
          </p>
        </div>

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
            <p className="text-sm text-green-600 bg-green-50 border border-green-200 p-2 rounded">
              OTP sent to <strong>{registerData?.email}</strong>.
            </p>
            <div>
              <Label className={'mb-2'} htmlFor="otp">OTP</Label>
              <Input id="otp" name="otp" placeholder="Enter 6-digit code" required />
            </div>
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <Label className={'mb-2'} htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOffIcon size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Creating Account..." : "Complete Registration"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <Link
            href={`/accounts/login?redirectTo=${redirectTo}`}
            className="inline-block mt-2 text-sm font-semibold text-brand hover:text-blue-700 transition-colors"
          >
            Login to your account →
          </Link>
        </div>
      </div>
    </div>
  );
}