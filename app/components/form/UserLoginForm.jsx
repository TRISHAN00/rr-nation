"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserLoginForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuthContext();

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

      // 1. Client Storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // 2. Cookie for Middleware
      document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax`;
      setIsAuthenticated(true);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="flex flex-col gap-1.5">
        <Label>Email</Label>
        <Input name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Password</Label>
        <Input name="password" type="password" required />
      </div>

      <Button className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
