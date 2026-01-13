"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import Logo from "../Logo";
import MobileSidebar from "../MobileSidebar";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

export default function Header() {
  // XL breakpoint (1280px)
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <header className="absolute top-[30px] left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-[30px] flex items-center gap-x-20">
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
