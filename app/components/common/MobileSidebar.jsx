"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Hamburger Button (Mobile + Tablet) */}
      <button
        onClick={() => setOpen(true)}
        className=" text-white"
        aria-label="Open Menu"
      >
        <Menu size={26} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 z-40 "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-70 sm:w-[320px]
          bg-dark text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
     
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={closeSidebar} aria-label="Close Menu">
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-5 py-6 space-y-4">
          {["Home", "About", "Event", "Blog", "Gallery", "Team", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={closeSidebar}
                className="block text-[16px] font-medium hover:text-brand transition"
              >
                {item}
              </Link>
            ),
          )}
        </nav>

        {/* Divider */}
        <div className="mx-5 border-t border-white/10 my-4" />

        {/* Actions */}
        <div className="px-5 space-y-4">
          <Link
            href="/login"
            onClick={closeSidebar}
            className="block w-full text-center py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
          >
            Login
          </Link>

          <Link
            href="/membership"
            onClick={closeSidebar}
            className="block w-full text-center py-2 rounded-full bg-brand text-black font-semibold hover:bg-[#009088] transition"
          >
            Become a Member
          </Link>
        </div>
      </aside>
    </>
  );
}
