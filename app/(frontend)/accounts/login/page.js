"use client";

import { loginUser } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Logo from "@/app/components/common/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { refreshProfile } = useAuthContext();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 1,
      });

      const { token, refreshToken, userData } = response.data.data;
      const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

      // Save tokens locally
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // Set cookies for middleware
      const cookieBase = `path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `authToken=${token}; ${cookieBase}`;
      document.cookie = `userRole=user; ${cookieBase}`;

      await refreshProfile();
      router.refresh();
      router.push(redirect || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <Logo />
        </div>

        {/* Redirect Message */}
        {redirect && (
          <div className="mb-4 bg-blue-50 text-blue-600 text-sm px-4 py-2 rounded-lg">
            Please login to continue
          </div>
        )}

        {/* Login/Register Header */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-brand">Login</span>
          <span className="text-gray-400"> / </span>
          <span className="text-brand">Register</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              autoFocus
              className="focus:ring-2 focus:ring-brand/40 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <Label className="mb-2">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pr-10 focus:ring-2 focus:ring-brand/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Click 👁 to show password
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-brand"
              />
              <span className="text-gray-600">Keep me logged in</span>
            </label>

            <Link
              href="/accounts/password/reset"
              className="text-brand hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-brand hover:bg-brand/90 transition-all active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-500">Don’t have an account?</p>
          <Link
            href="/accounts/register"
            className="inline-block mt-2 font-semibold text-brand hover:underline"
          >
            Create an account →
          </Link>
        </div>
      </div>
    </div>
  );
}