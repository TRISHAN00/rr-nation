"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { loginUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserLoginForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

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

      onSuccess?.();              // ✅ close modal
      router.push("/profile");    // ✅ redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
