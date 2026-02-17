"use client";

import { useCart } from "@/context/CartContext"; // Assuming you have this
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import { useAuth } from "@/context/AuthContext"; // Add your auth context here

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { cartData } = useCart();
  
  // Mock Auth State - replace with your actual auth context/logic
  const user = null; 

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Hamburger Button + Cart Badge Indicator */}
      <button
        onClick={() => setOpen(true)}
        className="relative text-white p-1"
        aria-label="Open Menu"
      >
        <Menu size={28} />
        {cartData?.items?.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
            {cartData.items.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] sm:w-[320px]
          bg-[#001819] text-white z-[70] flex flex-col
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-black font-bold">E</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Menu</span>
          </div>
          <button 
            onClick={closeSidebar} 
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <nav className="px-6 py-8 flex flex-col gap-y-5">
            {["Home", "About", "Events", "Blogs", "Gallery", "Team", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={closeSidebar}
                  className="group flex items-center justify-between text-lg font-medium text-white/80 hover:text-brand transition-all"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            )}
          </nav>

          <div className="px-6 py-4">
             <div className="border-t border-white/10 pt-6" />
             
             {/* Cart Shortcut */}
             <Link
                href="/events/checkout"
                onClick={closeSidebar}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors mb-6"
             >
                <div className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-brand" />
                    <span className="font-medium">My Cart</span>
                </div>
                <span className="bg-brand text-black px-2 py-0.5 rounded text-xs font-bold">
                    {cartData?.items?.length || 0}
                </span>
             </Link>
          </div>
        </div>

        {/* Bottom Actions (Auth) */}
        <div className="p-6 bg-black/20 space-y-3">
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={closeSidebar}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
              >
                <User size={18} />
                <span>Profile Settings</span>
              </Link>
              <button
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={closeSidebar}
                className="block w-full text-center py-3 rounded-xl border border-white/20 hover:border-brand hover:text-brand transition font-medium"
              >
                Sign In
              </Link>
             
            </>
          )}
        </div>
      </aside>
    </>
  );
}