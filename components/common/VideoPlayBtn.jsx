import { Play } from "lucide-react";

export default function VideoPlayBtn({
  label = "Watch Video",
  color = "#00a19a",
  size = 44,
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 cursor-pointer group focus:outline-none"
    >
      {/* Play Button */}
      <span
        className="relative flex items-center justify-center rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      >
        {/* Flow / Ripple Effect */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: color }}
        />

        {/* Inner Border */}
        <span className="relative z-10 p-1.5 border border-white/80 rounded-full flex items-center justify-center">
          <Play size={16} className="text-white ml-[2px]" />
        </span>
      </span>

      {/* Label */}
      <span className="text-[18px] leading-7 font-medium text-[#fff] transition-colors duration-300 font-semibold ">
        {label}
      </span>
    </button>
  );
}
