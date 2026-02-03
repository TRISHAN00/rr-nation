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
      className="group flex items-center gap-3 focus:outline-none cursor-pointer"
    >
      {/* Play Button */}
      <span
        className="relative flex items-center justify-center rounded-full shrink-0
                   w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                   transition-transform duration-300
                   group-hover:scale-110 group-hover:shadow-lg"
        style={{ backgroundColor: color }}
      >
        {/* Soft Wave */}
        <span
          className="absolute inset-0 rounded-full opacity-40 animate-wave"
          style={{ backgroundColor: color }}
        />

        {/* Inner Border */}
        <span
          className="relative z-10 p-1.5 border border-white/80 rounded-full
                     flex items-center justify-center
                     transition-transform duration-300 group-hover:scale-105"
        >
          <Play
            className="text-white ml-[2px] transition-transform duration-300 group-hover:animate-play"
            size={14}
          />
        </span>
      </span>

      {/* Label */}
      <span
        className={clsx(
          "font-semibold text-white",
          "text-sm sm:text-base md:text-lg",
          "leading-tight",
          "transition-all duration-300",
          "group-hover:translate-x-1 group-hover:opacity-90"
        )}
      >
        {label}
      </span>

  
    </button>
  );
}
