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
  const [error, setError] = useState(""); // Added missing error state
  const router = useRouter();
  const { setIsAuthenticated } = useAuthContext();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 1,
      };

      const response = await loginUser(formData);

      // Destructure based on your backend API response structure
      const { token, refreshToken, userData } = response.data.data;

      // 1. Client Storage (for Axios Interceptors)
      localStorage.setItem("authToken", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("userData", JSON.stringify(userData));

      // 2. Cookie for Middleware (Server-side protection)
      const secure = window.location.protocol === "https:" ? "Secure;" : "";
      document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Lax; ${secure}`;

      // 3. Update Global State
      setIsAuthenticated(true);

      // 4. Finalize
      if (onSuccess) {
        onSuccess();
      } else {
        // router.push("/") followed by refresh ensures the Middleware 
        // and Server Components see the new cookie.
        router.push("/profile");
        router.refresh(); 
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      {error && (
        <div className="p-3 text-sm text-white bg-red-500 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="name@example.com" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>

      <Button className="w-full" disabled={loading} type="submit">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}