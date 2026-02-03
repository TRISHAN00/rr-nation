import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

export default function PrevArrow({ isBeginning, onPrev }) {
  return (
    <button
      type="button"
      onClick={onPrev}
      disabled={isBeginning}
      aria-label="Previous"
      style={{
        "--bg": "var(--color-brand)",
        "--hover-bg": "var(--color-dark)",
        "--disabled-bg": "#B3E9E7",
        "--icon": "var(--color-white)",
        "--icon-disabled": "var(--color-gray)",
      }}
      className={clsx(
        "relative overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all duration-300",
        isBeginning
          ? "bg-[var(--disabled-bg)] cursor-not-allowed"
          : "bg-[var(--bg)] group cursor-pointer"
      )}
    >
      {!isBeginning && (
        <span className="absolute inset-0 bg-[var(--hover-bg)] scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100" />
      )}

      <ArrowLeft
        className={clsx(
          "relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300",
          isBeginning ? "text-[var(--icon-disabled)]" : "text-[var(--icon)]"
        )}
      />
    </button>
  );
}
