"use client";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  // Close input when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div className="relative flex items-center">
      {/* Search Icon */}
      <div
        className="cursor-pointer w-8 h-8 flex items-center justify-center z-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Search size={24} strokeWidth={1.75} absoluteStrokeWidth color="white" />
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className={`
          absolute right-0
          rounded-full
          bg-[var(--color-dark)] text-white
          transition-all duration-300 ease-out
          h-8
          ${open ? "w-48 px-4 opacity-100" : "w-0 px-0 opacity-0 overflow-hidden"}
        `}
      />
    </div>
  );
}
