"use client";

import clsx from "clsx";
import { Play } from "lucide-react";

export default function VideoPlayBtn({
  label = "Watch Video",
  color = "#00a19a",
  openVideo,
}) {
  return (
    <button
      type="button"
      aria-label="Play video"
      onClick={openVideo}
      className="flex items-center gap-3 cursor-pointer group focus:outline-none"
    >
      {/* Play Button */}
      <span
        className="relative flex items-center justify-center rounded-full shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12"
        style={{ backgroundColor: color }}
      >
        {/* Ripple Effect */}
        <span
          className="absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping"
          style={{ backgroundColor: color }}
        />

        {/* Inner Border */}
        <span className="relative z-10 p-1.5 border border-white/80 rounded-full flex items-center justify-center">
          <Play className="text-white ml-[2px]" size={14} />
        </span>
      </span>

      {/* Label (✅ FIXED) */}
      <span
        className={clsx(
          "font-semibold text-white",
          "text-sm sm:text-base md:text-lg",
          "leading-tight transition-colors duration-300"
        )}
      >
        {label}
      </span>
    </button>
  );
}
