"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import MobileSidebar from "../MobileSidebar";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  // Default server-side render: stable initial values
  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // now client is mounted

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background change
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
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

  // ❌ Don't apply scroll/hide styles until mounted to prevent hydration mismatch
  const topClass = mounted ? (hide ? "-top-38" : "top-0") : "top-0";
  const bgClass = mounted
    ? scrolled
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
        {/* Logo */}
        <Logo />

        {/* Conditional Rendering */}
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
