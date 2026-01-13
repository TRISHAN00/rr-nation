import { Play } from "lucide-react";

export default function VideoPlayBtn({
  label = "Watch Video",
  color = "#00a19a",
  size = 44,
  openVideo,
}) {
  return (
    <button
      onClick={openVideo}
      type="button"
      className="
        flex items-center gap-3
        cursor-pointer group
        focus:outline-none
        active:scale-95 transition-transform
      "
      aria-label="Play video"
    >
      {/* Play Button */}
      <span
        className="
          relative flex items-center justify-center
          rounded-full shrink-0
          w-10 h-10
          sm:w-11 sm:h-11
          md:w-12 md:h-12
        "
        style={{ backgroundColor: color }}
      >
        {/* Ripple Effect (respects reduced motion) */}
        <span
          className="
            absolute inset-0 rounded-full opacity-40
            motion-safe:animate-ping
          "
          style={{ backgroundColor: color }}
        />

        {/* Inner Border */}
        <span
          className="
            relative z-10
            p-1.5
            border border-white/80
            rounded-full
            flex items-center justify-center
          "
        >
          <Play
            className="text-white ml-[2px]"
            size={14}
          />
        </span>
      </span>

      {/* Label */}
      <span
        className="
          font-semibold text-white
          text-sm
          sm:text-base
          md:text-lg
          leading-tight
          transition-colors duration-300
        "
      >
        {label}
      </span>
    </button>
  );
}
