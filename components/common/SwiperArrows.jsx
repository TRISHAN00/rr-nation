import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SwiperArrows({
  onPrev,
  onNext,
  isBeginning = true,
  isEnd = false,
  className,
}) {
  return (
    <div className={clsx("flex gap-3 mt-4 lg:mt-0", className)}>
      {/* Prev Button */}
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

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isEnd}
        aria-label="Next"
        className={clsx(
          "relative cursor-pointer overflow-hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center transition-all duration-300",
          isEnd ? "bg-[#B3E9E7] cursor-not-allowed" : "bg-[#B3E9E7] group"
        )}
      >
        {/* Hover background slide from bottom */}
        {!isEnd && (
          <span className="absolute inset-0 bg-brand -translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
        )}

        <ArrowRight
          className={clsx(
            "w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-colors duration-300",
            isEnd ? "text-gray-400" : "text-brand group-hover:text-white"
          )}
        />
      </button>
    </div>
  );
}
