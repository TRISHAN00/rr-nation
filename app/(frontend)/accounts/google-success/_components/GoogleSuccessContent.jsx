
"use client";

export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getProfileData } from "@/services/user.service";

export default function GoogleSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refreshProfile } = useAuthContext();
  const { syncGuestCart, fetchCart } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (!token || !refreshToken) {
      router.push("/accounts/login");
      return;
    }

    const authenticateGoogleUser = async () => {
      try {
        localStorage.setItem("authToken", token);
        localStorage.setItem("refresh_token", refreshToken);

        const cookieConfig =
          "path=/; max-age=604800; SameSite=Lax";

        document.cookie = `authToken=${token}; ${cookieConfig}`;
        document.cookie = `userRole=user; ${cookieConfig}`;

        const userData = await getProfileData();

        localStorage.setItem(
          "userData",
          JSON.stringify(userData)
        );

        await refreshProfile();

        await syncGuestCart();
        await fetchCart();

        window.history.replaceState({}, document.title, "/");

        router.refresh();
        router.push("/");

      } catch (err) {
        console.error("Google auth failed:", err);

        localStorage.clear();

        document.cookie =
          "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        document.cookie =
          "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        router.push("/accounts/login");

      } finally {
        setLoading(false);
      }
    };

    authenticateGoogleUser();

  }, [
    searchParams,
    router,
    refreshProfile,
    syncGuestCart,
    fetchCart,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          Authenticating...
        </h2>

        <p className="text-gray-500 mt-2">
          Please wait while we log you in.
        </p>
      </div>
    </div>
  );
}