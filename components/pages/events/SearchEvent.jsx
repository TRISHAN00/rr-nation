"use client";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchEvent({ placeholder = "Search...", onSearch, className }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("w-full max-w-md", className)}>
      <label className="sr-only">Search</label>

      <div className="relative flex items-center w-full">
        {/* Icon */}
        <span className="absolute left-3 text-gray-400">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </span>

        {/* Input */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
          )}
        />
      </div>
    </form>
  );
}
