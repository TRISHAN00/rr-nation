"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import MobileSidebar from "../MobileSidebar";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

export default function Header() {
  // Prevents the "Login" button from showing while we check the token
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/accounts/login" ||
    pathname === "/accounts/register" ||
    pathname === "/accounts/password/reset" ||
    pathname === "/privacy-policy" ||
    pathname === "/payment/fail" ||
    pathname === "/payment/cancel" ||
    pathname === "/payment/success";

  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
 

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHide(true);
      } else {
        setHide(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const topClass = mounted ? (hide ? "-top-38" : "top-0") : "top-0";

  const bgClass = mounted
    ? isAuthPage
      ? "bg-dark/80 backdrop-blur-md shadow-sm"
      : scrolled
        ? "bg-dark/80 backdrop-blur-md shadow-sm"
        : "bg-transparent"
    : "bg-transparent";

  return (
    <header
      className={clsx(
        "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        topClass,
        bgClass,
      )}
    >
      <div className="container mx-auto px-7.5 py-4 flex items-center gap-x-20">
        <Logo />

       
        {isDesktop ? (
          <div className="flex flex-col flex-1">
            <HeaderTop />
            <HeaderBottom />
          </div>
        ) : (
          <div className="ml-auto">
            <MobileSidebar />
          </div>
        )}
      </div>
    </header>
  );
}
