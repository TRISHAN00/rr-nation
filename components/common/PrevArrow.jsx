import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

export default function PrevArrow({isBeginning, onPrev}) {
  return (
     <button
        type="button"
        onClick={onPrev}
        disabled={isBeginning}
        aria-label="Previous"
        className={clsx(
          "relative cursor-pointer overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all duration-300",
          isBeginning ? "bg-[#B3E9E7] cursor-not-allowed" : "bg-brand group"
        )}
      >
        {/* Hover background slide from bottom */}
        {!isBeginning && (
          <span className="absolute inset-0 bg-[#008f88] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
        )}

        <ArrowLeft
          className={clsx(
            "w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-colors duration-300",
            isBeginning ? "text-gray-400" : "text-white group-hover:text-white"
          )}
        />
      </button>
  )
}
