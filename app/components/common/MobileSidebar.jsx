"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logoutUser } from "@/services/auth.service";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { cartData, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuthContext();

  // Handle Body Scroll Lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const closeSidebar = () => setOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Trigger Button */}
      <button onClick={() => setOpen(true)} className="relative text-white p-1">
        <Menu size={28} />
        {cartData?.items?.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
            {cartData.items.length}
          </span>
        )}
      </button>

      {/* Overlay - High Z-Index */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/80 z-[9998] backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar - Highest Z-Index */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px]
          h-screen
          bg-[#001819] text-white z-[9999] flex flex-col
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <span className="text-xl font-bold text-brand">Menu</span>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* User Profile Header (Only if Logged In) */}
          {isAuthenticated && (
            <div className="px-6 py-6 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full border-2 border-brand overflow-hidden">
                  <img
                    src={user?.image || "/main-logo.png"}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-brand text-sm">
                    Hi, {user?.firstName}!
                  </p>
                  <p className="text-[10px] text-white/50 truncate w-32">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu (Visible to Everyone) */}
          <nav className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeSidebar}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-white/90 group transition-all"
              >
                <span className="text-base font-medium group-hover:text-brand">
                  {link.name}
                </span>
                <ChevronRight
                  size={16}
                  className="text-white/20 group-hover:text-brand group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </nav>

          {/* Cart Section (Sync with Desktop Drawer) */}
          {isAuthenticated && (
            <div className="px-6 pb-8">
              <button
                onClick={() => {
                  closeSidebar();
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-brand/10 border border-brand/20 hover:bg-brand/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} className="text-brand" />
                  <span className="font-bold text-brand text-sm">
                    View Cart
                  </span>
                </div>
                <span className="bg-brand text-black px-2 py-0.5 rounded text-[10px] font-bold">
                  {cartData?.items?.length || 0}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Auth Section - Always at Bottom */}
        <div className="p-6 bg-black/40 border-t border-white/10 mt-auto">
          {isAuthenticated ? (
            <div className="space-y-3">
              {user?.role?.id === 2 && (
                <Link
                  href="/dashboard"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm"
                >
                  <LayoutDashboard size={18} />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <Link
                href="/profile"
                onClick={closeSidebar}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/10 text-sm"
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  closeSidebar();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 text-sm hover:bg-red-500/5 rounded-xl transition-all"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/accounts/login"
              onClick={closeSidebar}
              className="block w-full text-center py-4 rounded-xl bg-brand text-black font-bold hover:brightness-110 transition-all"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
