"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsAuthenticated(true);
    } else {
      router.replace("/login"); // redirect to login if not authenticated
    }
  }, [router]);

  return isAuthenticated;
}
