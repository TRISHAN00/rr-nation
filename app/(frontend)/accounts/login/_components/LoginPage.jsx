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
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("rememberMe") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

  /**
   * SHARED SESSION HANDLER
   */
  const handleAuthSuccess = useCallback(async (token, refreshToken, userData, isPersistent, overridePath) => {
    const maxAge = isPersistent ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const cookieBase = `path=/; max-age=${maxAge}; SameSite=Lax`;

    // Persistence
    localStorage.setItem("authToken", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Cookies for Middleware
    document.cookie = `authToken=${token}; ${cookieBase}`;
    document.cookie = `userRole=user; ${cookieBase}`;

    // Sync Contexts
    await refreshProfile();
    await syncGuestCart();
    await fetchCart();

    // REDIRECT LOGIC:
    const urlRedirect = searchParams.get("redirectTo");
    const finalPath = overridePath || urlRedirect || redirectTo || "/";
    
    console.log("Auth Success. Redirecting to:", finalPath);
    router.push(finalPath);
  }, [fetchCart, refreshProfile, router, redirectTo, syncGuestCart, searchParams]);

  /**
   * GOOGLE CALLBACK HANDLER
   */
  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token && refreshToken) {
      const processGoogleRedirect = async () => {
        setLoading(true);
        try {
          const response = await getProfileData(token);
          const userData = response.data.data;

          // Retrieve saved path from LocalStorage (set by Cart Modal or onGoogleLogin)
          const savedRedirect = localStorage.getItem("postLoginRedirect");
          localStorage.removeItem("postLoginRedirect");

          await handleAuthSuccess(
            token,
            refreshToken,
            userData,
            true, // Google is usually persistent
            savedRedirect
          );
        } catch (err) {
          setError("Google login failed during synchronization.");
          setLoading(false);
        }
      };
      processGoogleRedirect();
    }
  }, [searchParams, handleAuthSuccess]);

  /**
   * EMAIL LOGIN HANDLER
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
      
      // Check if we have a stored redirect from the Cart Modal
      const savedRedirect = localStorage.getItem("postLoginRedirect");
      localStorage.removeItem("postLoginRedirect");

      await handleAuthSuccess(token, refreshToken, userData, rememberMe, savedRedirect);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
      setLoading(false);
    }
  }

  const onGoogleLogin = () => {
    // If redirectTo was passed in URL, prioritize that, otherwise use prop
    const urlRedirect = searchParams.get("redirectTo");
    const pathToSave = urlRedirect || redirectTo || "/";
    
    localStorage.setItem("postLoginRedirect", pathToSave);
    window.location.href = "https://api.runrisenation.com/auth/google/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <div className="text-center mb-5 sm:mb-6">
          <Logo />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-3.5 sm:space-y-4">
          <div>
            <Label className="mb-1.5 sm:mb-2 text-gray-700 text-sm sm:text-base">Email</Label>
            <Input name="email" type="email" placeholder="email@example.com" required className="rounded-xl border-gray-200 h-10 sm:h-11 text-sm" />
          </div>

          <div>
            <Label className="mb-1.5 sm:mb-2 text-gray-700 text-sm sm:text-base">Password</Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-10 rounded-xl border-gray-200 h-10 sm:h-11 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOffIcon size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm py-2 px-3 rounded-lg text-center animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-brand cursor-pointer shrink-0"
              />
              <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
            </label>
            <Link href="/accounts/password/reset" className="text-brand hover:underline font-semibold text-left sm:text-right">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-brand h-10 sm:h-11 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="my-6 sm:my-8 flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[9px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">OR</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={onGoogleLogin}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white border border-gray-200 text-gray-700 h-10 sm:h-11 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 shadow-sm"
        >
          <Image
            src="/static/GOOGLE_LOGO.png"
            alt="Google"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0"
          />
          <span>Continue with Google</span>
        </button>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-500">
            New here?
            <Link href="/accounts/register" className="ml-1 font-bold text-brand hover:underline whitespace-nowrap">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}