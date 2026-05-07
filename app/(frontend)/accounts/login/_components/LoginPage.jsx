"use client";

import { loginUser } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Logo from "@/app/components/common/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getProfileData } from "@/services/user.service";
import clsx from "clsx";
import { Eye, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage({ redirectTo = "/" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { syncGuestCart, fetchCart } = useCart();
  const { refreshProfile } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * SHARED SESSION HANDLER
   * Saves tokens, cookies, and syncs the Profile/Cart contexts
   */
  const handleAuthSuccess = useCallback(async (token, refreshToken, userData, isPersistent) => {
    const maxAge = isPersistent ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const cookieBase = `path=/; max-age=${maxAge}; SameSite=Lax`;

    // LocalStorage for client-side persistence
    localStorage.setItem("authToken", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Cookies for Middleware/SSR
    document.cookie = `authToken=${token}; ${cookieBase}`;
    document.cookie = `userRole=user; ${cookieBase}`;

    // Context Sync
    await refreshProfile();
    await syncGuestCart();
    await fetchCart();

    router.refresh();
    router.push(redirectTo);
  }, [fetchCart, refreshProfile, router, redirectTo, syncGuestCart]);

  /**
   * GOOGLE CALLBACK HANDLER
   * Detects ?token=... in the URL after backend redirect
   */
  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    console.log("Google Redirect Params:", { token, refreshToken });

    if (token && refreshToken) {
      const processGoogleRedirect = async () => {
        setLoading(true);
        try {
          // Pass the URL token to get user profile details
          const response = await getProfileData(token);
          const userData = response.data.data;


          await handleAuthSuccess(token, refreshToken, userData, true);
        } catch (err) {
          setError("Google login failed during synchronization.");
          setLoading(false);
        }
      };
      processGoogleRedirect();
    }
  }, [searchParams, handleAuthSuccess]);

  /**
   * FORM LOGIN HANDLER
   */
  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      const response = await loginUser({
        email: form.email.value,
        password: form.password.value,
        roleId: 1,
      });

      const { token, refreshToken, userData } = response.data.data;
      await handleAuthSuccess(token, refreshToken, userData, rememberMe);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
      setLoading(false);
    }
  }

  /**
   * GOOGLE REDIRECT INITIATOR
   */
  const onGoogleLogin = () => {
    window.location.href = "https://api.runrisenation.com/auth/google/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Logo />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Label className="mb-2">Email</Label>
            <Input name="email" type="email" placeholder="email@example.com" required />
          </div>

          <div>
            <Label className="mb-2">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-brand"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link href="/accounts/password/reset" className="text-brand hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-brand" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={onGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm"
        >
         
          <Image
                  src="/static/GOOGLE_LOGO.png"
                  alt="Run Rise Nation"
                  priority
                  className={clsx("w-[20px] h-auto sm:w-[20px] md:w-[20px] xl:w-[20px]")}
                  width={20}
                  height={20}
                />
          <span>Continue with Google</span>
        </button>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            New here?
            <Link href="/accounts/register" className="ml-1 font-semibold text-brand hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}