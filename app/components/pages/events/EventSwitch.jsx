"use client";
import clsx from "clsx";

export default function EventSwitch({ active, onChange }) {
  return (
    <div className="inline-flex items-center bg-[#E6FAF8] p-1 rounded-full max-w-full">
      <button
        onClick={() => onChange("runrise")}
        className={clsx(
          "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
          active === "runrise"
            ? "bg-brand text-white shadow"
            : "text-dark hover:text-brand"
        )}
      >
        RunRise Nation Events
      </button>

      <button
        onClick={() => onChange("other")}
        className={clsx(
          "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
          active === "other"
            ? "bg-brand text-white shadow"
            : "text-dark hover:text-brand"
        )}
      >
        Other Events
      </button>
    </div>
  );
}