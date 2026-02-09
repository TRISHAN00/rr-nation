"use client";

import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      router.replace("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
     
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              className="w-full"
              disabled={loading}
              style={{ backgroundColor: "var(--color-brand)" }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Don’t have an account?</p>
          </div>
        </div>
      </div>
    </>
  );
}
