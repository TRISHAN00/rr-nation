"use client";
import clsx from "clsx";
import { useState } from "react";

export default function EventSwitch() {
  const [active, setActive] = useState("runrise");

  return (
    <div className="inline-flex items-center bg-[#E6FAF8] p-1 rounded-full max-w-full">
      <button
        onClick={() => setActive("runrise")}
        className={clsx(
          "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
          active === "runrise"
            ? "bg-brand text-white shadow"
            : "text-dark hover:text-brand"
        )}
      >
        Run Rise Nation Event
      </button>

      <button
        onClick={() => setActive("other")}
        className={clsx(
          "px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
          active === "other"
            ? "bg-brand text-white shadow"
            : "text-dark hover:text-brand"
        )}
      >
        Other Event
      </button>
    </div>
  );
}
