"use client";

import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Logo from "@/app/components/common/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage({ redirectTo }) {
  console.log(redirectTo)
  const router = useRouter();
  const { syncGuestCart, fetchCart } = useCart();
  const { refreshProfile } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;

    try {
      const response = await loginUser({
        email: form.email.value,
        password: form.password.value,
        roleId: 1,
      });

      const { token, refreshToken, userData } = response.data.data;

      // Expiration logic
      const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

      // Local Storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // Cookies
      const cookieBase = `path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `authToken=${token}; ${cookieBase}`;
      document.cookie = `userRole=user; ${cookieBase}`;

      // Sync state
      await refreshProfile();
      await syncGuestCart();
      await fetchCart();

      router.refresh();
      router.push(redirectTo);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-brand">Login</span>
          <span className="text-gray-400"> / </span>
          <span className="text-brand">Register</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              {/* 6. BIND CHECKBOX TO STATE */}
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-brand"
              />
              <span className="text-gray-600">Remember me</span>
            </label>

            <Link
              href="/accounts/password/reset"
              className="text-brand hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand hover:bg-brand/90"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Don’t have an account?
            <Link
              href="/accounts/register"
              className="ml-1 font-medium text-brand hover:underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}