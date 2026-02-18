"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Logo from "@/app/components/common/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { loginAdmin } from "@/services/admin/admin.auth.service";
import { Eye, EyeOffIcon } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginAdmin({
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 2,
      });

      const { token, refreshToken, userData } = response.data.data;

      // 1. Client Storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // 2. Cookie for Middleware
      document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `userRole=admin; path=/; max-age=604800; SameSite=Lax`;


      window.location.reload();
      router.push("/dashboard");
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
            <Logo />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className={"mb-2"}>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label className={"mb-2"}>Password</Label>

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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    // Eye Off Icon
                    <EyeOffIcon size={16} />
                  ) : (
                    // Eye Icon
                    <Eye size={16} />
                  )}
                </button>
              </div>
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

        </div>
      </div>
    </>
  );
}
